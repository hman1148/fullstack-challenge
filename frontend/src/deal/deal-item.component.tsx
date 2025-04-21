import { Button } from "primereact/button";
import { Deal, DealStatus } from "../../models";

import { Tag } from "primereact/tag";

type DealItemProps = {
  deal: Deal;
  onView?: (id: number) => void;
  onDelete?: (id: number) => void;
  showActions?: boolean;
};

const DealItem: React.FC<DealItemProps> = ({
  deal,
  onView,
  onDelete,
  showActions = true,
}) => {
  const getServerity = (status: DealStatus) => {
    switch (status) {
      case "active":
        return "success";
      case "draft":
        return "info";
      case "expired":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return null;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <div className="border-bottom-1 surface-border p-2">
      <div className="flex align-items-center justify-content-between">
        <div className="flex align-items-center">
          <span className="text-900 font-medium mr-2">{`Account ID: ${deal.account_id}`}</span>
        </div>
        <span className="text-900 font-bold">{formatCurrency(deal.value)}</span>
      </div>


      <div className="flex align-items-center justify-content-between mt-2">
        <div>
          <Tag value={deal.status} severity={getServerity(deal.status)} className="mr-2" />
          <span className="text-500 test-sm">
            {new Date(deal.start_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>

        {showActions && (
          <div>
            {onView && (
              <Button 
               icon="pi pi-eye"
                className="p-button-text p-button-sm mr-2"
                onClick={() => onView(deal.id)}
                tooltip="View Details"
                />
            )}
            {onDelete && (
              <Button
                icon="pi pi-trash"
                className="p-button-text p-button-sm"
                onClick={() => onDelete(deal.id)}
                tooltip="Delete Deal"
              />
            )}
            </div>
        )}
      </div>
    </div>
  );
};


export default DealItem;
