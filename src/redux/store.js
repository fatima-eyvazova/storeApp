import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "../redux/slices/shared/apiSlice";
import authSliceReducer from "./slices/shared/authSlice";
import selectedItemSliceReducer from "./slices/dashboard/selectedItemSlice";
const persistConfig = {
    key: "root",
    storage,
    blacklist: ["basket", "selectedItem", "api"],
};
const rootReducer = combineReducers({
    auth: authSliceReducer,
    selectedItem: selectedItemSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ["persist/PERSIST"],
        },
    }).concat(apiSlice.middleware),
});
export const persistor = persistStore(store);
