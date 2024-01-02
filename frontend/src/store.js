import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "./slices/baseApiSlice.js";
import shoppingCardSliceReducer from "./slices/shoppingCartSlice.js";
import authUserSliceReducer from "./slices/authUserSlice.js";

const store = configureStore({
   reducer: {
      [baseApiSlice.reducerPath]: baseApiSlice.reducer,
      authUser: authUserSliceReducer,
      shoppingCart: shoppingCardSliceReducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
   devTools: true,
});

export default store;
