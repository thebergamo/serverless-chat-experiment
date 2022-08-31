import { describe, vi } from "vitest";
import { userEvent, fireEvent, render, screen } from "../utils/test-utils";
import { UserForm } from "./UserForm";

describe("UserForm", () => {
  it("should render UserForm and submit", async () => {
    const onSubmitMock = vi.fn();
    render(<UserForm onSubmit={onSubmitMock} />);

    await userEvent.type(screen.getByPlaceholderText("Your name"), "mark");

    fireEvent.click(screen.getByText("Enter Chat"));

    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith("mark");
  });
});
