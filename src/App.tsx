import React, { useReducer } from "react";
import { Window } from "./Components";
import { listReducer, listContext } from "./Context";
import { initialData } from "./initialdata";
import List from "./List";

import { Container } from "./styled";

const App = () => {
  const [todoList, updateTodoList] = useReducer(listReducer, {
    ...initialData,
  });

  return (
    <listContext.Provider value={{ todoList, updateTodoList }}>
      <Container>
        <Window>
          <List />
        </Window>
      </Container>
    </listContext.Provider>
  );
};

export default App;
