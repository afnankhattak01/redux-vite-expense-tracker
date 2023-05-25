import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  totalBalance: 0,
  remainingBalance: 0,
  spentSoFar: 0,
  transactionHistory: [],
  currentItemToUpdate: null,
};

const TrackerSlice = createSlice({
  name: "tracker",
  initialState,
  reducers: {
    addIncome: (state, { payload }) => {
      state.totalBalance += payload.transactionAmount;
      state.remainingBalance += payload.transactionAmount;
      let newPayload = { ...payload, id: uuid(), addedOn: new Date() };
      state.transactionHistory.push(newPayload);
    },

    addExpense: (state, { payload }) => {
      state.remainingBalance -= payload.transactionAmount;

      state.spentSoFar += payload.transactionAmount;
      let newPayload = { ...payload, id: uuid(), addedOn: new Date() };

      state.transactionHistory.push(newPayload);
    },

    updateTransaction: (state, { payload }) => {
      state.currentItemToUpdate = payload;
    },

    undoUpdateTransaction: (state, { payload }) => {
      state.currentItemToUpdate = null;
    },

    removeTransaction: (state, { payload }) => {
      const { id, transactionType, transactionAmount } = payload;

      switch (transactionType) {
        case "INCOME":
          state.remainingBalance -= transactionAmount;
          state.totalBalance -= transactionAmount;

          break;
        case "EXPENSE":
          state.spentSoFar -= transactionAmount;
          state.remainingBalance += transactionAmount;

          break;

        default:
          return state;
      }
      const newTransactions = state.transactionHistory.filter(
        (transaction) => transaction.id !== id
      );
      state.transactionHistory = newTransactions;
    },

    updateTransactionData: (state, { payload }) => {
      const { id, transactionType, transactionAmount, transactionName } =
        payload;

      let copy = [...state.transactionHistory];

      let newBalance = 0;

      let newRemainingBalance = 0;

      let newSpentSoFar = 0;

      for (let index = 0; index < copy.length; index++) {
        if (copy[index].id === id) {
          copy[index].transactionAmount = transactionAmount;
          copy[index].transactionName = transactionName;
          copy[index].transactionType = transactionType;
          break;
        }
      }

      for (let index = 0; index < copy.length; index++) {
        if (copy[index].transactionType === "INCOME") {
          newBalance += copy[index].transactionAmount;
          newRemainingBalance += copy[index].transactionAmount;
        }
        if (copy[index].transactionType === "EXPENSE") {
          newRemainingBalance -= copy[index].transactionAmount;
          newSpentSoFar += copy[index].transactionAmount;
        }
      }
      state.totalBalance = newBalance;
      state.remainingBalance = newRemainingBalance;
      state.spentSoFar = newSpentSoFar;

      state.currentItemToUpdate = null;
      state.transactionHistory = copy;
    },
  },
});

export default TrackerSlice.reducer;
export const {
  addIncome,
  addExpense,
  removeTransaction,
  updateTransaction,
  undoUpdateTransaction,
  updateTransactionData,
} = TrackerSlice.actions;
