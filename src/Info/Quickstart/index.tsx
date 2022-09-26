import React from "react";
import { Container, Description, Header, List, Shortcut } from "./styled";

const Quickstart: React.FC = () => {
  return (
    <Container>
      <Header>Basics</Header>
      <Description>
        This is a todo app that allows tasks to be listed as "in progress", as
        well as allowing grouping by category. There are a few keyboard
        shortcuts enabled to allow quick navigation through list items using the
        keyboard. Details about the task such as its creation date, due date,
        and additional notes are included.
      </Description>
      <Header>Shortcuts</Header>

      <List>
        <Shortcut>
          Enter - Skip to next item or create new item at the end of the list
        </Shortcut>
        <Shortcut>Escape - deselect list item</Shortcut>
      </List>
    </Container>
  );
};

export default Quickstart;
