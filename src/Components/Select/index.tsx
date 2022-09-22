import React from "react";
import ReactSelect, { components } from "react-select";
import { ChevronDown } from "react-feather";
import {
  Container,
  Control,
  IndicatorSeparator,
  Menu,
  Placeholder,
  SingleValue,
} from "./styled";

const ControlComponent = (props) => {
  return <Control {...props} />;
};

const MenuComponent = (props) => {
  return <Menu {...props} />;
};

const SingleValueComponent = (props) => {
  return <SingleValue {...props} />;
};

const PlaceholderComponent = (props) => {
  return <Placeholder {...props} />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDown size="16px" />
    </components.DropdownIndicator>
  );
};

interface Option {
  value?: string;
  label: string;
}

interface CompositeOption extends Option {
  options?: Option[];
}

type SelectProps = {
  options: CompositeOption[];
  multi?: boolean;
  onChange: (event: { value: any; name: string }) => void;
  name: string;
  value?: string[] | string | any;
  placeholder?: string;
  isValid?: boolean;
  errorMessage?: string;
  margin?: string[] | number[];
};

export const Select: React.FC<SelectProps> = ({
  isValid = true,
  margin,
  multi,
  placeholder,
  value,
  options,
  onChange,
  name,
}) => {
  return (
    <Container margin={margin} isValid={isValid}>
      <ReactSelect
        isMulti={multi ? multi : false}
        placeholder={placeholder}
        value={value}
        options={options}
        components={{
          DropdownIndicator,
          IndicatorSeparator,
          Control: ControlComponent,
          Menu: MenuComponent,
          SingleValue: SingleValueComponent,
          Placeholder: PlaceholderComponent,
        }}
        onChange={(value) => {
          onChange({
            value,
            name: name,
          });
        }}
      />
    </Container>
  );
};
