import React, { useReducer } from "react";
import { Window } from "./Components";
import { listReducer, listContext } from "./Context/ListDataContext";
import { initialData } from "./initialdata";
import Details from "./Details";
import List from "./List";
import Stats from "./Stats";

import { Container } from "./styled";

const App = () => {
  const [todoList, updateTodoList] = useReducer(listReducer, {
    ...initialData,
  });

  return (
    <listContext.Provider value={{ todoList, updateTodoList }}>
      <Container>
        <Window title="Task List" gridArea="a">
          <List />
        </Window>
        <Window title="Details">
          <Details />
        </Window>
        <Window title="Stats">
          <Stats />
        </Window>
      </Container>
    </listContext.Provider>
  );
};

export default App;
