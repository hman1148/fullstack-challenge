import { NextFunction, Request, RequestHandler, Response } from "express";
import { DealRepository } from "../../database";
import { ItemResponse, ItemsResponse } from "../../models/response.model";
import { Deal, DealStatus } from "../../models";

export class DealController {
  dealRepo: DealRepository;

  constructor(dealRepo: DealRepository) {
    this.dealRepo = dealRepo;
  }

  getDeals: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const deals = await this.dealRepo.findAll();
      const response: ItemsResponse<Deal> = {
        message: "Deals retrieved successfully",
        success: true,
        items: deals,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getDealsByAccountId: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = parseInt(req.params.account_id);
      const deals = await this.dealRepo.findByAccountId(accountId);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemsResponse<Deal> = {
          message: "Deals retrieved successfully",
          success: true,
          items: deals,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  getDealsByOrganizationId: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId = parseInt(req.params.organization_id);
      const deals = await this.dealRepo.findByOrganizationId(organizationId);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemsResponse<Deal> = {
          message: "Deals retrieved successfully",
          success: true,
          items: deals,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  getDealsByStatus: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const status = req.params.status as DealStatus;
      const deals = await this.dealRepo.findByStatus(status);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemsResponse<Deal> = {
          message: "Deals retrieved successfully",
          success: true,
          items: deals,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  createDeal: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dealData = req.body;
      const newDeal = await this.dealRepo.create(dealData);
      const response: ItemsResponse<Deal> = {
        message: "Deal created successfully",
        success: true,
        items: [newDeal],
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateDeal: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dealId = parseInt(req.params.id);
      const dealData = req.body;
      const updatedDeal = await this.dealRepo.update(dealId, dealData);

      if (!updatedDeal) {
        const response: ItemsResponse<string> = {
          message: "Deal not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<Deal> = {
          message: "Deal updated successfully",
          success: true,
          item: updatedDeal,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteDeal: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const dealId = parseInt(req.params.id);
      const deletedDeal = await this.dealRepo.delete(dealId);

      if (!deletedDeal) {
        const response: ItemResponse<string> = {
          message: "Deal not found",
          success: false,
          item: "",
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<boolean> = {
          message: "Deal deleted successfully",
          success: true,
          item: deletedDeal,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };
}
