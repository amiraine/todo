import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  Variants,
  Transition,
  PanInfo,
} from "framer-motion";
import { Position } from "./types";
import { findIndex } from "./utils";
// Variants
const DragAndDropItemVariants: Variants = {
  drag: {
    zIndex: 99,
  },
  drop: {
    zIndex: 0,
  },
};

const defaultTransition: Transition = {
  type: "spring",
  damping: 15,
  stiffness: 200,
};

interface DragAndDropItemProps {
  dragVariants?: Variants;
  i: number;
  moveItem: (i: number, dragOffset: number) => void;
  dragEnd: (from: number, i: number, dragOffset: number) => void;
  positionTransition?: Transition;
  setPosition: (i: number, offset: Position) => void;
  isDisabled?: boolean;
}

export const DragAndDropItem: React.FC<DragAndDropItemProps> = (props) => {
  const {
    dragEnd,
    dragVariants,
    i,
    moveItem,
    setPosition,
    isDisabled = false,
  } = props;

  const [isDragging, setDragging] = useState(false);
  const [dragData, setDragData] = useState<any>(null);
  const [startingPosition, setStartingPosition] = useState<number>();

  // use ref to access the dom element motion.li that will wrap this component
  const ref = useRef<HTMLDivElement>(null);
  // manually create reference to DragOprigin to be able to manipulate it
  const dragOriginY = useMotionValue(0);
  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(
      i,
      // @ts-ignore
      { height: ref.current.offsetHeight, top: ref.current.offsetTop }
    );
  });

  // handler functions
  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (isDisabled) return;
    moveItem(i, info.point.y);
    setDragData({ event, info });
  };

  const handleDragStart = () => {
    if (isDisabled) return;
    setDragging(true);
    setStartingPosition(i);
  };

  const handleDragEnd = (info: PanInfo) => {
    if (isDisabled) return;
    setDragging(false);
    dragEnd(startingPosition || 0, i, info.point.y);
  };

  return (
    <motion.div
      ref={ref}
      initial="drop"
      variants={dragVariants || DragAndDropItemVariants}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? "drag" : "drop"}
      drag={isDisabled ? false : "y"}
      // dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={handleDragStart}
      onDragEnd={(_, info) => handleDragEnd(info)}
      onDrag={handleDrag}
      // positionTransition={({ delta }) => {
      //   if (isDragging) {
      //     dragOriginY.set(dragOriginY.get() + delta.y);
      //   }
      //   return props.positionTransition || defaultTransition;
      // }}
    >
      {React.cloneElement(props.children as React.ReactElement<any>, {
        dragData,
        isDragging,
      })}
    </motion.div>
  );
};
type DragAndDropProps = {
  Container?: React.FunctionComponent<any>;
  dragVariants?: Variants;
  onDrag?: (i: number, targetIndex: number) => void;
  onDragEnd?: (originalIdx: number, newIdx: number) => void;
  positionTransition?: Transition;
  isDisabled?: boolean;
};

export const DragAndDrop: React.FC<DragAndDropProps> = (props) => {
  const {
    children,
    Container,
    dragVariants,
    onDrag,
    onDragEnd,
    positionTransition,
    isDisabled = false,
  } = props;

  // Track children locally
  const [dragItems, setDragItems] = useState<ReactNode[]>([]);

  useEffect(() => setDragItems(React.Children.toArray(children)), [children]);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef<Position[]>([]).current;
  const setPosition = (i: number, offset: Position) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i: number, dragOffset: number) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) {
      const items = [...dragItems];
      items.splice(targetIndex, 0, items.splice(i, 1)[0]);
      setDragItems(items);
      if (typeof onDrag === "function") onDrag(i, targetIndex);
    }
  };

  const dragEnd = (from: number, i: number, dragOffset: number) => {
    const to = findIndex(i, dragOffset, positions);
    if (from !== to) {
      if (typeof onDragEnd === "function") onDragEnd(from, to);
    }
  };

  return (
    <ul style={{ height: "auto" }}>
      {React.Children.map(dragItems, (child, index) => {
        return Container ? (
          <Container>
            <DragAndDropItem
              moveItem={moveItem}
              dragEnd={dragEnd}
              setPosition={setPosition}
              i={index}
              positionTransition={positionTransition}
              dragVariants={dragVariants}
              isDisabled={isDisabled}
            >
              {child}
            </DragAndDropItem>
          </Container>
        ) : (
          <DragAndDropItem
            moveItem={moveItem}
            dragEnd={dragEnd}
            setPosition={setPosition}
            i={index}
            positionTransition={positionTransition}
            dragVariants={dragVariants}
            isDisabled={isDisabled}
          >
            {child}
          </DragAndDropItem>
        );
      })}
    </ul>
  );
};

export default DragAndDrop;
