import React from "react";
import { render, screen } from "@testing-library/react";

import { List } from "./List";
import MagazineContextProvider from "../contexts/MagazineContext";
// @ts-expect-error
const wrapper = (children: React.ReactNode, stateValue) => {
  return render(
    <MagazineContextProvider value={stateValue}>
      {children}
    </MagazineContextProvider>
  );
};

const stateValue = {
  state: {
    showSubScription: false,
  },
};
test("List Render", () => {
  // @ts-ignore
  wrapper(<List />, stateValue);
  const linkElement = screen.getByText(/No data to display/i);
  expect(linkElement).toBeInTheDocument();
});
