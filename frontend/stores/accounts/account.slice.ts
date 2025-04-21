import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "../../models";

type AccountState = {
  accounts: Account[];
  selectedAccount: Account | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
};

export const initialAccountState = (): AccountState => ({
  accounts: [],
  selectedAccount: null,
  loading: false,
  loaded: false,
  error: null,
});

const accountSlice = createSlice({
  name: "accounts",
  initialState: initialAccountState(),
  reducers: {
    setAccountLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
      state.loaded = true;
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      const exists = state.accounts.some(
        (account) => account.id === action.payload.id
      );
      if (!exists) {
        state.accounts.push(action.payload);
      } else {
        state.accounts = state.accounts.map((account) =>
          account.id === action.payload.id ? action.payload : account
        );
      }
      state.selectedAccount = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccountInStore: (state, action: PayloadAction<Account>) => {
      state.accounts = state.accounts.map((account) =>
        account.id === action.payload.id ? action.payload : account
      );
      if (state.selectedAccount?.id === action.payload.id) {
        state.selectedAccount = action.payload;
      }
    },
    removeAccount: (state, action: PayloadAction<number>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
      if (state.selectedAccount?.id === action.payload) {
        state.selectedAccount = null;
      }
    },
    setSelectedAccount: (state, action: PayloadAction<Account | null>) => {
      state.selectedAccount = action.payload;
    },
    setAccountError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearAccountError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setAccountLoading,
  setAccounts,
  setAccount,
  addAccount,
  updateAccountInStore,
  removeAccount,
  setSelectedAccount,
  clearAccountError,
  setAccountError,
} = accountSlice.actions;

export default accountSlice.reducer;
