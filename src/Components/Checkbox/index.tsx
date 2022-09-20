import React, { useEffect, useState } from "react";
import { Check } from "react-feather";

import { Container, Input, IndicatorContainer } from "./styled";

interface CheckboxProps {
  label?: string;
  name: string;
  value?: boolean;
  onChange?: (event: any) => void;
  disabled?: boolean;
}
export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { label, name, onChange, value, disabled = false } = props;

  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (value !== undefined) {
      setChecked(value);
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = event.target.checked;

    setChecked(newValue);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Container htmlFor={name} checked={checked} disabled={disabled}>
      <Input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        id={name}
      />
      <IndicatorContainer hasLabel={Boolean(label)}>
        {checked ? <Check size={19} /> : null}
      </IndicatorContainer>
      {label || null}
    </Container>
  );
};
