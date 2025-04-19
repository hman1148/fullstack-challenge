import Database from "better-sqlite3";
import { Deal, DealStatus } from "../../models";

export class DealRepository {
  db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Deal[] {
    return this.db.prepare("SELECT * FROM deals").all() as Deal[];
  }

  findById(id: number): Deal | undefined {
    return this.db.prepare("SELECT * FROM deals WHERE id = ?").get(id) as Deal;
  }

  findByAccountId(account_id: number): Deal[] | undefined {
    return this.db
      .prepare("SELECT * FROM deals WHERE account_id = ?")
      .all(account_id) as Deal[];
  }

  findByOrganizationId(organization_id: number): Deal[] | undefined {
    return this.db
      .prepare(
        `SELECT deals.* FROM deals
         JOIN accounts ON deals.account_id = accounts.id
         WHERE accounts.organization_id = ?`
      )
      .all(organization_id) as Deal[];
  }

  findByStatus(status: DealStatus): Deal[] | undefined {
    return this.db
      .prepare("SELECT * FROM deals WHERE status = ?")
      .all(status) as Deal[];
  }

  create(deal: Omit<Deal, "id" | "created_at" | "updated_at">): Deal {
    const stmt = this.db.prepare(
      "INSERT INTO deals (account_id, start_date, end_date, value, status) VALUES (?, ?, ?, ?, ?) RETURNING *"
    );
    return stmt.get(
      deal.account_id,
      deal.start_date,
      deal.end_date,
      deal.value,
      deal.status
    ) as Deal;
  }

  update(
    id: number,
    data: Partial<Omit<Deal, "id" | "created_at" | "updated_at">>
  ): Deal | undefined {
    if (!Object.keys(data).length) return this.findById(id);

    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const stmt = this.db.prepare(
      `UPDATE deals SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *`
    );

    return stmt.get(...Object.values(data), id) as Deal | undefined;
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare("DELETE FROM deals WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
