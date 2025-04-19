import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useEffect, useCallback } from "react";
import { dealService } from "../../services/deals/deal.service";
import { setSelectedDeal, clearError } from "./deal.slice";
import { Deal } from "../../models";

export const useDeals = (accountId?: number) => {
  const dispatch = useDispatch();

  const { deals, selectedDeal, loading, loaded, error } = useSelector(
    (state: RootState) => state.dealOptions
  );

  useEffect(() => {
    if (!loaded && !loading) {
      if (accountId) {
        dealService.fetchDealsByAccountId(accountId);
      } else {
        dealService.fetchAllDeals();
      }
    }
  }, [loaded, loading, accountId]);

  const selectDeal = useCallback(
    (id: number) => {
      const deal = deals.find((d) => d.id === id);
      if (deal) {
        dispatch(setSelectedDeal(deal));
      } else {
        dealService.fetchDealById(id);
      }
    },
    [deals, dispatch]
  );

  const clearSelectedDeal = useCallback(() => {
    dispatch(setSelectedDeal(null));
  }, [dispatch]);

  const refreshDeals = useCallback(() => {
    if (accountId) {
      dealService.fetchDealsByAccountId(accountId);
    } else {
      dealService.fetchAllDeals();
    }
  }, [accountId]);

  const createDeal = useCallback(async (dealData: Deal) => {
    return await dealService.createDeal(dealData);
  }, []);

  const updateDeal = useCallback(async (id: number, dealData: Deal) => {
    return await dealService.updateDeal(id, dealData);
  }, []);

  const deleteDeal = useCallback(async (id: number) => {
    return await dealService.deleteDeal(id);
  }, []);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get derived values from service
  const totalDealValue = dealService.calculateTotalDealValue();
  const activeDealValue = dealService.calculateActiveDealsValue();

  return {
    deals,
    selectedDeal,
    loading,
    loaded,
    error,

    totalDealValue,
    activeDealValue,

    selectDeal,
    clearSelectedDeal,
    refreshDeals,
    createDeal,
    updateDeal,
    deleteDeal,
    resetError,
  };
};
