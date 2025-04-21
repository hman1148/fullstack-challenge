import axios, { AxiosInstance } from "axios";
import { Account, devConfig, ItemResponse, ItemsResponse } from "../../models";
import { store } from "../../stores/store";
import { setAccountError, setAccountLoading, setAccounts } from "../../stores";

export class AccountService {
  http: AxiosInstance;
  baseUrl: string;

  constructor() {
    this.baseUrl = `${devConfig.apiUrl}/accounts`;
    this.http = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchAllAccounts(): Promise<void> {
    store.dispatch(setAccountLoading(true));

    try {
      const { data } = await this.http.get<ItemsResponse<Account>>(
        this.baseUrl
      );

      if (data.success) {
        store.dispatch(setAccounts(data.items));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }

  async fetchAccountById(id: number): Promise<void> {
    store.dispatch(setAccountLoading(true));

    try {
      const { data } = await this.http.get<ItemResponse<Account>>(
        `${this.baseUrl}/${id}`
      );

      if (data.success) {
        store.dispatch(setAccounts([data.item]));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }
  async fetchAccountsByOrganizationId(organizationId: number): Promise<void> {
    store.dispatch(setAccountLoading(true));
    try {
      const { data } = await this.http.get<ItemsResponse<Account>>(
        `${this.baseUrl}/organization/${organizationId}`
      );

      if (data.success) {
        store.dispatch(setAccounts(data.items));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }

  async createAccount(accountData: Omit<Account, "id">): Promise<void> {
    store.dispatch(setAccountLoading(true));

    try {
      const { data } = await this.http.post<ItemResponse<Account>>(
        this.baseUrl,
        accountData
      );

      if (data.success) {
        store.dispatch(setAccounts([data.item]));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }

  async updateAccount(
    id: number,
    accountData: Partial<Account>
  ): Promise<void> {
    store.dispatch(setAccountLoading(true));

    try {
      const { data } = await this.http.put<ItemResponse<Account>>(
        `${this.baseUrl}/${id}`,
        accountData
      );

      if (data.success) {
        store.dispatch(setAccounts([data.item]));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }

  async deleteAccount(id: number): Promise<void> {
    store.dispatch(setAccountLoading(true));

    try {
      const { data } = await this.http.delete<ItemsResponse<Account>>(
        `${this.baseUrl}/${id}`
      );

      if (data.success) {
        store.dispatch(setAccounts(data.items));
      } else {
        store.dispatch(setAccountError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setAccountError(errorMessage));
    } finally {
      store.dispatch(setAccountLoading(false));
    }
  }
}

export const accountService = new AccountService();
