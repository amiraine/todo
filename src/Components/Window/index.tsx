import React from "react";
import { Minus, X } from "react-feather";
import { Container, Content, TitleBar, ButtonGroup, Text } from "./styled";

interface WindowProps {
  title: string;
  gridArea?: string;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  gridArea,
}) => (
  <Container gridArea={gridArea}>
    <TitleBar>
      <ButtonGroup>
        <Text>{title}</Text>
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
