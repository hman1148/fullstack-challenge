import axios, { AxiosInstance } from "axios";
import {
  Deal,
  DealStatus,
  devConfig,
  ItemResponse,
  ItemsResponse,
} from "../../models";
import {
  addDeal,
  removeDeal,
  setDeal,
  setDeals,
  setError,
  setLoading,
  updateDealInStore,
} from "../../stores/deal/deal.slice";
import { store } from "../../stores/store";
export class DealService {
  readonly http: AxiosInstance;
  readonly baseUrl: string;

  constructor() {
    this.baseUrl = `${devConfig.apiUrl}/deals`;
    this.http = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchAllDeals(): Promise<void> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.get<ItemsResponse<Deal>>(this.baseUrl);

      if (data.success) {
        store.dispatch(setDeals(data.items));
      } else {
        store.dispatch(setError(data.message));
      }
    } catch (error) {
      const erorrMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      store.dispatch(setError(erorrMessage));
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async fetchDealById(id: number): Promise<void> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.get<ItemResponse<Deal>>(
        `${this.baseUrl}/${id}}`
      );

      if (data.success) {
        store.dispatch(setDeal(data.item));
      } else {
        store.dispatch(setError(data.message));
      }
    } catch (error) {
      const erorrMessage =
        error instanceof Error ? error.message : "An unknown error occured";
      store.dispatch(setError(erorrMessage));
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async fetchDealsByAccountId(accountId: number): Promise<void> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.get<ItemsResponse<Deal>>(
        `${this.baseUrl}/account/${accountId}`
      );

      if (data.success) {
        store.dispatch(setDeals(data.items));
      } else {
        store.dispatch(setError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async createDeal(dealData: Deal): Promise<boolean> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.post<ItemResponse<Deal>>(
        this.baseUrl,
        dealData
      );

      if (data.success && data.item) {
        store.dispatch(addDeal(data.item));
        return true;
      } else {
        store.dispatch(setError(data.message || "Failed to create deal"));
        return false;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
      return false;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async updateDeal(id: number, dealData: Deal): Promise<boolean> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.put<ItemResponse<Deal>>(
        `${this.baseUrl}/${id}`,
        dealData
      );

      if (data.success && data.item) {
        store.dispatch(updateDealInStore(data.item));
        return true;
      } else {
        store.dispatch(setError(data.message || "Failed to update deal"));
        return false;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
      return false;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  async deleteDeal(id: number): Promise<boolean> {
    store.dispatch(setLoading(true));

    try {
      const { data } = await this.http.delete<ItemResponse<boolean>>(
        `${this.baseUrl}/${id}`
      );

      if (data.success) {
        store.dispatch(removeDeal(id));
        return true;
      } else {
        store.dispatch(setError(data.message || "Failed to delete deal"));
        return false;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
      return false;
    } finally {
      store.dispatch(setLoading(false));
    }
  }

  // Add this method to your DealService class
  async fetchDealsByFilters(
    organizationId?: number,
    accountId?: number,
    filters?: {
      status?: DealStatus | null;
      year?: number | null;
      search?: string;
    }
  ): Promise<void> {
    store.dispatch(setLoading(true));

    try {
      // Build query parameters
      const params = new URLSearchParams();

      if (filters?.status) {
        params.append("status", filters.status);
      }

      if (filters?.year) {
        params.append("year", filters.year.toString());
      }

      if (filters?.search) {
        params.append("search", filters.search);
      }

      let url: string;

      // Determine which endpoint to use based on provided IDs
      if (organizationId) {
        url = `${this.baseUrl}/organization/${organizationId}`;
      } else if (accountId) {
        url = `${this.baseUrl}/account/${accountId}`;
      } else {
        url = this.baseUrl;
      }

      // Add the query string to the URL if there are parameters
      const queryString = params.toString();
      if (queryString) {
        url = `${url}?${queryString}`;
      }

      const { data } = await this.http.get<ItemsResponse<Deal>>(url);

      if (data.success) {
        store.dispatch(setDeals(data.items));
      } else {
        store.dispatch(setError(data.message || "Failed to fetch deals"));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      store.dispatch(setError(errorMessage));
    } finally {
      store.dispatch(setLoading(false));
    }
  }
  calculateTotalDealValue(): number {
    const state = store.getState().dealOptions;
    return state.deals.reduce((total, deal) => total + deal.value, 0);
  }

  calculateActiveDealsValue(): number {
    const state = store.getState().dealOptions;
    return state.deals
      .filter((deal) => deal.status === "active")
      .reduce((total, deal) => total + deal.value, 0);
  }
}

export const dealService = new DealService();
