import { Router } from "express";
import { DealController } from "../controllers";

export const createDealRoutes = (controller: DealController) => {
  const router = Router();

  router.get("/", controller.getDeals);
  router.get("/account/:account_id", controller.getDealsByAccountId);
  router.get(
    "/organization/:organization_id",
    controller.getDealsByOrganizationId
  );
  router.get("/status/:status", controller.getDealsByStatus);
  router.post("/", controller.createDeal);
  router.put("/:id", controller.updateDeal);
  router.delete("/:id", controller.deleteDeal);

  return router;
};
