import initializeDatabase from "./db";
import { AccountRepository } from "./repos/account.repo";
import { OrganizationRepository } from "./repos/organization.repo";
import { DealRepository } from "./repos/deal.repo";
import { Account, Deal, Organization } from "../models";

const seedDatabase = async () => {
  const db = initializeDatabase();
  const organizationRepo = new OrganizationRepository(db);
  const accountRepo = new AccountRepository(db);
  const dealRepo = new DealRepository(db);

  try {
    console.log("Creating organizations...");
    const organizations: Omit<
      Organization,
      "id" | "created_at" | "updated_at"
    >[] = [
      { name: "SponsorTech" },
      { name: "EventMasters" },
      { name: "SportsInc" },
      { name: "MediaGroup" },
    ];

    const createdOrganizations: Organization[] = [];
    for (const org of organizations) {
      const createdOrg = organizationRepo.create(org);
      createdOrganizations.push(createdOrg);
      console.log(
        `Created organization: ${createdOrg.name} (ID: ${createdOrg.id})`
      );
    }

    const accounts: Omit<Account, "id" | "created_at" | "updated_at">[] = [
      {
        organization_id: createdOrganizations[0].id,
        name: "Amazon",
        contact_email: "contact@amazon.com",
        contact_phone: "555-123-4567",
      },
      {
        organization_id: createdOrganizations[0].id,
        name: "Google",
        contact_email: "contact@google.com",
        contact_phone: "555-234-5678",
      },
      {
        organization_id: createdOrganizations[0].id,
        name: "Microsoft",
        contact_email: "contact@microsoft.com",
        contact_phone: "555-345-6789",
      },

      {
        organization_id: createdOrganizations[1].id,
        name: "Nike",
        contact_email: "contact@nike.com",
        contact_phone: "555-456-7890",
      },
      {
        organization_id: createdOrganizations[1].id,
        name: "Adidas",
        contact_email: "contact@adidas.com",
        contact_phone: "555-567-8901",
      },

      {
        organization_id: createdOrganizations[2].id,
        name: "Coca-Cola",
        contact_email: "contact@cocacola.com",
        contact_phone: "555-678-9012",
      },
      {
        organization_id: createdOrganizations[2].id,
        name: "Pepsi",
        contact_email: "contact@pepsi.com",
        contact_phone: "555-789-0123",
      },

      {
        organization_id: createdOrganizations[3].id,
        name: "Ford",
        contact_email: "contact@ford.com",
        contact_phone: "555-890-1234",
      },
      {
        organization_id: createdOrganizations[3].id,
        name: "Toyota",
        contact_email: "contact@toyota.com",
        contact_phone: "555-901-2345",
      },
      {
        organization_id: createdOrganizations[3].id,
        name: "BMW",
        contact_email: "contact@bmw.com",
        contact_phone: "555-012-3456",
      },
    ];

    const createdAccounts: Account[] = [];
    for (const account of accounts) {
      const createdAccount = accountRepo.create(account);
      createdAccounts.push(createdAccount);
      console.log(
        `Created account: ${createdAccount.name} (ID: ${createdAccount.id})`
      );
    }

    console.log("\nCreating deals...");
    const currentYear = new Date().getFullYear();

    const getRandomDate = (year: number) => {
      const month = Math.floor(Math.random() * 12) + 1;
      const day = Math.floor(Math.random() * 28) + 1;
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    };

    const getRandomStatus = (): Deal["status"] => {
      const statuses: Deal["status"][] = [
        "draft",
        "active",
        "expired",
        "cancelled",
      ];
      return statuses[Math.floor(Math.random() * statuses.length)];
    };

    const getRandomValue = () => {
      const values = [
        5000, 10000, 15000, 25000, 50000, 75000, 100000, 150000, 200000, 500000,
      ];
      return values[Math.floor(Math.random() * values.length)];
    };

    const deals: Omit<Deal, "id" | "created_at" | "updated_at">[] = [];

    for (const account of createdAccounts) {
      const numDeals = Math.floor(Math.random() * 3) + 2;

      for (let i = 0; i < numDeals; i++) {
        const year = currentYear - Math.floor(Math.random() * 3); // Random year between current and 2 years ago
        const nextYear = year + 1;

        deals.push({
          account_id: account.id,
          start_date: getRandomDate(year),
          end_date: getRandomDate(nextYear),
          value: getRandomValue(),
          status: getRandomStatus(),
        });
      }
    }

    for (const deal of deals) {
      const createdDeal = dealRepo.create(deal);
      console.log(
        `Created deal: Account ID: ${createdDeal.account_id}, Value: $${createdDeal.value}, Status: ${createdDeal.status}`
      );
    }

    console.log("Database seeded successfully!");
    console.log(`Created ${createdOrganizations.length} organizations`);
    console.log(`Created ${createdAccounts.length} accounts`);
    console.log(`Created ${deals.length} deals`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    db.close();
  }
};

seedDatabase();
