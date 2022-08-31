import { describe, vi } from "vitest";
import { userEvent, fireEvent, render, screen } from "../utils/test-utils";
import { MessageForm } from "./MessageForm";

describe("MessageForm", () => {
  it("should render MessageForm and submit", async () => {
    const onSubmitMock = vi.fn();
    render(<MessageForm onSubmit={onSubmitMock} />);

    await userEvent.type(
      screen.getByPlaceholderText("Type your message"),
      "Yo bro!"
    );

    fireEvent.click(screen.getByText("Send"));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("Yo bro!");
  });
});
