import initializeDatabase from "./db";
import { AccountRepository } from "./repos/account.repo";
import { DealRepository } from "./repos/deal.repo";
import { OrganizationRepository } from "./repos/organization.repo";

const createRepositories = () => {
  const db = initializeDatabase();

  return {
    organizationRepo: new OrganizationRepository(db),
    accountRepo: new AccountRepository(db),
    dealRepo: new DealRepository(db),
  };
};

export type Repositories = ReturnType<typeof createRepositories>;

export default createRepositories;
