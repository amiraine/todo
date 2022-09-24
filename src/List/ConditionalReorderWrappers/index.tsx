import React from "react";
import { MotionStyle, Reorder } from "framer-motion";

type ReorderGroupProps = {
  useReorder: boolean;
  onReorder: (vals: string[]) => void;
  values: string[];
  layoutScroll?: boolean;
};

type ReorderItemProps = {
  useReorder: boolean;
  value: string;
  style?: MotionStyle;
};
export const ConditionalReorderGroup: React.FC<ReorderGroupProps> = ({
  children,
  useReorder,
  ...props
}) => {
  return useReorder ? (
    <Reorder.Group {...props} axis="y">
      {children}
    </Reorder.Group>
  ) : (
    <>{children}</>
  );
};

export const ConditionalReorderItem: React.FC<ReorderItemProps> = ({
  children,
  useReorder,
  ...props
}) => {
  return useReorder ? (
    <Reorder.Item
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    >
      {children}
    </Reorder.Item>
  ) : (
    <>{children}</>
  );
};
