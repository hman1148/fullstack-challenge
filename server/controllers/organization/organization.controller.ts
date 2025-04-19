import { NextFunction, Request, RequestHandler, Response } from "express";
import { OrganizationRepository } from "../../database";
import { ItemResponse, ItemsResponse } from "../../models/response.model";
import { Organization } from "../../models";

export class OrganizationController {
  organizationRepo: OrganizationRepository;

  constructor(organizationRepo: OrganizationRepository) {
    this.organizationRepo = organizationRepo;
  }

  getAll: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizations = await this.organizationRepo.findAll();
      const response: ItemsResponse<Organization> = {
        message: "Organizations retrieved successfully",
        success: true,
        items: organizations,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getById: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId = parseInt(req.params.id);
      const organization = await this.organizationRepo.findById(organizationId);

      if (!organization) {
        const response: ItemResponse<string> = {
          message: "Organization not found",
          success: false,
          item: "",
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<Organization> = {
          message: "Organization retrieved successfully",
          success: true,
          item: organization,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  create: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationData = req.body;
      const newOrganization = await this.organizationRepo.create(
        organizationData
      );
      const response: ItemResponse<Organization> = {
        message: "Organization created successfully",
        success: true,
        item: newOrganization,
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  update: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId = parseInt(req.params.id);
      const organizationData = req.body;
      const updatedOrganization = await this.organizationRepo.update(
        organizationId,
        organizationData
      );

      if (!updatedOrganization) {
        const response: ItemResponse<string> = {
          message: "Organization not found",
          success: false,
          item: "",
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<Organization> = {
          message: "Organization updated successfully",
          success: true,
          item: updatedOrganization,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  delete: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId = parseInt(req.params.id);
      const deletedOrganization = await this.organizationRepo.delete(
        organizationId
      );

      if (!deletedOrganization) {
        const response: ItemResponse<string> = {
          message: "Organization not found",
          success: false,
          item: "",
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<boolean> = {
          message: "Organization deleted successfully",
          success: true,
          item: deletedOrganization,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };
}
