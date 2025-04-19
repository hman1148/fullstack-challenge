import express from "express";
import cors from "cors";
import initializeDatabase from "./database/db";
import createRepositories from "./database/repo.factory";
import { OrganizationController } from "./controllers";
import { createOrganizationRoutes } from "./routes/organizations.routes";
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/organizations", createOrganizationRoutes(organizationController));

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉", rows });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
