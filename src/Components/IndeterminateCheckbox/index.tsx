import React, { useEffect, useState } from "react";
import { Check, Minus } from "react-feather";
import { TaskState } from "../../types";

import { Container, PseudoCheckbox } from "./styled";

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

  const onClick = () => {
    const idx = checkboxState ? STATES.indexOf(checkboxState) : 0;
    const nextValue = STATES[idx + 1];
    if (!nextValue) {
      setCheckboxState(STATES[0]);
    } else {
      setCheckboxState(nextValue);
    }
    if (onChange) {
      onChange(nextValue);
    }
  };

  return (
    <Container>
      <PseudoCheckbox onClick={onClick} disabled={disabled}>
        {checkboxState === TaskState.Complete && <Check size={32} />}
        {checkboxState === TaskState["In Progress"] && <Minus />}
      </PseudoCheckbox>
    </Container>
  );
};
