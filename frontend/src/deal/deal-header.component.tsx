import React from 'react';

type DealHeaderProps = {
  totalValue: number;
  probabilityValue: number;
};

const DealHeader: React.FC<DealHeaderProps> = ({ totalValue, probabilityValue }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="surface-card p-4 shadow-2 border-round mb-4">
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Deals</h1>
        <div className="bg-gray-100 p-3 border-round">
          <div className="flex flex-column md:flex-row gap-3">
            <div className="flex align-items-center">
              <span className="font-semibold mr-2">Net Value:</span>
              <span className="text-xl font-bold">{formatCurrency(totalValue)}</span>
            </div>
            <div className="flex align-items-center ml-0 md:ml-4">
              <span className="font-semibold mr-2">Probability Value:</span>
              <span className="text-xl font-bold">{formatCurrency(probabilityValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealHeader;