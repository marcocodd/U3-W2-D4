import {render, screen} from '@testing-library/react';
import App from "../App";
import arrayBooks from "../data/fantasy.json";

describe("General mounting compononents", () => {
 it("mounting Welcome component", () => {
  render(<App />);

  const alertWelcome = screen.getByRole("alert");
  expect(alertWelcome).toBeInTheDocument();
 });

 it("mounting cards number equal to the jasonBooks", async () => {
  render(<App />);
  await (() => {
   const bookCards = screen.queryAllByTestId("book-card");
   console.log("numero cards", bookCards.length);
   expect(bookCards.length).toEqual(arrayBooks.length);
  });
 });
});


