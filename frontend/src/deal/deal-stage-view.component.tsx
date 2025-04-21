import React from "react";
import { Deal } from "../../models";
import { Panel } from 'primereact/panel';

import DealItem from "./deal-item.component";

type DealStageViewProps = {
    deals: Deal[];
    onViewDeal?: (id: number) => void;
    onDeleteDeal?: (id: number) => void;
}

const DealStageView: React.FC<DealStageViewProps> = ({ deals, onViewDeal, onDeleteDeal }) => {

    const stages = {
        'Build Proposal': deals.slice(0, Math.ceil(deals.length * 0.5)),
        'Pitch Proposal': deals.slice(Math.ceil(deals.length * 0.5), Math.ceil(deals.length * 0.75)),
        'Negotiation': deals.slice(Math.ceil(deals.length * 0.75))
      };

      const stageValues = Object.entries(stages).map(([name, stage]) => {
        const totalValue = stage.reduce((acc, deal) => acc + deal.value, 0);
        return { name, deals: stage, totalValue };
      });


      const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      }

      return (
        <div className="grid">
          {stageValues.map((stage) => (
            <div className="col-12 md:col-4" key={stage.name}>
              <Panel header={stage.name} className="h-full">
                <div className="text-center font-semibold pb-3 border-bottom-1 border-300 mb-3">
                  {formatCurrency(stage.totalValue)}
                </div>
                
                {stage.deals.length > 0 ? (
                  stage.deals.map(deal => (
                    <DealItem 
                      key={deal.id} 
                      deal={deal} 
                      onView={onViewDeal}
                      onDelete={onDeleteDeal}
                    />
                  ))
                ) : (
                  <div className="p-3 text-center text-500">
                    No deals in this stage
                  </div>
                )}
              </Panel>
            </div>
          ))}
        </div>
      );
}

export default DealStageView;