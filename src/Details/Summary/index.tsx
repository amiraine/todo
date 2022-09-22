import React, { useEffect, useState } from "react";
import { Save, Slash } from "react-feather";
import { ListItem } from "../../types";
import {
  ButtonContainer,
  Container,
  IconButton,
  InfoLine,
  Input,
} from "./styled";

interface SummaryProps {
  listItem: ListItem;
  handleSaveTitle: (value: string) => void;
}
const Summary: React.FC<SummaryProps> = (props) => {
  const {
    listItem: { value: title, id },
    handleSaveTitle,
  } = props;

  const [localTitle, setLocalTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);

  // helpers

  const updateLocalTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocalTitle(value);
  };

  const handleToggleTitleEdit = (event: React.MouseEvent) => {
    if (!editingTitle) {
      const input = document.getElementById(id);
      if (!input) return;
      setEditingTitle(true);
      input.focus();
    } else {
      setEditingTitle(false);
    }
  };

  const handleCancelEdit = () => {
    setLocalTitle(title);
    setEditingTitle(false);
  };

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  // todo add tooltip component
  return (
    <Container>
      <InfoLine onDoubleClick={handleToggleTitleEdit}>
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
          title
        )}
      </InfoLine>
    </Container>
  );
};

export default Summary;
