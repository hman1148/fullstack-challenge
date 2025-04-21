import React from 'react';
import { Card } from 'primereact/card';
import { Deal, DealStatus } from '../../models';
import DealItem from './deal-item.component';

type DealStatusViewProps = {
  deals: Deal[];
  onViewDeal?: (id: number) => void;
  onDeleteDeal?: (id: number) => void;
};

const DealStatusView: React.FC<DealStatusViewProps> = ({ 
  deals, 
  onViewDeal, 
  onDeleteDeal 
}) => {
  // Group deals by status
  const statuses: Record<DealStatus, Deal[]> = {
    'draft': deals.filter(deal => deal.status === 'draft'),
    'active': deals.filter(deal => deal.status === 'active'),
    'expired': deals.filter(deal => deal.status === 'expired'),
    'cancelled': deals.filter(deal => deal.status === 'cancelled')
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid">
      {Object.entries(statuses).map(([status, statusDeals]) => (
        <div className="col-12 md:col-3" key={status}>
          <Card 
            title={status.charAt(0).toUpperCase() + status.slice(1)} 
            className="h-full"
            pt={{
              title: { className: 'text-center border-bottom-1 border-300 pb-2' }
            }}
          >
            <div className="text-center font-semibold pb-3 border-bottom-1 border-300 mb-3">
              {formatCurrency(statusDeals.reduce((sum, deal) => sum + deal.value, 0))}
            </div>
            
            {statusDeals.length > 0 ? (
              statusDeals.map(deal => (
                <DealItem 
                  key={deal.id} 
                  deal={deal} 
                  onView={onViewDeal}
                  onDelete={onDeleteDeal}
                />
              ))
            ) : (
              <div className="p-3 text-center text-500">
                No deals with this status
              </div>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default DealStatusView;