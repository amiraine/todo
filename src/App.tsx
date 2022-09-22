import React, { useReducer } from "react";
import { Info, CheckSquare, BookOpen } from "react-feather";
import {
  listReducer,
  listContext,
  categoriesReducer,
  categoriesContext,
} from "./Context";
import { initialCategories, initialData } from "./initialdata";
// local components
import { Window } from "./Components";
import Details from "./Details";
import List from "./List";
import Stats from "./Stats";
// styles
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
          <Window
            title="Task List"
            gridArea="a"
            icon={<CheckSquare size={20} />}
          >
            <List />
          </Window>
          <Window title="Details" gridArea="b" icon={<BookOpen size={20} />}>
            <Details />
          </Window>
          <Window title="Info" icon={<Info size={20} />}>
            <Stats />
          </Window>
        </Container>
      </categoriesContext.Provider>
    </listContext.Provider>
  );
};

export default App;
