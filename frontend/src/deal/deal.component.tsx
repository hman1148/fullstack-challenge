import React, { useState, useEffect } from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';

import { useDeals } from "../../stores";
import { DealStatus } from "../../models";

import DealStageView from "./deal-stage-view.component";
import DealStatusView from "./deal-status-view.component";
import DealListView from "./deal-list-view.component";
import DealHeader from "./deal-header.component";

type DealsListProps = {
    accountId?: number;
    organizationId?: number;
}

const DealList: React.FC<DealsListProps> = ({ accountId, organizationId }) => {
    // Get data from store
    const { 
        deals, 
        loading, 
        error, 
        totalDealValue, 
        activeDealValue, 
        selectDeal, 
        deleteDeal, 
        resetError,
        fetchDealsByFilter,
    } = useDeals(accountId);
    
    // UI state
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [statusFilter, setStatusFilter] = useState<DealStatus | null>(null);
    const [yearFilter, setYearFilter] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredDeals, setFilteredDeals] = useState(deals);
    
    // Update filtered deals when filters change
    useEffect(() => {
        // Apply client-side filtering
        setFilteredDeals(deals.filter(deal => {
            // Status filter
            const matchesStatus = statusFilter ? deal.status === statusFilter : true;
            
            // Year filter
            const startYear = new Date(deal.start_date).getFullYear();
            const endYear = new Date(deal.end_date).getFullYear();
            const matchesYear = yearFilter ? (startYear === yearFilter || endYear === yearFilter) : true;
            
            // Search query
            const matchesSearch = searchQuery
                ? deal.id.toString().includes(searchQuery) ||
                  deal.account_id.toString().includes(searchQuery) ||
                  deal.status.includes(searchQuery.toLowerCase()) ||
                  deal.value.toString().includes(searchQuery)
                : true;
            
            return matchesStatus && matchesYear && matchesSearch;
        }));
    }, [deals, statusFilter, yearFilter, searchQuery]);
    
    // Apply filters on the server (use debounce in a real app)
    const applyFilters = () => {
        fetchDealsByFilter(organizationId, accountId, {
            status: statusFilter,
            year: yearFilter,
            search: searchQuery
        });
    };

    if (loading && deals.length === 0) {
        return (
            <div className="flex justify-content-center align-items-center p-5">
                <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem' }}></i>
                <span className="ml-2">Loading deals...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 border-round bg-red-100">
                <p className="text-red-700 m-0">{error}</p>
                <Button label="Dismiss" className="p-button-sm p-button-text" onClick={resetError} />
            </div>
        );
    }

    return (
        <div className="card">
            <DealHeader 
                totalValue={totalDealValue} 
                probabilityValue={activeDealValue} 
            />
            
            <div className="mb-3 flex justify-content-end">
                <Button 
                    label="Apply Filters" 
                    icon="pi pi-filter"
                    onClick={applyFilters}
                    className="p-button-outlined"
                />
            </div>
            
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="By Stage">
                    <DealStageView 
                        deals={filteredDeals} 
                        onViewDeal={selectDeal} 
                        onDeleteDeal={deleteDeal} 
                    />
                </TabPanel>
                <TabPanel header="By Status">
                    <DealStatusView 
                        deals={filteredDeals}
                        onViewDeal={selectDeal}
                        onDeleteDeal={deleteDeal}
                    />
                </TabPanel>
                <TabPanel header="List View">
                    <DealListView 
                        deals={filteredDeals}
                        statusFilter={statusFilter}
                        yearFilter={yearFilter}
                        searchQuery={searchQuery}
                        onStatusFilterChange={setStatusFilter}
                        onYearFilterChange={setYearFilter}
                        onSearchQueryChange={setSearchQuery}
                        onViewDeal={selectDeal}
                        onDeleteDeal={deleteDeal}
                    />
                </TabPanel>
            </TabView>
        </div>
    );
};

export default DealList;