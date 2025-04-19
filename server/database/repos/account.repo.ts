import Database from "better-sqlite3";
import { Account } from "../../models";

export class AccountRepository {
  db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Account[] {
    return this.db.prepare("SELECT * FROM accounts").all() as Account[];
  }

  findById(id: number): Account | undefined {
    return this.db
      .prepare("SELECT * FROM accounts WHERE id = ?")
      .get(id) as Account;
  }

  findByOrganizationId(organization_id: number): Account[] | undefined {
    return this.db
      .prepare("SELECT * FROM accounts WHERE organization_id = ?")
      .all(organization_id) as Account[];
  }

  create(account: Omit<Account, "id" | "created_at" | "updated_at">): Account {
    const stmt = this.db.prepare(
      "INSERT INTO accounts (organization_id, name, contact_email, contact_phone) VALUES (?, ?, ?, ?) RETURNING *"
    );
    return stmt.get(
      account.organization_id,
      account.name,
      account.contact_email,
      account.contact_phone
    ) as Account;
  }

  update(
    id: number,
    data: Partial<Omit<Account, "id" | "created_at" | "updated_at">>
  ): Account | undefined {
    if (!Object.keys(data).length) return this.findById(id);

    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const stmt = this.db.prepare(
      `UPDATE accounts SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *`
    );

    return stmt.get(...Object.values(data), id) as Account | undefined;
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare("DELETE FROM accounts WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
