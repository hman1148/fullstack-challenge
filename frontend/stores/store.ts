import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import createWebStorage from "redux-persist/es/storage/createWebStorage";
import dealOptionReducer from "./deal/deal.slice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const localStorageFallBack =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const dealOptionsPersistConfig = {
  key: "dealOptions",
  storage: localStorageFallBack,
};

// Create Persisted Reducer
const persistDealReducer = persistReducer(
  dealOptionsPersistConfig,
  dealOptionReducer
);

export const store = configureStore({
  reducer: {
    dealOptions: persistDealReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types related to redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["samsaraInterceptedReports.samsaraInterceptions"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
