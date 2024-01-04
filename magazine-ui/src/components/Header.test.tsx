import { render, screen } from "@testing-library/react";

import { Header } from "./Header";
import MagazineContextProvider from "../contexts/MagazineContext";

test("Header Render", () => {
  render(
    <MagazineContextProvider>
      <Header />
    </MagazineContextProvider>
  );
  const linkElement = screen.getByText(/Magazine App/i);
  expect(linkElement).toBeInTheDocument();
});
