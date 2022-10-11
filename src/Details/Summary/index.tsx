import moment from "moment";
import React, { useEffect, useState } from "react";
import { Save, Slash } from "react-feather";
import { IndeterminateCheckbox } from "../../Components";
import { ListItem, TaskState } from "../../types";
import {
  ButtonContainer,
  Container,
  IconButton,
  InfoLine,
  Input,
  StatusText,
  Text,
  TitleContainer,
  TitleGroup,
} from "./styled";

interface SummaryProps {
  listItem: ListItem;
  handleSaveTitle: (value: string) => void;
  handleUpdateStatus: (state: TaskState) => void;
}
const Summary: React.FC<SummaryProps> = (props) => {
  const {
    listItem: {
      value: title,
      id,
      created,
      due,
      status = TaskState["Not Started"],
    },
    handleSaveTitle,
    handleUpdateStatus,
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
      input.focus();
    } else {
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
  return (
    <Container>
      <TitleContainer>
        <TitleGroup onDoubleClick={handleToggleTitleEdit}>
          <Input
            id={id}
            value={localTitle}
            onChange={updateLocalTitle}
            disabled={!editingTitle}
          />
          {editingTitle && (
            <ButtonContainer>
              <IconButton onClick={() => handleSaveTitle(localTitle)}>
                <Save />
              </IconButton>
              <IconButton onClick={handleCancelEdit}>
                <Slash />
              </IconButton>
            </ButtonContainer>
          )}
        </TitleGroup>
        <TitleGroup>
          <StatusText state={status}>
            {status}
            <IndeterminateCheckbox
              value={status}
              onChange={handleUpdateStatus}
            />
          </StatusText>
        </TitleGroup>
      </TitleContainer>
      <InfoLine label="Created on">
        <Text>{creationDate}</Text>
      </InfoLine>
      <InfoLine onDoubleClick={handleToggleDateEdit} label="Due on">
        <Text>{dueDate}</Text>
      </InfoLine>
    </Container>
  );
};

export default Summary;
