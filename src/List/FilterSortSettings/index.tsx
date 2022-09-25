import React from "react";
import { Checkbox, Select } from "../../Components";
import { FilterWrapper, SortAndFilterSettings } from "./styled";

interface FilterSortSettingsProps {
  handleToggleCategorize: (val: boolean) => void;
}

const FilterSortSettings: React.FC<FilterSortSettingsProps> = (props) => {
  const { handleToggleCategorize } = props;
  return (
    <SortAndFilterSettings>
      <FilterWrapper>
        <Checkbox
          name="sortByCategory"
          onChange={handleToggleCategorize}
          label="Group by category"
        />
      </FilterWrapper>
      <FilterWrapper>
        <Select name="sort" options={[]} onChange={() => {}} />
      </FilterWrapper>
    </SortAndFilterSettings>
  );
};

export default FilterSortSettings;
