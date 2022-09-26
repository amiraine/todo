import moment from "moment";
import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Container, StyledButton, ButtonWrapper, Title } from "./styled";

interface DayNavigatorProps {
  selectedDay: string;
  handleGoForward: () => void;
  handleGoBack: () => void;
}

const DayNavigator: React.FC<DayNavigatorProps> = (props) => {
  const { selectedDay } = props;
  const displayDate = moment(selectedDay).format("LL");
  return (
    <Container>
      <ButtonWrapper>
        <StyledButton>
          <ArrowLeft />
        </StyledButton>
      </ButtonWrapper>
      <Title>{displayDate}</Title>
      <ButtonWrapper>
        <StyledButton>
          <ArrowRight />
        </StyledButton>
      </ButtonWrapper>
    </Container>
  );
};

export default DayNavigator;
