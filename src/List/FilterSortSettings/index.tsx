import React from "react";
import { Checkbox, Select } from "../../Components";
import { FilterWrapper, SortAndFilterSettings } from "./styled";

interface FilterSortSettingsProps {
  handleToggleCategorize: (val: boolean) => void;
  handleToggleFilterComplete: (val: boolean) => void;
}

const FilterSortSettings: React.FC<FilterSortSettingsProps> = (props) => {
  const { handleToggleCategorize, handleToggleFilterComplete } = props;
  return (
    <SortAndFilterSettings>
      <FilterWrapper>
        <Checkbox
          name="sortByCategory"
          onChange={handleToggleCategorize}
          label="Group by category"
        />
        <Checkbox
          name="hideComplete"
          onChange={handleToggleFilterComplete}
          label="Hide completed tasks"
        />
      </FilterWrapper>
      <FilterWrapper>
        <Select name="sort" options={[]} onChange={() => {}} />
      </FilterWrapper>
    </SortAndFilterSettings>
  );
};

export default FilterSortSettings;
