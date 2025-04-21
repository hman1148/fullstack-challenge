import { Deal } from "../../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DealState = {
  deals: Deal[];
  selectedDeal: Deal | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
};

export const initialDealState = (): DealState => ({
  deals: [],
  selectedDeal: null,
  loading: false,
  loaded: false,
  error: null,
});

const dealSlice = createSlice({
  name: "deals",
  initialState: initialDealState(),
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDeals: (state, action: PayloadAction<Deal[]>) => {
      state.deals = action.payload;
      state.loaded = true;
    },
    setDeal: (state, action: PayloadAction<Deal>) => {
      const exists = state.deals.some((deal) => deal.id === action.payload.id);
      if (!exists) {
        state.deals.push(action.payload);
      } else {
        state.deals = state.deals.map((deal) =>
          deal.id === action.payload.id ? action.payload : deal
        );
      }
      state.selectedDeal = action.payload;
    },
    addDeal: (state, action: PayloadAction<Deal>) => {
      state.deals.push(action.payload);
    },
    updateDealInStore: (state, action: PayloadAction<Deal>) => {
      state.deals = state.deals.map((deal) =>
        deal.id === action.payload.id ? action.payload : deal
      );
      if (state.selectedDeal?.id === action.payload.id) {
        state.selectedDeal = action.payload;
      }
    },
    removeDeal: (state, action: PayloadAction<number>) => {
      state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      if (state.selectedDeal?.id === action.payload) {
        state.selectedDeal = null;
      }
    },
    setSelectedDeal: (state, action: PayloadAction<Deal | null>) => {
      state.selectedDeal = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setDeals,
  setDeal,
  addDeal,
  updateDealInStore,
  removeDeal,
  setSelectedDeal,
  setError,
  clearError,
} = dealSlice.actions;

export default dealSlice.reducer;
