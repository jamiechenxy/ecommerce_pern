import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getFilter, 
    getProductDetails, 
    getProducts, 
} from "../utils/product";


export const loadFilter = createAsyncThunk(
    "product/loadFilter",
    async() => {
        const response = await getFilter();
        // console.log('filter response:', response);
        return response;
    }
);

export const loadProductList = createAsyncThunk(
    "product/loadProducts",
    async () => {
        const response = await getProducts();

        response.forEach(obj => {
            obj.grapes = obj.grapes.split(',').map(ele => ele.trim());
            obj.aroma = obj.aroma.split(',').map(ele => ele.trim());
        });

        return response;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        isLoading: true,
        hasError: false,
        viewDetails: 'none',
        filter: {},
        isLoadingFilter: true,
        hasErrorWithFilter: false,
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
        .addCase(loadFilter.pending, (state) => {
            state.isLoadingFilter = true;
            state.hasErrorWithFilter = false;
        })
        .addCase(loadFilter.fulfilled, (state, action) => {
            state.isLoadingFilter = false;
            state.hasErrorWithFilter = false;
            state.filter = action.payload;
        })
        .addCase(loadFilter.rejected, (state) => {
            state.isLoadingFilter = false;
            state.hasErrorWithFilter = true;
        })
    }
});


export const selectProductList = state => state.product.product;

export const selectProductDetails = state => state.product.product[Number(state.product.viewDetails)];

export const selectProductIsLoading = state => state.product.isLoading;

export const selectProductHasError = state => state.product.hasError;

export const selectViewDetails = state => state.product.viewDetails;

export const selectFilter = state => state.product.filter;

export const selectFilterIsLoading = state => state.product.isLoadingFilter;

export const selectFilterHasError = state => state.product.hasErrorWithFilter;

export const { setViewDetails } = productSlice.actions;

export default productSlice.reducer;