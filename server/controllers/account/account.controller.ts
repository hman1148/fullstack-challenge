import { NextFunction, Request, RequestHandler, Response } from "express";
import { AccountRepository } from "../../database";
import { Account } from "../../models";
import { ItemResponse, ItemsResponse } from "../../models/response.model";

export class AccountController {
  accountRepo: AccountRepository;

  constructor(accountRepo: AccountRepository) {
    this.accountRepo = accountRepo;
  }

  getAccounts: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accounts = await this.accountRepo.findAll();
      const response: ItemsResponse<Account> = {
        message: "Accounts retrieved successfully",
        success: true,
        items: accounts,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getAccountById: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = parseInt(req.params.id);
      const account = await this.accountRepo.findById(accountId);

      if (!account) {
        const response: ItemsResponse<string> = {
          message: "Account not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<Account> = {
          message: "Account retrieved successfully",
          success: true,
          item: account,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  getAccountsByOrganizationId: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const organizationId = parseInt(req.params.organization_id);
      const accounts = await this.accountRepo.findByOrganizationId(
        organizationId
      );

      if (!accounts) {
        const response: ItemsResponse<string> = {
          message: "Accounts not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemsResponse<Account> = {
          message: "Accounts retrieved successfully",
          success: true,
          items: accounts,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  createAccount: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountData = req.body;
      const newAccount = await this.accountRepo.create(accountData);
      const response: ItemsResponse<Account> = {
        message: "Account created successfully",
        success: true,
        items: [newAccount],
      };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  updateAccount: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = parseInt(req.params.id);
      const accountData = req.body;
      const updatedAccount = await this.accountRepo.update(
        accountId,
        accountData
      );

      if (!updatedAccount) {
        const response: ItemsResponse<string> = {
          message: "Account not found",
          success: false,
          items: [],
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<Account> = {
          message: "Account updated successfully",
          success: true,
          item: updatedAccount,
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteAccount: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accountId = parseInt(req.params.id);
      const deletedAccount = await this.accountRepo.delete(accountId);

      if (!deletedAccount) {
        const response: ItemResponse<string> = {
          message: "Account not found",
          success: false,
          item: "",
        };
        res.status(404).json(response);
      } else {
        const response: ItemResponse<string> = {
          message: "Account deleted successfully",
          success: true,
          item: "Account deleted successfully",
        };
        res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  };
}
