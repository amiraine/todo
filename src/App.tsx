import React, { useState } from "react";
import { useEffect } from "react";
import { Container } from "./styled";
import { initialData } from "./initialdata";
import Book from "./components/Book";
import { BaseMap, ListItem } from "./types";
// import { v4 } from "uuid";
const App = () => {
  const [listData, setListData] = useState<BaseMap<ListItem>>({
    items: {},
    sort: [],
    selected: "",
  });

  useEffect(() => {
    setListData(initialData);
  }, []);

  // handlers

  return (
    <Container>
      <Book todoList={listData} />
    </Container>
  );
};

export default App;
