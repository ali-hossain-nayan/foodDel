import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch food list from the API
export const fetchFoodList = createAsyncThunk(
    'foodList/fetchFoodList',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/api/food/list');
            return response.data.data;  // Adjust based on actual response format
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch food list');
        }
    }
);

// Initialize state
const initialState = {
    foodList: [],
    cartItems: {},
    status: 'idle',
    error: null,
};

// Utility function to get the token (replace this with your actual implementation)
const getToken = () => localStorage.getItem('token'); // Example: Retrieve token from local storage

// Food list slice
const foodListSlice = createSlice({
    name: 'foodList',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { itemId } = action.payload;
            
            // Update local state (cartItems)
            if (!state.cartItems[itemId]) {
                state.cartItems[itemId] = 1;
            } else {
                state.cartItems[itemId]++;
            }

            // Make API call if token is available
            const token = getToken();
            if (token) {
                axios
                    .post(
                        '/api/cart/add',
                        { itemId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((response) => {
                        console.log('Add to cart API response:', response.data);
                    })
                    .catch((error) => {
                        console.error('Add to cart API error:', error.response?.data || error.message);
                    });
            }
        },
        removeFromCart: (state, action) => {
            const { itemId } = action.payload;

            // Update local state (cartItems)
            if (state.cartItems[itemId] > 0) {
                state.cartItems[itemId]--;
                if (state.cartItems[itemId] <= 0) {
                    delete state.cartItems[itemId];
                }
            }

            // Make API call if token is available
            const token = getToken();
            if (token) {
                axios
                    .post(
                        '/api/cart/remove',
                        { itemId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                    .then((response) => {
                        console.log('Remove from cart API response:', response.data);
                    })
                    .catch((error) => {
                        console.error('Remove from cart API error:', error.response?.data || error.message);
                    });
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoodList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFoodList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.foodList = action.payload;  // Store the fetched data
            })
            .addCase(fetchFoodList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch food list';
            });
    },
});

// Selectors
export const { addToCart, removeFromCart } = foodListSlice.actions;
export const selectFoodList = (state) => state.foodList.foodList;
export const selectCartItems = (state) => state.foodList.cartItems;

// Calculate total cart amount
export const getTotalCartAmount = (state) => {
    const { cartItems, foodList } = state.foodList;

    let totalAmount = 0;
    for (let itemId in cartItems) {
        if (cartItems[itemId] > 0) {
            const itemInfo = foodList.find((product) => product._id === itemId);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
    }
    return totalAmount;
};

export default foodListSlice.reducer;
