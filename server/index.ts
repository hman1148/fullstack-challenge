import express from "express";
import cors from "cors";
import initializeDatabase from "./database/db";
import createRepositories from "./database/repo.factory";
import {
  AccountController,
  DealController,
  OrganizationController,
} from "./controllers";
import {
  createAccountRoutes,
  createDealRoutes,
  createOrganizationRoutes,
} from "./routes";

const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = initializeDatabase();

// add repos
const repositories = createRepositories();

// create controllers
const organizationController: OrganizationController =
  new OrganizationController(repositories.organizationRepo);
const accountController = new AccountController(repositories.accountRepo);
const dealController = new DealController(repositories.dealRepo);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/organizations", createOrganizationRoutes(organizationController));
app.use("/api/accounts", createAccountRoutes(accountController));
app.use("/api/deals", createDealRoutes(dealController));

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉", rows });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
