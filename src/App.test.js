const { render, screen, fireEvent } = require("@testing-library/react");
import App, { replaceCamelCaseWithSpaces } from "./App";

test("initial conditions", () => {
	render(<App />);

	const buttonElement = screen.getByRole("button", { name: "Change to blue" });

	expect(buttonElement).toBeEnabled();

	const checkboxElement = screen.getByRole("checkbox");

	expect(checkboxElement).not.toBeChecked();
});

test("if checkbox is disabling the button", () => {
	render(<App />);

	const buttonElement = screen.getByRole("button", { name: "Change to blue" });
	const checkboxElement = screen.getByRole("checkbox", {
		name: "Disable button",
	});

	expect(buttonElement).toBeEnabled();
	expect(checkboxElement).not.toBeChecked();

	fireEvent.click(checkboxElement);

	expect(checkboxElement).toBeChecked();
	expect(buttonElement).toBeDisabled();
});

test("button has correct initial color", () => {
	render(<App />);

	const buttonElement = screen.getByRole("button", { name: "Change to blue" });

	expect(buttonElement).toHaveStyle({ backgroundColor: "red" });

	fireEvent.click(buttonElement);

	expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });
	expect(buttonElement.textContent).toBe("Change to red");
});

test("if button is graying out when disabled", () => {
	render(<App />);

	const checkboxElement = screen.getByRole("checkbox", {
		name: "Disable button",
	});

	fireEvent.click(checkboxElement);

	const buttonElement = screen.getByRole("button", { name: "Change to blue" });

	expect(buttonElement).toHaveStyle({ backgroundColor: "gray" });

	fireEvent.click(checkboxElement);

	expect(buttonElement).toHaveStyle({ backgroundColor: "red" });
});

test("if button is being disabled after one click", () => {
	render(<App />);

	const buttonElement = screen.getByRole("button", { name: "Change to blue" });

	fireEvent.click(buttonElement);

	expect(buttonElement).toHaveStyle({ backgroundColor: "blue" });

	const checkboxElement = screen.getByRole("checkbox", {
		name: "Disable button",
	});

	fireEvent.click(checkboxElement);

	expect(buttonElement).toHaveStyle({ backgroundColor: "gray" });
});

describe("spaces before camel-case capital letters", () => {
	test("if works for no inner capital letters", () => {
		expect(replaceCamelCaseWithSpaces("Red")).toBe("Red");
	});

	test("if works for one inner capital letter", () => {
		expect(replaceCamelCaseWithSpaces("MidnightBlue")).toBe("Midnight Blue");
	});

	test("if works for multiple inner capital letters", () => {
		expect(replaceCamelCaseWithSpaces("MediumVioletRed")).toBe(
			"Medium Violet Red"
		);
	});
});
