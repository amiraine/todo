import React, { useReducer } from "react";
import { Window } from "./Components";
import {
  listReducer,
  listContext,
  categoriesReducer,
  categoriesContext,
} from "./Context";
import { initialCategories, initialData } from "./initialdata";
import Details from "./Details";
import List from "./List";
import Stats from "./Stats";

import { Container } from "./styled";

const App = () => {
  const [todoList, updateTodoList] = useReducer(listReducer, {
    ...initialData,
  });
  const [categories, updateCategories] = useReducer(categoriesReducer, [
    ...initialCategories,
  ]);

  return (
    <listContext.Provider value={{ todoList, updateTodoList }}>
      <categoriesContext.Provider value={{ categories, updateCategories }}>
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
      </categoriesContext.Provider>
    </listContext.Provider>
  );
};

export default App;
