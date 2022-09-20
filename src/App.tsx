import React, { useReducer } from "react";

import { Container } from "./styled";
import { initialData } from "./initialdata";
import Book from "./Book";
import { listReducer, listContext } from "./Context";

const App = () => {
  const [todoList, updateTodoList] = useReducer(listReducer, {
    ...initialData,
  });

  return (
    <listContext.Provider value={{ todoList, updateTodoList }}>
      <Container>
        <Book />
      </Container>
    </listContext.Provider>
  );
};

export default App;
