export type DealStatus = "draft" | "active" | "expired" | "cancelled";

export type Deal = {
  id: number;
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: DealStatus;
  created_at: string;
  updated_at: string;
};
