import React from "react";
import { UpdateKey } from "..";
import RadioButton from "../../Components/Radio";
import { ListItem, Marker } from "../../types";
import { Container, MarkerContainer } from "./styled";
import { Heart, Moon, Star, Zap } from "react-feather";

// array of options
type MarkerOption = {
  value: Marker;
  icon: React.ReactElement;
};
const MARKER_OPTIONS: MarkerOption[] = [
  { value: Marker.star, icon: <Star /> },
  { value: Marker.moon, icon: <Moon /> },
  { value: Marker.heart, icon: <Heart /> },
  { value: Marker.zap, icon: <Zap /> },
];

interface SubMenuProps {
  isOpen: boolean;
  listItem: ListItem;
  handleUpdateItem: (id: string, key: UpdateKey, newValue: any) => void;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { isOpen, listItem, handleUpdateItem } = props;
  const { marker, id } = listItem;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateItem(id, "marker", event.target.value);
  };

  return (
    <Container isOpen={isOpen}>
      <MarkerContainer>
        {MARKER_OPTIONS.map((item) => {
          const { icon, value } = item;
          const isChecked = marker === value;
          return (
            <RadioButton
              key={value}
              name="marker"
              value={value}
              isChecked={isChecked}
              onChange={handleRadioChange}
            >
              {icon}
            </RadioButton>
          );
        })}
      </MarkerContainer>
    </Container>
  );
};

export default SubMenu;
