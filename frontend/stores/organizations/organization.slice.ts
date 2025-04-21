import { Organization } from "../../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OrganizationState = {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
};

export const initialOrganizationState = (): OrganizationState => ({
  organizations: [],
  selectedOrganization: null,
  loading: false,
  loaded: false,
  error: null,
});

const organizationSlice = createSlice({
  name: "organizations",
  initialState: initialOrganizationState(),
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOrganizations: (state, action: PayloadAction<Organization[]>) => {
      state.organizations = action.payload;
      state.loaded = true;
    },
    setOrganization: (state, action: PayloadAction<Organization>) => {
      const exists = state.organizations.some(
        (organization) => organization.id === action.payload.id
      );
      if (!exists) {
        state.organizations.push(action.payload);
      } else {
        state.organizations = state.organizations.map((organization) =>
          organization.id === action.payload.id ? action.payload : organization
        );
      }
      state.selectedOrganization = action.payload;
    },
    addOrganization: (state, action: PayloadAction<Organization>) => {
      state.organizations.push(action.payload);
    },
    updateOrganizationInStore: (state, action: PayloadAction<Organization>) => {
      state.organizations = state.organizations.map((organization) =>
        organization.id === action.payload.id ? action.payload : organization
      );
      if (state.selectedOrganization?.id === action.payload.id) {
        state.selectedOrganization = action.payload;
      }
    },
    removeOrganization: (state, action: PayloadAction<number>) => {
      state.organizations = state.organizations.filter(
        (organization) => organization.id !== action.payload
      );
      if (state.selectedOrganization?.id === action.payload) {
        state.selectedOrganization = null;
      }
    },
    setSelectedOrganization: (
      state,
      action: PayloadAction<Organization | null>
    ) => {
      state.selectedOrganization = action.payload;
    },
    setOrganizationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setOrganizationLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    clearOrganizationError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setOrganizations,
  setOrganization,
  addOrganization,
  updateOrganizationInStore,
  removeOrganization,
  setSelectedOrganization,
  setOrganizationError,
  setOrganizationLoading,
  clearOrganizationError,
} = organizationSlice.actions;

export default organizationSlice.reducer;
