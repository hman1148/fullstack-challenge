import React from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useOrganizations } from '../../stores';

type OrganizationSelectorProps = {
  value: number | null;
  onChange: (organizationId: number | null) => void;
  className?: string;
};

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const { organizations, loading } = useOrganizations();
  
  const organizationOptions = [
    { label: 'All Organizations', value: null },
    ...organizations.map(org => ({
      label: org.name,
      value: org.id
    }))
  ];

  return (
    <span className="p-float-label">
      <Dropdown
        id="organization"
        value={value}
        options={organizationOptions}
        onChange={(e) => onChange(e.value)}
        className={`${className}`}
        disabled={loading}
      />
      <label htmlFor="organization">Organization</label>
    </span>
  );
};

export default OrganizationSelector;