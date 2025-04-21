import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useCallback, useEffect } from "react";
import { accountService } from "../../services";
import { clearAccountError, setSelectedAccount } from "./account.slice";
import { Account } from "../../models";

export const useAccounts = (organizationId?: number) => {
  const dispatch = useDispatch();

  const { accounts, selectedAccount, loading, loaded, error } = useSelector(
    (state: RootState) => state.accountOptions
  );

  useEffect(() => {
    if (!loaded && !loading) {
      if (organizationId) {
        accountService.fetchAccountsByOrganizationId(organizationId);
      } else {
        accountService.fetchAllAccounts();
      }
    }
  }, [loaded, loading, organizationId]);

  const selectAccount = useCallback(
    (id: number) => {
      const account = accounts.find((a) => a.id === id);

      if (account) {
        dispatch(setSelectedAccount(account));
      } else {
        accountService.fetchAccountById(id);
      }
    },
    [accounts, dispatch]
  );

  const clearSelectedAccount = useCallback(() => {
    dispatch(setSelectedAccount(null));
  }, [dispatch]);

  const createAccount = useCallback(
    async (accountData: Omit<Account, "id">) => {
      return await accountService.createAccount(accountData);
    },
    []
  );

  const updateAccount = useCallback(
    async (id: number, accountData: Partial<Account>) => {
      return await accountService.updateAccount(id, accountData);
    },
    []
  );

  const deleteAccount = useCallback(async (id: number) => {
    return await accountService.deleteAccount(id);
  }, []);

  const refreshAccounts = useCallback(() => {
    if (organizationId) {
      accountService.fetchAccountsByOrganizationId(organizationId);
    } else {
      accountService.fetchAllAccounts();
    }
  }, [organizationId]);

  const resetError = useCallback(() => {
    dispatch(clearAccountError());
  }, [dispatch]);

  return {
    // State
    accounts,
    selectedAccount,
    loading,
    loaded,
    error,

    // Actions
    selectAccount,
    clearSelectedAccount,
    refreshAccounts,
    createAccount,
    updateAccount,
    deleteAccount,
    resetError,
  };
};
