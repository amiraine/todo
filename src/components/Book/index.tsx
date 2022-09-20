import React from "react";
import { ListData } from "../../types";
import List from "../List";
import { BookContainer, Page, PageTitle } from "./styled";

interface BookProps {
  todoList: ListData;
}
const Book: React.FC<BookProps> = (props) => {
  const { todoList } = props;
  return (
    <BookContainer>
      <Page orientation="left">
        <PageTitle>To-do list</PageTitle>
        <List tasks={todoList} />
      </Page>
      <Page orientation="right">
        <PageTitle>Stats</PageTitle>
      </Page>
    </BookContainer>
  );
};

export default Book;
