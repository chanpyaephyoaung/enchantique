export const addTwoDecimals = (val) => (Math.round(val * 100) / 100).toFixed(2);

export const generateSeriesOfNums = (max) => {
   if (max <= 0) return [];
   else return [...Array(max).keys()];
};
