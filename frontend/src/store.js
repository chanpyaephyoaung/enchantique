import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import shoppingCardSliceReducer from "./slices/shoppingCartSlice.js";
import authUserSliceReducer from "./slices/authUserSlice.js";

const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      authUser: authUserSliceReducer,
      shoppingCart: shoppingCardSliceReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;
