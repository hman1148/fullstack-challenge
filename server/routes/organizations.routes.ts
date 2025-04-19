import { Router } from "express";
import { OrganizationController } from "../controllers";

export const createOrganizationRoutes = (
  controller: OrganizationController
) => {
  const router = Router();

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};
