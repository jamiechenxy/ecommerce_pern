import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getOrderDetails, getOrdersList } from "../utils/orders";


export const loadOrdersList = createAsyncThunk(
    "order/loadOrdersList",
    async () => {
        const response = await getOrdersList();

        if (response.length===0) { return response; };

        let orderIdArr = [];
        response.forEach(Obj => orderIdArr.push(Obj.order_id));
        
        const orderIdArray = [... new Set(orderIdArr)];

        let ordersData = [];
        orderIdArray && orderIdArray.forEach(id => {
            let matchedArr = [];
            let orderTotalAmount = 0;
            response.forEach(obj => {
                if (id===obj.order_id) {
                    matchedArr.push(obj);
                    orderTotalAmount = obj.price + orderTotalAmount;
                }
            })
            ordersData.push({
                [id]: matchedArr,
                orderTotalAmount: parseFloat(orderTotalAmount).toFixed(2),
            });
        });

        return ordersData;

    }
);


const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isLoading: true,
        hasError: false,
        detailsByIndex: '',
    },
    reducers: {
        setDetailsByIndex: (state, action) => {
            state.detailsByIndex = action.payload;
        },
        defaultDetailsByIndex: (state) => {
            state.detailsByIndex = '';
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loadOrdersList.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(loadOrdersList.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(loadOrdersList.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});

export const selectOrdersList = state => state.order.orders;

const selectDetailsByIndex = state => state.order.detailsByIndex;

export const selectOrderByIndex = createSelector(
    [selectOrdersList, selectDetailsByIndex], 
    (ordersList, index) => {
        const selectedOrder = Object.values(ordersList[index]);
        return selectedOrder;
}); 

export const selectOrdersIsLoading = state => state.order.isLoading;

export const selectOrdersHasError = state => state.order.hasError;

export const { setDetailsByIndex, defaultDetailsByIndex } = orderSlice.actions;

export default orderSlice.reducer;