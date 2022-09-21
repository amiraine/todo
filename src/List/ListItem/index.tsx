import React from "react";
import {
  DragHandleContainer,
  IconButton,
  IconContainer,
  ListItemContent,
  StyledListItem,
  StyledTextInput,
  Text,
} from "./styled";
import { Checkbox } from "../../Components";
import { UpdateKey } from "..";
import { Drag } from "../../assets/Drag";
import { Trash, Save } from "react-feather";

interface ListItemProps {
  id: string;
  isDone: boolean;
  isEditable: boolean;
  isSelected: boolean;
  value: string;
  handleSelectItem: (id: string) => void;
  setEditable: (id: string) => void;
  handleDeleteItem: (id: string) => void;
  handleUpdateItem: (id: string, key: UpdateKey, value: any) => void;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    id,
    isDone,
    isEditable,
    isSelected,
    handleSelectItem,
    handleDeleteItem,
    handleUpdateItem,
    setEditable,
    value,
  } = props;

  // deselect todo item on outside click
  // useEffect(() => {
  //   window.addEventListener("click", () => {
  //     handleSelectItem("");
  //   });
  //   return () => {
  //     window.removeEventListener("click", () => {
  //       handleSelectItem("");
  //     });
  //   };
  // }, []);
  return (
    <StyledListItem
      selected={isSelected}
      onClick={() => handleSelectItem(id)}
      onDoubleClick={() => setEditable(id)}
    >
      <DragHandleContainer>
        <Drag />
      </DragHandleContainer>
      <ListItemContent>
        {isEditable ? (
          <StyledTextInput
            type="text"
            defaultValue={value}
            onChange={(e) => {
              console.log(e);
              handleUpdateItem(id, "value", e.target.value);
            }}
          />
        ) : (
          <Text isDone={isDone}>{value}</Text>
        )}
        <IconContainer isEditable={isEditable}>
          <IconButton>
            <Save />
          </IconButton>
          <IconButton onClick={() => handleDeleteItem(id)}>
            <Trash />
          </IconButton>
        </IconContainer>
      </ListItemContent>
      <Checkbox name={id} value={isDone} />
    </StyledListItem>
  );
};

export default ListItem;
