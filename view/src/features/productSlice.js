import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductDetails, getProducts } from "../utils/product";

export const loadProductList = createAsyncThunk(
    "product/loadProducts",
    async () => {
        const response = await getProducts();

        return response.map((obj) => ({
            ...obj,
            productDetails: [],
            loadingDetails: false,
            errorWithDetails: false,
        }));
    }
);


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        isLoading: true,
        hasError: false,
        viewDetails: 'none',
    },
    reducers: {
        setViewDetails: (state, action) => {
            state.viewDetails = action.payload;
        },
    },
    extraReducers: (buidler) => {
        buidler
        .addCase(loadProductList.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadProductList.fulfilled, (state, action) => {
            state.isLoading = false; 
            state.hasError = false;
            state.product = action.payload;
        })
        .addCase(loadProductList.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});


export const selectProductList = state => state.product.product;

export const selectProductDetails = state => state.product.product[Number(state.product.viewDetails)];

export const selectProductIsLoading = state => state.product.isLoading;

export const selectProductHasError = state => state.product.hasError;

export const selectViewDetails = state => state.product.viewDetails;

export const { setViewDetails } = productSlice.actions;

export default productSlice.reducer;