const api_endpoint = process.env.REACT_APP_API_ENDPOINT;


// data: productId value
export const addItemToCart = async (productId) => {
    try {
        const response = await fetch(`${api_endpoint}/cart`, {
            method: "POST",
            body: JSON.stringify({productId}),
            headers: {'Content-type': 'application/json',},
            credentials: 'include',
        });

        const res = await response.json();
        
        return res;

    } catch (error) {
        return { error };
    }
};

// data: itemId value
export const subtractCartItemQuantity = async (itemId) => {
    try {
        const response = await fetch(`${api_endpoint}/cart/cartItem/${itemId}`, {
            method: "DELETE",
            headers: {'Content-type': 'application/json',},
            credentials: 'include',
        });

        const res = await response.json();
        
        return res;
        
    } catch (error) {
        return { error };
    }
};


export const getCartInfoToDisplay = async() => {
    try {
        const res = await fetch(`${api_endpoint}/cart/display`, {
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        if (res.status===404) {
            return [];
        }

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};

export const getCartInfo = async () => {
    try {
        const res = await fetch(`${api_endpoint}/cart`, {
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        const response = await res.json();

        return response;
        
    } catch (error) {
        return { error };
    }
};

// below is to handle all process cart status on backend.
export const handleCartStatusProcess = async () => {
    try {
        const res = await fetch(`${api_endpoint}/cart/process`, {
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        const response = await res.json();

        return response;
        
    } catch (error) {
        return { error };
    }
};

// update payment_process indicating user is going to checkout cart
// starting checkout and payment process
export const updateCartPaymentProcess = async(status) => {
    try {
        const res = await fetch(`${api_endpoint}/cart/status`, {
            method: "PUT",
            body: JSON.stringify({ 
                status, 
            }),
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};

export const getCartPaymentProcess = async(status) => {
    try {
        const res = await fetch(`${api_endpoint}/cart/status`, {
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        const response = await res.json();

        return response;

    } catch (error) {
        return { error };
    }
};


// remove associated cart and cart items once for all by cart id
export const clearCartAndCartItem = async(cartId) => {
    try {
        const res = await fetch(`${api_endpoint}/cart/clear/${cartId}`, {
            method: "DELETE",
            headers: {'Content-type': 'application/json',},
            credentials: 'include',
        });

        return res.status;

    } catch (error) {
        return { error };
    }
};


