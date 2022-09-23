// React
import React from "react";
import { TooltipBox } from "./styled";
// Laag
import { Arrow, useHover, useLayer } from "react-laag";

type Props = {
  backgroundColor?: string;
  offset?: number;
  isDisabled?: boolean;
  persistentShow?: boolean;
  content?: JSX.Element;
};

export const Tooltip: React.FC<Props> = (props) => {
  const { children, isDisabled = false, persistentShow, content } = props;
  const [show, hoverProps] = useHover({ delayEnter: 300, delayLeave: 200 });

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: persistentShow || show,
  });

  return isDisabled ? (
    <>{children}</>
  ) : (
    <>
      <span {...triggerProps} {...hoverProps}>
        {children}
      </span>
      {persistentShow ||
        (show &&
          renderLayer(
            <TooltipBox {...layerProps}>
              {content}
              <Arrow {...arrowProps} />
            </TooltipBox>
          ))}
    </>
  );
};

export default Tooltip;
