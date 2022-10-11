import React, { useReducer } from "react";
// import { initializeApp } from "firebase/app";
// import { ref } from "firebase/database";
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
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // const firebaseConfig = {
  //   apiKey: "AIzaSyClwCPIPkLcI5WopGNWI_s38XfvPbxg5PQ",
  //   authDomain: "todo-50827.firebaseapp.com",
  //   databaseURL: "https://todo-50827-default-rtdb.firebaseio.com",
  //   projectId: "todo-50827",
  //   storageBucket: "todo-50827.appspot.com",
  //   messagingSenderId: "268950198509",
  //   appId: "1:268950198509:web:de7d4dd926b1b481b554e4",
  //   measurementId: "G-5HJWRXMCL0",
  // };

  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  const [data, updateData] = useReducer(dayReducer, {
    ...initialData,
  });
  const [categories, updateCategories] = useReducer(categoriesReducer, [
    ...initialCategories,
  ]);
  const [filterSort, updateFilterSort] = useReducer(filterSortReducer, {
    ...initialFilters,
  });

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
