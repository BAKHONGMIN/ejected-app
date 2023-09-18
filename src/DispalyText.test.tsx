import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  waitFor
} from "@testing-library/react";
import DisplayText from "./DisplayText";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("Test DisplayText", () => {
  const userFullName = "John Tester";

  const getUserFullnameMock = (
    username: string
  ): [Promise<string>, jest.Mock<Promise<string>, [string]>] => {
    const promise = new Promise<string>((res) => {
      res(userFullName);
    });
    const getUserFullname = jest.fn(
      async (username: string): Promise<string> => {
        return promise;
      }
    );
    return [promise, getUserFullname];
  };

  it("renders without crashing", () => {
    const username = "testuser";
    const [promise, getUserFullname] = getUserFullnameMock(username);
    render(<DisplayText getUserFullname={getUserFullname} />);
    expect(screen.getByTestId("user-input")).toBeInTheDocument();
  });

  it("receives input text", () => {
    const username = "testuser";
    const [promise, getUserFullname] = getUserFullnameMock(username);
    render(<DisplayText getUserFullname={getUserFullname} />);
    const input = screen.getByTestId("user-input");
    fireEvent.change(input, {
      target: {
        value: username
      }
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(username);
  });

  it("show welcome message", async () => {
    const username = "testuser";
    const [promise, getUserFullname] = getUserFullnameMock(username);

    const msg = `Welcome to React testing, ${userFullName}`;
    render(<DisplayText getUserFullname={getUserFullname} />);
    const input = screen.getByTestId("user-input");
    const label = screen.getByTestId("final-msg");
    fireEvent.change(input, {
      target: {
        value: username
      }
    });
    const btn = screen.getByTestId("input-submit");
    fireEvent.click(btn);

    expect(label).toBeInTheDocument();
    await waitFor(() => expect(label.textContent).toBe(msg)); // label.textContent 사용
  });
});
