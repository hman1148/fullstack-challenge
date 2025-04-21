import { useState } from "react"
import OrganizationSelector from "./organization/organization-selector.component";
import DealList from "./deal/deal.component";

const App = () => {
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">SponserCX Dashboard</h1>
          <p className="text-600">Manage your organization's sponserships and deals</p>
        </div>

        <div className="mt-3 md:mt-0">
          <OrganizationSelector 
            value={selectedOrgId}
            onChange={setSelectedOrgId}
            className="w-full md:w-20rem"
            />
        </div>
      </div>
      <DealList organizationId={selectedOrgId || undefined} />
    </div>
  )

}

export default App
