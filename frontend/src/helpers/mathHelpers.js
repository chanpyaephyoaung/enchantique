export const addTwoDecimals = (val) => (Math.round(val * 100) / 100).toFixed(2);

export const generateSeriesOfNums = (max) => [...Array(max).keys()];
