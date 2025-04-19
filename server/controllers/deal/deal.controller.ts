import { NextFunction, Request, Response } from "express";
import { DealRepository } from "../../database";
import { ItemResponse, ItemsResponse } from "../../models/response.model";
import { Deal, DealStatus } from "../../models";

export class DealController {
  dealRepo: DealRepository;

  constructor(dealRepo: DealRepository) {
    this.dealRepo = dealRepo;
  }

  async getDeals(req: Request, res: Response, next: NextFunction) {
    try {
      const deals = await this.dealRepo.findAll();
      const response: ItemsResponse<Deal> = {
        message: "Deals retrieved successfully",
        success: true,
        items: deals,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDealsByAccountId(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = parseInt(req.params.account_id);
      const deals = await this.dealRepo.findByAccountId(accountId);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        return res.status(404).json(response);
      }

      const response: ItemsResponse<Deal> = {
        message: "Deals retrieved successfully",
        success: true,
        items: deals,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDealsByOrganizationId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const organizationId = parseInt(req.params.organization_id);
      const deals = await this.dealRepo.findByOrganizationId(organizationId);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        return res.status(404).json(response);
      }

      const response: ItemsResponse<Deal> = {
        message: "Deals retrieved successfully",
        success: true,
        items: deals,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDealsByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const status = req.params.status as DealStatus;
      const deals = await this.dealRepo.findByStatus(status);

      if (!deals) {
        const response: ItemsResponse<string> = {
          message: "Deals not found",
          success: false,
          items: [],
        };
        return res.status(404).json(response);
      }

      const response: ItemsResponse<Deal> = {
        message: "Deals retrieved successfully",
        success: true,
        items: deals,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async createDeal(req: Request, res: Response, next: NextFunction) {
    try {
      const dealData = req.body;
      const newDeal = await this.dealRepo.create(dealData);
      const response: ItemsResponse<Deal> = {
        message: "Deal created successfully",
        success: true,
        items: [newDeal],
      };
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateDeal(req: Request, res: Response, next: NextFunction) {
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
        return res.status(404).json(response);
      }

      const response: ItemsResponse<Deal> = {
        message: "Deal updated successfully",
        success: true,
        items: [updatedDeal],
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteDeal(req: Request, res: Response, next: NextFunction) {
    try {
      const dealId = parseInt(req.params.id);
      const deletedDeal = await this.dealRepo.delete(dealId);

      if (!deletedDeal) {
        const response: ItemResponse<string> = {
          message: "Deal not found",
          success: false,
          item: "",
        };
        return res.status(404).json(response);
      }

      const response: ItemResponse<boolean> = {
        message: "Deal deleted successfully",
        success: true,
        item: deletedDeal,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
