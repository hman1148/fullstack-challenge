import { Router } from "express";
import { AccountController } from "../controllers";

export const createAccountRoutes = (controller: AccountController) => {
  const router = Router();

  router.get("/", controller.getAccounts);
  router.get("/:id", controller.getAccountById);
  router.get(
    "/organization/:organization_id",
    controller.getAccountsByOrganizationId
  );
  router.post("/", controller.createAccount);
  router.put("/:id", controller.updateAccount);
  router.delete("/:id", controller.deleteAccount);

  return router;
};
