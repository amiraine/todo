import styled from "styled-components";
import { motion } from "framer-motion";

export const MenuItemContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  gap: 8px;
  font-size: 10px;

  &:hover {
    background: #debcfa;
    color: white;

    > div {
      border-color: white;
    }
  }
`;

type MenuContainerProps = {
  backgroundColor: string;
  color: string;
};

export const MenuContainer = styled(motion.div)<MenuContainerProps>`
  z-index: 9999;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 5px;
  min-width: 115px;
  user-select: none;
`;

export const Container = styled.span`
  user-select: none;
`;
