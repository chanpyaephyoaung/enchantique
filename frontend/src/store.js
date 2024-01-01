import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import shoppingCardSliceReducer from "./slices/shoppingCartSlice.js";

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      shoppingCart: shoppingCardSliceReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;
