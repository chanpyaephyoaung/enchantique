import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./slices/baseApiSlice.js";
import shoppingCartSliceReducer from "./slices/shoppingCartSlice.js";
import authUserSliceReducer from "./slices/authUserSlice.js";

const store = configureStore({
   reducer: {
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
      authUser: authUserSliceReducer,
      shoppingCart: shoppingCartSliceReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
   devTools: true,
});

export default store;
