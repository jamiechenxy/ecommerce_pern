export const filterActivity = (ele, arr) => {
    if (arr.length===0) {
        return '';
    } 
    if (arr.includes(ele)) {
        return '-active';
    } else {
        return '';
    }
}; 