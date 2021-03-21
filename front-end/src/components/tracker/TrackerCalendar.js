import React from "react";
import Calendar from "react-calendar";
import { useStyles } from "./styles/TrackerCalendarStyles";

const TrackerCalendar = ({ setCalendarDate, calendarDate }) => {
	const classes = useStyles();
	return (
		<div className={classes.calendarDiv}>
			<Calendar
				onChange={setCalendarDate}
				value={calendarDate}
				minDetail="year"
				calendarType="US"
				className={classes.calendar}
			/>
		</div>
	);
};

export default TrackerCalendar;
