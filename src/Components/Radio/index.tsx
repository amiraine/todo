import React from "react";
import { ChildWrapper, Container, Input } from "./styled";

interface RadioButtonProps {
  isChecked?: boolean;
  children?: React.ReactElement;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<RadioButtonProps> = (props) => {
  const { name, children, isChecked, onChange, value } = props;

  return (
    <Container isChecked={isChecked}>
      <Input type="radio" name={name} onChange={onChange} value={value} />
      <ChildWrapper>{children}</ChildWrapper>
    </Container>
  );
};
