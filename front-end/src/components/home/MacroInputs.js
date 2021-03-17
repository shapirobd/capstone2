import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Typography,
	TextField,
	FormControl,
	Grid,
	InputAdornment,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	selectOption: {
		margin: "5px",
	},
}));

const MacroInputs = ({ allMacros, handleChange, setFormData }) => {
	const classes = useStyles();

	return (
		<div style={{ float: "left", width: "50%" }}>
			<Typography>Macros</Typography>

			{allMacros.map((macro, idx) => {
				return (
					<Grid
						container
						cols={3}
						spacing={2}
						alignItems="flex-end"
						key={macro}
					>
						<Grid item cols={1} md={3}>
							<FormControl variant="outlined" fullWidth size="small">
								<Select
									name={`operator-${macro}`}
									size="small"
									label="Comparison"
									onChange={handleChange}
								>
									<option value={"<"} className={classes.selectOption}>
										Less than
									</option>
									<option value={">"} className={classes.selectOption}>
										Greater than
									</option>
								</Select>
							</FormControl>
						</Grid>
						<Grid item cols={2} md={6}>
							<TextField
								name={`amount-${macro}`}
								variant="outlined"
								size="small"
								label={macro}
								onChange={handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">g</InputAdornment>
									),
								}}
							/>
						</Grid>
						{/* <Grid item cols={1} md={3}>
							<Typography style={{ display: "inline" }}>grams</Typography>
						</Grid> */}
					</Grid>
				);
			})}
		</div>
	);
};

export default MacroInputs;
