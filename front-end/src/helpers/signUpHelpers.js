import Typography from "@material-ui/core/Typography";
import SignUpFormOne from "../components/user/SignUpFormOne";
import SignUpFormTwo from "../components/user/SignUpFormTwo";
import SignUpConfirmation from "../components/user/SignUpConfirmation";

export const getSteps = () => {
	return ["Enter basic info", "Enter personal stats", "Confirm data"];
};

export const getStepContent = (step, handleChange, handleSubmit, formData) => {
	switch (step) {
		case 0:
			return (
				<>
					<SignUpFormOne
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</>
			);
		case 1:
			return (
				<>
					<SignUpFormTwo
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</>
			);
		case 2:
			return (
				<>
					<SignUpConfirmation
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						formData={formData}
					/>
				</>
			);
		default:
			return "Unknown step";
	}
};
