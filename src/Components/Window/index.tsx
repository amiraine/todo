import React from "react";
import { Minus, X } from "react-feather";
import { Container, Content, TitleBar, ButtonGroup, Text } from "./styled";

interface WindowProps {
  gridArea?: string;
}

export const Window: React.FC<WindowProps> = ({ children }) => (
  <Container>
    <TitleBar>
      <ButtonGroup>
        <Text>Task List</Text>
      </ButtonGroup>
      <ButtonGroup>
        <button>
          <Minus />
        </button>
        <button>
          <X />
        </button>
      </ButtonGroup>
    </TitleBar>
    <Content>{children}</Content>
  </Container>
);
