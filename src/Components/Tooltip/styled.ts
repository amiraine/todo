import styled from "styled-components";
import { motion } from "framer-motion";

export const TooltipBox = styled(motion.div)`
  background-color: #000;
  border: 1px solid #000;
  color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 5px;
  transform-origin: center center;
  z-index: 100000;
  line-height: 20px;
  max-width: 250px;
  position: relative;
`;
