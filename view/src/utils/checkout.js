// for pre-built checkout flow
// dataObj contains productIdArr, cartInfoArr, firstName.
export const handleCheckout = async (dataObj) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/payment`, {
            method: "POST",
            body: JSON.stringify(dataObj),
            headers:{ 'Content-type': 'application/json' },
            credentials: 'include',
        });
        
        const result = await response.json();

        return result;

    } catch (error) {
        console.log('Error:', error);
    }
};

