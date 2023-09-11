import { handleAuthHeader } from "./utils";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

export const getOrdersList = async () => {
    try {
        const res = await fetch(`${api_endpoint}/order`, {
            headers: { 'Content-type': 'application/json', },
            credentials: "include",
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};

export const getOrderDetails = async (orderId) => {
    try {
        const res = await fetch(`${api_endpoint}/order/${orderId}`, {
            headers: { 
                'Content-type': 'application/json', 
            },
            credentials: "include",
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};

// create order after payment confirmed during checkout process
export const createOrderStripe = async (ssId) => {
    try {
        const res = await fetch(`${api_endpoint}/order`, {
            method: "POST",
            body: JSON.stringify({ ssId }),
            headers: { 'Content-type': 'application/json', }, 
            credentials: "include",
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};

// create order items records after the order record created
export const createNewOrderItem = async (orderId) => {
    try {
        const res = await fetch(`${api_endpoint}/order/orderItem`, {
            method: "POST",
            body: JSON.stringify({ orderId }),
            headers: { 'Content-type': 'application/json', }, 
            credentials: "include",
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};


