import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    getFilter, 
    getProductDetails, 
    getProducts, 
} from "../utils/product";
import qs from "qs";


export const loadFilter = createAsyncThunk(
    "product/loadFilter",
    async () => {
        const response = await getFilter();
        return response;
    }
);

export const loadProductList = createAsyncThunk(
    "product/loadProducts",
    async (_, { getState }) => {
        const startTime = Date.now();
        const minimumLoadingTime = 1000;

        const { condition } = getState().product;
        const queryString = qs.stringify(condition, { arrayFormat: "brackets" });

        const response = await getProducts(queryString);

        response.forEach(obj => {
            obj.grapes = obj.grapes.split(',').map(ele => ele.trim());
            obj.aroma = obj.aroma.split(',').map(ele => ele.trim());
        });

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < minimumLoadingTime) {
            await new Promise((resolve) => setTimeout(resolve, minimumLoadingTime - elapsedTime));
        }

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
        condition: {
            type: ["Red", "White"],
            price: [10, 75],
            rating: 4.2,
            grapes: [],
            region: [],
            country: [],
        },
        filter: {},
        isLoadingFilter: true,
        hasErrorWithFilter: false,
        // showHeaderDropdown: false,
    },
    reducers: {
        setViewDetails: (state, action) => {
            state.viewDetails = action.payload;
        },
        setCondtionType: (state, action) => {
            const targetedEle = state.filter.type[action.payload];
            if (state.condition.type.includes(targetedEle)) {
                state.condition.type = state.condition.type.filter(ele => ele !== targetedEle);
            } else {
                state.condition.type.push(targetedEle);
            }
        },
        setConditionPrice: (state, action) => {
            state.condition.price = action.payload;
        },
        setCondtionRating: (state, action) => {
            state.condition.rating = Number(action.payload);
        },
        setConditionGRC: (state, action) => {
            const { targetedEle, category } = action.payload;
            // const targetedEle = state.filter[category][index];

            if (!state.condition[category].includes(targetedEle)) {
                // remove active elements from filter array
                state.filter[category].splice(0, state.condition[category].length);
                // add target element to the condition array
                state.condition[category].push(targetedEle);
                // return a new array that does not contain target element
                const shifted = state.filter[category].filter((ele) => ele !== targetedEle);
                // assign the filter arr to the concatenation of condition array and returned array by last step
                state.filter[category] = state.condition[category].concat(shifted);
            } else {
                // remove active elements from filter array
                state.filter[category].splice(0, state.condition[category].length);
                // remove target element from condition array
                state.condition[category] = state.condition[category].filter(ele => ele !== targetedEle);
                // add target element to filter arr and sort
                state.filter[category].push(targetedEle);
                state.filter[category].sort();
                // assign the filter arr to the concatenation of condition array and returned array by last step
                state.filter[category] = state.condition[category].concat(state.filter[category]);
            }
        },
        adjustToSingleGrapeCondition: (state, action) => {
            const { wineType, targetEle, category } = action.payload;
            state.condition = {
                ...state.condition,
                grapes: [],
                region: [],
                country: [],
            };
            state.condition = {
                ...state.condition,
                [category]: [targetEle],
                type: wineType,
                price: [0, 1000],
                rating: 0,
            };
            const shifted = state.filter[category].filter((ele) => ele !== targetEle);
            state.filter[category] = state.condition[category].concat(shifted);
        },
        // toggleShowHeaderDropdown: (state, action) => {
        //     state.showHeaderDropdown = action.payload;
        // }
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

// product list part
export const selectProductList = state => state.product.product;
export const selectProductDetails = state => state.product.product[Number(state.product.viewDetails)];
export const selectProductIsLoading = state => state.product.isLoading;
export const selectProductHasError = state => state.product.hasError;
export const selectViewDetails = state => state.product.viewDetails;

// filter part
export const selectFilter = state => state.product.filter;
export const selectFilterIsLoading = state => state.product.isLoadingFilter;
export const selectFilterHasError = state => state.product.hasErrorWithFilter;

// condition part
export const selectCondition = state => state.product.condition;
export const selectConditionType = state => state.product.condition.type;
export const selectConditionPrice = state => state.product.condition.price;
export const selectConditionRating = state => state.product.condition.rating;
export const selectConditionGrapes = state => state.product.condition.grapes;
export const selectConditionRegion = state => state.product.condition.region;
export const selectConditionCountry = state => state.product.condition.country;

// // util
// export const selectShowHeaderDropdown = state => state.product.showHeaderDropdown;



export const { 
    setViewDetails, 
    setConditionGRC,
    setCondtionType,
    setCondtionRating,
    setConditionPrice,
    // toggleShowHeaderDropdown,
    adjustToSingleGrapeCondition,
} = productSlice.actions;

export default productSlice.reducer;