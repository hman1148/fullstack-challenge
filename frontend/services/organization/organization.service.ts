import axios, { AxiosInstance } from "axios";

import { devConfig, ItemsResponse, Organization } from "../../models";
import { store } from "../../stores/store";
import { setOrganizationError, setOrganizations } from "../../stores";

export class OrganizationService {
  http: AxiosInstance;
  baseUrl: string;

  constructor() {
    this.baseUrl = `${devConfig.apiUrl}/organizations`;
    this.http = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchAllOrganizations(): Promise<void> {
    try {
      const { data } = await this.http.get<ItemsResponse<Organization>>(
        this.baseUrl
      );

      if (data.success) {
        store.dispatch(setOrganizations(data.items));
      } else {
        store.dispatch(setOrganizationError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }

  async fetchOrganizationById(id: number): Promise<void> {
    try {
      const { data } = await this.http.get<ItemsResponse<Organization>>(
        `${this.baseUrl}/${id}`
      );

      if (data.success) {
        store.dispatch(setOrganizations(data.items));
      } else {
        store.dispatch(setOrganizationError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }

  async createOrganization(
    organizationData: Omit<Organization, "id">
  ): Promise<void> {
    try {
      const { data } = await this.http.post<ItemsResponse<Organization>>(
        this.baseUrl,
        organizationData
      );

      if (data.success) {
        store.dispatch(setOrganizations(data.items));
      } else {
        store.dispatch(setOrganizationError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }

  async updateOrganization(
    id: number,
    organizationData: Partial<Organization>
  ): Promise<void> {
    try {
      const { data } = await this.http.put<ItemsResponse<Organization>>(
        `${this.baseUrl}/${id}`,
        organizationData
      );

      if (data.success) {
        store.dispatch(setOrganizations(data.items));
      } else {
        store.dispatch(setOrganizationError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }

  async deleteOrganization(id: number): Promise<void> {
    try {
      const { data } = await this.http.delete<ItemsResponse<Organization>>(
        `${this.baseUrl}/${id}`
      );

      if (data.success) {
        store.dispatch(setOrganizations(data.items));
      } else {
        store.dispatch(setOrganizationError(data.message));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      throw new Error(errorMessage);
    }
  }
}

export const organizationService = new OrganizationService();
