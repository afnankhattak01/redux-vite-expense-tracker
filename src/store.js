import { configureStore } from "@reduxjs/toolkit";
import TrackerReducer from "./redux/trackerdataslices/trackerSlice";

const LOCAL_STORAGE_NAME = "BUDGETSTORE";
const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    const data = getState();

    const stateData = data.expensetracker;

    const expensetracker = {
      remainingBalance: stateData.remainingBalance,
      spentSoFar: stateData.spentSoFar,
      totalBalance: stateData.totalBalance,
      transactionHistory: stateData.transactionHistory,
      currentItemToUpdate: null,
    };

    localStorage.setItem(
      LOCAL_STORAGE_NAME,
      JSON.stringify({ expensetracker })
    );
    // below code works as node.js
    return result;
  };
};
const reHydrateStore = () => {
  if (localStorage.getItem(LOCAL_STORAGE_NAME) !== null) {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME)); // re-hydrate the store
  }
};

const TrackerStore = configureStore({
  reducer: {
    expensetracker: TrackerReducer,
  },

  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export { TrackerStore };
