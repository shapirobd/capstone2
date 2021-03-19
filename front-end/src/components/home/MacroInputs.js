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
	selectField: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	textField: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
	},
}));

const MacroInputs = ({ allMacros, handleChange, setFormData }) => {
	const classes = useStyles();

	return (
		<div style={{ width: "50%", justifyContent: "right" }}>
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
						<Grid item cols={1} md={6} style={{ paddingRight: 0 }}>
							<FormControl variant="outlined" fullWidth size="small">
								<Select
									name={`operator-${macro}`}
									size="small"
									label="Comparison"
									onChange={handleChange}
									className={classes.selectField}
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
						<Grid item cols={2} md={6} style={{ paddingLeft: 0 }}>
							<TextField
								name={`amount-${macro}`}
								variant="outlined"
								size="small"
								label={macro}
								onChange={handleChange}
								style={{ width: "100%" }}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">g</InputAdornment>
									),
									className: classes.textField,
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
