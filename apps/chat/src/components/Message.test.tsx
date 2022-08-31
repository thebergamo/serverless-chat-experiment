import { describe, it } from "vitest";
import { render, screen } from "../utils/test-utils";
import { Message } from "./Message";

describe("Message", () => {
  it("should render chat message when sent by current user", () => {
    const message = {
      id: "id",
      sendAt: new Date(),
      user: { id: "uid", name: "Mark" },
      message: "Yo BRo!",
    };
    const { container } = render(<Message message={message} isSender />);

    expect(screen.getByText("Yo BRo!")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("justify-start");
  });

  it("should render chat message when sent by other user", () => {
    const message = {
      id: "id",
      sendAt: new Date(),
      user: { id: "uid", name: "Mark" },
      message: "Yo BRo!",
    };
    const { container } = render(<Message message={message} />);

    expect(screen.getByText("Yo BRo!")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("justify-end");
  });
});
