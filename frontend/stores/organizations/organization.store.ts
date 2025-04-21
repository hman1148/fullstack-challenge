import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useCallback, useEffect } from "react";
import { organizationService } from "../../services";
import {
  clearOrganizationError,
  setSelectedOrganization,
} from "./organization.slice";
import { Organization } from "../../models";

export const useOrganizations = () => {
  const dispatch = useDispatch();

  const { organizations, selectedOrganization, loading, loaded, error } =
    useSelector((state: RootState) => state.organizationOptions);

  useEffect(() => {
    if (!loaded && !loading) {
      organizationService.fetchAllOrganizations();
    }
  }, [loaded, loading]);

  const selectOrganization = useCallback(
    (id: number) => {
      const organization = organizations.find((o) => o.id === id);
      if (organization) {
        dispatch(setSelectedOrganization(organization));
      } else {
        organizationService.fetchOrganizationById(id);
      }
    },
    [organizations, dispatch]
  );

  const clearSelectedOrganization = useCallback(() => {
    dispatch(setSelectedOrganization(null));
  }, [dispatch]);

  const refreshOrganizations = useCallback(() => {
    organizationService.fetchAllOrganizations();
  }, []);

  const createOrganization = useCallback(
    async (organizationData: Omit<Organization, "id">) => {
      return await organizationService.createOrganization(organizationData);
    },
    []
  );

  const updateOrganization = useCallback(
    async (id: number, organizationData: Organization) => {
      return await organizationService.updateOrganization(id, organizationData);
    },
    []
  );

  const deleteOrganization = useCallback(async (id: number) => {
    return await organizationService.deleteOrganization(id);
  }, []);

  const resetError = useCallback(() => {
    dispatch(clearOrganizationError());
  }, [dispatch]);

  return {
    organizations,
    selectedOrganization,
    loading,
    loaded,
    error,

    selectOrganization,
    clearSelectedOrganization,
    refreshOrganizations,
    createOrganization,
    updateOrganization,
    deleteOrganization,
    resetError,
  };
};
