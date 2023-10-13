export const estimateArrival = (days) => {
    const etd = [];
    // get first ETD
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + days);

    while (currentDate.getDay()===6 || currentDate.getDay()===0) {
        currentDate.setDate(currentDate.getDate() + 1);
    } 

    // get second ETD
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    while (nextDate.getDay()===6 || nextDate.getDay()===0) {
        nextDate.setDate(nextDate.getDate() + 1);
    }

    // extract data and return
    [currentDate.toDateString(), nextDate.toDateString()].forEach(ele => {
        etd.push(ele.split(' '));
    });

    return etd;
};