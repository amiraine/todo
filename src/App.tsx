import React, { useReducer } from "react";
import { Info as InfoIcon, CheckSquare, BookOpen } from "react-feather";
import {
  dayReducer,
  DayContext,
  categoriesReducer,
  categoriesContext,
  filterSortReducer,
  filterSortContext,
} from "./Context";

import { initialCategories, initialFilters, initialData } from "./initialdata";
// local components
import { Window } from "./Components";
import Details from "./Details";
import List from "./List";
import Info from "./Info";
// styles
import { Container } from "./styled";

const App = () => {
  const [data, updateData] = useReducer(dayReducer, {
    ...initialData,
  });
  const [categories, updateCategories] = useReducer(categoriesReducer, [
    ...initialCategories,
  ]);
  const [filterSort, updateFilterSort] = useReducer(filterSortReducer, {
    ...initialFilters,
  });
  console.log(data);
  return (
    <DayContext.Provider value={{ data, updateData }}>
      <categoriesContext.Provider value={{ categories, updateCategories }}>
        <filterSortContext.Provider value={{ filterSort, updateFilterSort }}>
          <Container>
            <Window
              title="Task List"
              gridArea="a"
              icon={<CheckSquare size={20} />}
            >
              <List />
            </Window>
            <Window
              title="Details"
              gridArea="b"
              icon={<BookOpen size={20} />}
              disableOverflow
            >
              <Details />
            </Window>
            <Window title="Info" icon={<InfoIcon size={20} />} disableOverflow>
              <Info />
            </Window>
          </Container>
        </filterSortContext.Provider>
      </categoriesContext.Provider>
    </DayContext.Provider>
  );
};

export default App;
