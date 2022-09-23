import React, { useEffect, useState } from "react";
import { Check, Minus } from "react-feather";
import { TaskState } from "../../types";
import { Item, Menu } from "../Menu";

import { Container, IconWrapper, PseudoCheckbox } from "./styled";

interface IndeterminateCheckboxProps {
  value: TaskState;
  onChange?: (event: any) => void;
  disabled?: boolean;
}

const STATES = Object.values(TaskState);
export const IndeterminateCheckbox: React.FC<IndeterminateCheckboxProps> = (
  props
) => {
  const { onChange, value, disabled = false } = props;

  const [checkboxState, setCheckboxState] = useState<TaskState>();

  useEffect(() => {
    if (value !== undefined) {
      setCheckboxState(value);
    }
  }, [value]);

  const items: Item[] = STATES.map((state) => {
    const icon = (
      <IconWrapper>
        {state === TaskState.Complete && <Check />}
        {state === TaskState["In Progress"] && <Minus />}
      </IconWrapper>
    );
    return {
      label: state,
      value: state,
      action: () => {
        setCheckboxState(state);
        if (onChange) {
          onChange(state);
        }
      },
      icon,
    };
  });

  return (
    <Container>
      <Menu
        backgroundColor="#fff"
        items={items}
        color="#1e1e1e"
        placement="TOP_CENTER"
        arrow
      >
        <PseudoCheckbox disabled={disabled}>
          {checkboxState === TaskState.Complete && <Check />}
          {checkboxState === TaskState["In Progress"] && <Minus />}
        </PseudoCheckbox>
      </Menu>
    </Container>
  );
};
