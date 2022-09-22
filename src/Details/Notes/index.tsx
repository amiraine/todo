import React, { useState, useEffect } from "react";

import { ListItem } from "../../types";
import { Container, Input } from "./styled";

interface NotesProps {
  listItem: ListItem;
  handleUpdateNote: (value: string) => void;
}
const Notes: React.FC<NotesProps> = (props) => {
  const {
    listItem: { id, note = "" },
    // handleUpdateNote,
  } = props;

  // todo debug later
  // const [localValue, setLocalValue] = useState<string>("");

  // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { value } = event.target;
  //   setLocalValue(value);
  //   handleUpdateNote(value);
  // };
  // useEffect(() => {
  //   if (note) {
  //     setLocalValue(note);
  //   } else {
  //     setLocalValue("");
  //   }
  // }, [note, setLocalValue]);

  return (
    <Container>
      <Input id={`textarea-${id}`} note={note} />
    </Container>
  );
};

export default Notes;
