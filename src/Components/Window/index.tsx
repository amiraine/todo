import React from "react";
import { Minus, X } from "react-feather";
import { Container, Content, TitleBar, TitleGroup, Text } from "./styled";

interface WindowProps {
  title: string;
  gridArea?: string;
  icon?: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  gridArea,
  icon,
}) => (
  <Container gridArea={gridArea}>
    <TitleBar>
      <TitleGroup>
        {icon && icon}
        <Text>{title}</Text>
      </TitleGroup>
      <TitleGroup>
        <button>
          <Minus />
        </button>
        <button>
          <X />
        </button>
      </TitleGroup>
    </TitleBar>
    <Content>{children}</Content>
  </Container>
);
