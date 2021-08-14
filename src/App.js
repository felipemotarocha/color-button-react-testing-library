import { useState } from "react";

import "./App.css";

export const replaceCamelCaseWithSpaces = (colorName) => {
	return colorName.replace(/\B([A-Z])\B/g, " $1");
};

function App() {
	const [buttonText, setButtonText] = useState("Change to blue");
	const [buttonBackgroundColor, setButtonBackgroundColor] = useState("MediumVioletRed");
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

	const handleButtonClick = () => {
		if (buttonBackgroundColor === "MediumVioletRed") {
			setButtonText("Change to red");
			return setButtonBackgroundColor("MidnightBlue");
		}

		setButtonText("Change to blue");
		return setButtonBackgroundColor("MediumVioletRed");
	};

	const handleCheckboxClick = () => {
		return setButtonIsDisabled((prevState) => !prevState);
	};

	return (
		<div className="App">
			<button
				style={{
					backgroundColor: buttonIsDisabled ? "gray" : buttonBackgroundColor,
				}}
				onClick={handleButtonClick}
				disabled={buttonIsDisabled}
			>
				{buttonText}
			</button>

			<input
				type="checkbox"
				id="disable-button-checkbox"
				defaultChecked={buttonIsDisabled}
				onClick={handleCheckboxClick}
			/>
			<label htmlFor="disable-button-checkbox">Disable button</label>
		</div>
	);
}

export default App;
