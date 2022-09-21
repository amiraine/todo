import styled from "styled-components";
// import { motion } from "framer-motion";

export const Container = styled.section<{ isOpen: boolean }>`
  height: ${({ isOpen }) => (isOpen ? "150px" : "0px")};
  background: rgba(255, 255, 255, 0.8);
  padding: 10px 24px 10px 32px;
`;

export const MarkerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
