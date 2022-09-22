import React from "react";

import { ListItem } from "../../types";
import { Container, Input } from "./styled";

interface NotesProps {
  listItem: ListItem;
}
const Notes: React.FC<NotesProps> = (props) => {
  const {
    listItem: { id, note = "" },
  } = props;

  // todo add tooltip component
  return (
    <Container>
      <Input id={`textarea-${id}`} defaultValue={note} />
    </Container>
  );
};

export default Notes;
