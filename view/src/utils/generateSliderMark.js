const generateSliderMark = (start, end, step) => {
    return Array.from(
        { length: Math.floor((end - start) / step) + 1 }, 
        (_, index) => start + index * step);
};

const marks = []
    .concat(generateSliderMark(0, 100, 5))
    .concat(generateSliderMark(110, 200, 10))
    .concat(generateSliderMark(220, 300, 20))
    .concat(generateSliderMark(350, 500, 50))
    .concat(generateSliderMark(600, 1000, 100));

// Calculate the interval
const interval = Math.floor(1000 / (marks.length - 1));

// Transform the original values to be evenly distributed
// // return obj: { 'position': value }
export const marksToPrices = marks.reduce((acc, curr, idx) => {
  const position = interval * idx;
  acc[position] = curr;
  return acc;
}, {});

export const pricesToMakers = Object.entries(marksToPrices).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});