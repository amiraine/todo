import React from "react";
import { Minus, X } from "react-feather";
import {
  Container,
  Content,
  TitleBar,
  TitleGroup,
  Text,
  StyledButton,
} from "./styled";

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
        <StyledButton>
          <Minus />
        </StyledButton>
        <StyledButton>
          <X />
        </StyledButton>
      </TitleGroup>
    </TitleBar>
    <Content>{children}</Content>
  </Container>
);
