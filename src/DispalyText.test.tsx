import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DisplayText from "./DisplayText";
import "@testing-library/jest-dom/extend-expect";

describe("Test DisplayText", () => {
  it("renders without crashing", () => {
    render(<DisplayText />);
    expect(screen.getByTestId("user-input")).toBeInTheDocument();
  });

  it("receives input text", () => {
    const testuser = "testuser";
    render(<DisplayText />);
    const input = screen.getByTestId("user-input");
    fireEvent.change(input, {
      target: {
        value: testuser
      }
    });
    expect(input).toHaveValue(testuser);
  });

  it("show welcome message", () => {
    const testuser = "testuser";
    const msg = `Welcome to React testing,${testuser}`;
    render(<DisplayText />);
    const input = screen.getByTestId("user-input");
    fireEvent.change(input, {
      target: {
        value: testuser
      }
    });
    const btn = screen.getByTestId("input-submit");
    fireEvent.click(btn);
    const label = screen.getByTestId("final-msg");
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe(msg); // 텍스트 내용을 직접 비교
  });
});
