import moment from "moment";
import React from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Container, StyledButton, ButtonWrapper, Title } from "./styled";

interface DayNavigatorProps {
  selectedDay: string;
  disableNext: boolean;
  disablePrev: boolean;
  handleGoForward: () => void;
  handleGoBack: () => void;
}

const DayNavigator: React.FC<DayNavigatorProps> = (props) => {
  const {
    selectedDay,
    handleGoForward,
    disableNext,
    handleGoBack,
    disablePrev,
  } = props;

  const displayDate = moment(selectedDay).format("LL");

  return (
    <Container>
      <ButtonWrapper>
        {!disablePrev && (
          <StyledButton onClick={handleGoBack}>
            <ArrowLeft />
          </StyledButton>
        )}
      </ButtonWrapper>
      <Title>{displayDate}</Title>
      <ButtonWrapper>
        {!disableNext && (
          <StyledButton onClick={handleGoForward} disabled={disableNext}>
            <ArrowRight />
          </StyledButton>
        )}
      </ButtonWrapper>
    </Container>
  );
};

export default DayNavigator;
