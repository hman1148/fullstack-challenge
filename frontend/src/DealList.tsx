import React, { useState } from "react";

import { Button } from 'primereact/button';

import { useDeals } from "../stores/";
import { DealStatus } from "../models";

type DealsListProps = {
    accountId?: number;
    organizationId?: number;
}

const DealList: React.FC<DealsListProps> = ({ accountId, organizationId }) => {

    const { deals, loading, error, totalDealValue, selectedDeal, deleteDeal, resetError} = useDeals(accountId);
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [statusFilter, setStatusFilter] = useState<DealStatus | null>(null); 

    if (loading && deals.length === 0) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <Button onClick={resetError}>Reset Error</Button>
            </div>
        );
    }


}

export default DealList;