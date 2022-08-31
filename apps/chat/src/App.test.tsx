import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import App from "./App";
import { getUser, saveUser } from "./services/storage";
import { fireEvent, render, act, screen, userEvent } from "./utils/test-utils";

describe("App", () => {
  beforeAll(() => {
    vi.mock("./services/storage", () => ({
      getUser: vi.fn(),
      saveUser: vi.fn(),
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show user selection when user is not set", () => {
    render(<App />);

    expect(screen.getByText("Enter your name")).toBeInTheDocument();
    expect(screen.queryByText("Send")).not.toBeInTheDocument();
    expect(getUser).toHaveBeenCalledOnce();
  });

  it("should show chat when user is already set", async () => {
    getUser.mockReturnValueOnce({ id: "mark_b", name: "Mark B" });
    render(<App />);

    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.queryByText("Enter your name")).not.toBeInTheDocument();
  });

  it("should allow user to set new user", () => {
    render(<App />);

    expect(screen.getByText("Enter your name")).toBeInTheDocument();

    userEvent.type(screen.getByText("Enter your name"), "Mark");

    fireEvent.click(screen.getByText("Enter Chat"));

    expect(
      screen.getByPlaceholderText("Type your message")
    ).toBeInTheDocument();
  });

  it("should allow user to send messages to the chat", async () => {
    getUser.mockReturnValueOnce({ id: "mark_b", name: "Mark B" });
    render(<App />);

    expect(screen.getByText("Send")).toBeInTheDocument();
    expect(screen.queryByText("Enter your name")).not.toBeInTheDocument();
  });
});
