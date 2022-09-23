// React
import React, { ReactElement } from "react";
// Styles
import styled from "styled-components";
// Animations
import { motion, AnimatePresence, Variants } from "framer-motion";
// Laag
import { useToggleLayer, LayerSide } from "react-laag";
// Polyfill
import ResizeObserver from "resize-observer-polyfill";

type Item = {
  label: string;
  value: string | number;
  action?: (value?: string | number) => void;
  icon?: ReactElement;
};

type MenuProps = {
  content?: JSX.Element;
  items?: Array<Item>;
  backgroundColor?: string;
  color?: string;
};

const Container = styled.span`
  user-select: none;
`;

type MenuContainerProps = {
  backgroundColor: string;
  color: string;
};

const MenuContainer = styled(motion.div)<MenuContainerProps>`
  z-index: 9999;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 5px;
  min-width: 115px;
  user-select: none;
`;

const ContextVariants: Variants = {
  initial: (layerSide: LayerSide) => ({
    opacity: 0,
    scale: 0.9,
    y: layerSide === "top" ? -8 : 8,
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.10)",
  }),
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
  },
  exit: (layerSide: LayerSide) => ({
    opacity: 0,
    scale: 0.9,
    y: layerSide === "top" ? -8 : 8,
  }),
};

const renderItems = (items: Array<Item>, close: () => void) => {
  return items.map((item) => (
    <MenuItem key={item.value} {...item} close={close} />
  ));
};

export const Menu: React.FC<MenuProps> = (props) => {
  const {
    backgroundColor = "#fff",
    color = "#232323",
    children,
    content,
    items,
  } = props;
  const [element, toggleLayerProps] = useToggleLayer(
    // determine how to render the layer
    ({ isOpen, close, layerProps }) => (
      <AnimatePresence>
        {isOpen && (
          <MenuContainer
            backgroundColor={backgroundColor}
            color={color}
            onContextMenu={(event) => {
              event.preventDefault();
              event.stopPropagation();
              return false;
            }}
            key="menu"
            initial="initial"
            exit="exit"
            animate="enter"
            variants={ContextVariants}
            {...layerProps}
          >
            {items
              ? renderItems(items, close)
              : React.cloneElement(content as React.ReactElement<any>, {
                  close,
                })}
          </MenuContainer>
        )}
      </AnimatePresence>
    ),
    {
      placement: {
        anchor: "RIGHT_BOTTOM",
        autoAdjust: true,
        triggerOffset: 8,
        scrollOffset: 16,
      },
      fixed: true,
      closeOnOutsideClick: true,
      closeOnDisappear: "partial",

      ResizeObserver: ResizeObserver,
    }
  );

  // react to events
  return (
    <Container onClick={toggleLayerProps.openFromMouseEvent}>
      {element}
      {children}
    </Container>
  );
};

interface MenuItemProps extends Item {
  close: () => void;
}

const MenuItemContainer = styled.div`
  padding: 10px;
  cursor: pointer;
  display: grid;
  gap: 8px;
  grid-template-areas: "a a";
  grid-auto-columns: min-content;
  align-items: center;
`;

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { label, value, action, icon, close } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (action) {
      action(value);
    }
    close();
  };
  return (
    <MenuItemContainer onClick={handleClick}>
      {icon && icon}
      <span>{label}</span>
    </MenuItemContainer>
  );
};
