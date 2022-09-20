import React from "react";
import { Book, Container, Page } from "./styled";
const App = () => {
  return (
    <Container>
      <Book>
        <Page orientation="left" />
        <Page orientation="right" />
      </Book>
    </Container>
  );
};

export default App;
