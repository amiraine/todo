import React, { useReducer } from "react";
import { listReducer, listContext } from "./Context";
import { initialData } from "./initialdata";

import Book from "./Book";
import { Container } from "./styled";

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
