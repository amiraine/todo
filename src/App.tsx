import React, { useState } from "react";
import { useEffect } from "react";
import { Book, Container, Page } from "./styled";
import { initialData } from "./initialdata";
// import { v4 } from "uuid";
const App = () => {
  const [listData, setListData] = useState<any>();

  useEffect(() => {
    setListData(initialData);
  }, []);

  return (
    <Container>
      <Book>
        <Page orientation="left"></Page>
        <Page orientation="right"></Page>
      </Book>
    </Container>
  );
};

export default App;
