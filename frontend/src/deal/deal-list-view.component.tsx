import React from 'react';
import { DataView } from 'primereact/dataview';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Deal, DealStatus } from '../../models';
import DealItem from './deal-item.component';

type DealListViewProps = {
  deals: Deal[];
  statusFilter: DealStatus | null;
  yearFilter: number | null;
  searchQuery: string;
  onStatusFilterChange: (status: DealStatus | null) => void;
  onYearFilterChange: (year: number | null) => void;
  onSearchQueryChange: (query: string) => void;
  onViewDeal?: (id: number) => void;
  onDeleteDeal?: (id: number) => void;
};

const DealListView: React.FC<DealListViewProps> = ({
  deals,
  statusFilter,
  yearFilter,
  searchQuery,
  onStatusFilterChange,
  onYearFilterChange,
  onSearchQueryChange,
  onViewDeal,
  onDeleteDeal
}) => {
  const statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Draft', value: 'draft' },
    { label: 'Active', value: 'active' },
    { label: 'Expired', value: 'expired' },
    { label: 'Cancelled', value: 'cancelled' }
  ];
  
  // Extract unique years from deals
  const uniqueYears = Array.from(
    new Set(
      deals.flatMap(deal => [
        new Date(deal.start_date).getFullYear(),
        new Date(deal.end_date).getFullYear()
      ])
    )
  ).sort();
  
  const yearOptions = [
    { label: 'All Years', value: null },
    ...uniqueYears.map(year => ({ label: year.toString(), value: year }))
  ];
  
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
      <h2 className="m-0">Deal List</h2>
      <div className="flex flex-column md:flex-row gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search"
          />
        </span>
        <Dropdown
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.value)}
          placeholder="Status"
        />
        <Dropdown
          options={yearOptions}
          value={yearFilter}
          onChange={(e) => onYearFilterChange(e.value)}
          placeholder="Year"
        />
        <Button
          icon="pi pi-filter-slash"
          tooltip="Clear Filters"
          className="p-button-outlined"
          onClick={() => {
            onStatusFilterChange(null);
            onYearFilterChange(null);
            onSearchQueryChange('');
          }}
        />
      </div>
    </div>
  );

  const itemTemplate = (deal: Deal) => (
    <div className="col-12">
      <DealItem 
        deal={deal}
        onView={onViewDeal}
        onDelete={onDeleteDeal}
      />
    </div>
  );

  return (
    <div className="card">
      <DataView
        value={deals}
        itemTemplate={itemTemplate}
        header={header}
        emptyMessage="No deals found"
        paginator
        rows={10}
        layout="list"
      />
    </div>
  );
};

export default DealListView;