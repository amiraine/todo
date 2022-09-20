import React from "react";
import List from "../List";
import { BookContainer, Page, PageTitle } from "./styled";

interface BookProps {}
const Book: React.FC<BookProps> = () => {
  return (
    <BookContainer>
      <Page orientation="left">
        <PageTitle>To-do list</PageTitle>
        <List />
      </Page>
      <Page orientation="right">
        <PageTitle>Stats</PageTitle>
      </Page>
    </BookContainer>
  );
};

export default Book;
