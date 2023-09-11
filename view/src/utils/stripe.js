// using pre-built checkout
export const getPaymentInfo = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payment/status`, {
            headers: { 
                'Content-type': 'application/json',
             },
            credentials: 'include',
        });

        const response = await res.json();

        return response;

    } catch (error) {
        throw { error };
    }
};

export const removePaymentInfo = async (ssId) => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payment/${ssId}`, {
            method: "DELETE",
            headers: { 
                'Content-type': 'application/json',
            },
            credentials: 'include',
        });

        return res.status;

    } catch (error) {
        throw { error };
    }
};

