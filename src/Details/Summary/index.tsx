import moment from "moment";
import React, { useEffect, useState } from "react";
import { Save, Slash } from "react-feather";
import { ListItem } from "../../types";
import {
  ButtonContainer,
  Container,
  IconButton,
  InfoLine,
  Input,
  Title,
} from "./styled";

interface SummaryProps {
  listItem: ListItem;
  handleSaveTitle: (value: string) => void;
}
const Summary: React.FC<SummaryProps> = (props) => {
  const {
    listItem: { value: title, id, created, due },
    handleSaveTitle,
  } = props;

  const [localTitle, setLocalTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [editingDate, setEditingDate] = useState<boolean>(false);
  // helpers

  const updateLocalTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocalTitle(value);
  };

  const handleToggleTitleEdit = () => {
    if (!editingTitle) {
      const input = document.getElementById(id);
      if (!input) return;
      setEditingTitle(true);
      console.log(editingTitle);
      input.focus();
    } else {
      console.log("what");
      setEditingTitle(false);
      setLocalTitle(title);
    }
  };

  const handleToggleDateEdit = () => {
    setEditingDate(!editingDate);
  };

  const handleCancelEdit = () => {
    setLocalTitle(title);
    setEditingTitle(false);
  };

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  const creationDate = `${moment(created).format("LL")} - ${moment(
    created
  ).fromNow()}`;
  const dueDate = due
    ? `${moment(created).format("LL")} - ${moment(due).fromNow()}`
    : "No due date set. Double-click to add one.";
  // todo add tooltip component
  console.log(editingTitle);
  return (
    <Container>
      <InfoLine onDoubleClick={handleToggleTitleEdit} label="Task">
        {editingTitle ? (
          <>
            <Input id={id} value={localTitle} onChange={updateLocalTitle} />
            <ButtonContainer>
              <IconButton onClick={() => handleSaveTitle(localTitle)}>
                <Save />
              </IconButton>
              <IconButton onClick={handleCancelEdit}>
                <Slash />
              </IconButton>
            </ButtonContainer>
          </>
        ) : (
          <Title>{title}</Title>
        )}
      </InfoLine>
      <InfoLine label="Created on">{creationDate}</InfoLine>
      <InfoLine onDoubleClick={handleToggleDateEdit} label="Due on">
        <Title>{dueDate}</Title>
      </InfoLine>
    </Container>
  );
};

export default Summary;
