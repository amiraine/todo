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
  disableOverflow?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  gridArea,
  icon,
  disableOverflow = false,
}) => (
  <Container gridArea={gridArea} disableOverflow={disableOverflow}>
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
