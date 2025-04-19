import Database from "better-sqlite3";
import { Organization } from "../../models";

export class OrganizationRepository {
  db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  findAll(): Organization[] {
    return this.db
      .prepare("SELECT * FROM organizations")
      .all() as Organization[];
  }

  findById(id: number): Organization | undefined {
    return this.db
      .prepare("SELECT * FROM organizations WHERE id = ?")
      .get(id) as Organization;
  }

  create(
    organization: Omit<Organization, "id" | "created_at" | "updated_at">
  ): Organization {
    const stmt = this.db.prepare(
      "INSERT INTO organizations (name) VALUES (?) RETURNING *"
    );
    return stmt.get(organization.name) as Organization;
  }

  update(
    id: number,
    data: Partial<Omit<Organization, "id" | "created_at" | "updated_at">>
  ): Organization | undefined {
    if (!Object.keys(data).length) return this.findById(id);

    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const stmt = this.db.prepare(
      `UPDATE organizations SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *`
    );

    return stmt.get(...Object.values(data), id) as Organization | undefined;
  }

  delete(id: number): boolean {
    const stmt = this.db.prepare("DELETE FROM organizations WHERE id = ?");
    const result = stmt.run(id);
    return result.changes > 0;
  }
}
