const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

export const getProducts = async (queryString) => {
    try {
        const res = await fetch(`${api_endpoint}/product?${queryString}`, {
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

export const getProductDetails = async (productId) => {
    try {
        const res = await fetch(`${api_endpoint}/product/${productId}`, {
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

export const getFilter = async() => {
    try {
        const res = await fetch(`${api_endpoint}/feature`, {
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
