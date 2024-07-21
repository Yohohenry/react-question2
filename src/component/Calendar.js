import React, { useState } from "react";
import moment from "moment";
import "../style/Calendar.css";

const Calendar = () => {
	const startOfMonth = moment("2024-07-01");
	const endOfMonth = moment(startOfMonth).clone().endOf("month");
	const startOfCalendar = startOfMonth.clone().startOf("isoWeek");
	const endOfCalendar = endOfMonth.clone().endOf("isoWeek");
	const days = [];
	const date = startOfCalendar.clone();
	const currentDate = moment("2024-07-21");

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	while (date.isBefore(endOfCalendar)) {
		days.push(date.clone());
		date.add(1, "day");
	}

	const getDayClass = (day) => {
		console.log(
			"startOfCalendarstartOfCalendarstartOfCalendar",
			day.isSame(currentDate, "month")
		);

		if (!day.isSame(currentDate, "month")) return "non-current-month";
		if (
			day.isBetween(startDate, endDate, "day", "[]") ||
			day.isSame(startDate, "day") ||
			day.isSame(endDate, "day")
		)
			return "blue";

		if (day.isSame(currentDate, "day")) return "grey";

		return "";
	};

	const handleDayClick = (day) => {
		if (!startDate || (startDate && endDate)) {
			setStartDate(day);
			setEndDate(null);
		} else {
			if (day.isBefore(startDate, "day")) {
				setEndDate(startDate);
				setStartDate(day);
			} else if (day.isSame(startDate, "day")) {
				setEndDate(day);
			} else {
				setEndDate(day);
			}
		}
	};

	return (
		<div className="calendar">
			<div className="header">
				<button className="month-button" onClick={() => {}}>
					&lt;
				</button>
				<div className="month-title">
					{startOfMonth.format("YYYY年M月")}
				</div>
				<button className="month-button" onClick={() => {}}>
					&gt;
				</button>
			</div>
			<div className="grid">
				{days.map((day, index) => (
					<div
						className={`day ${getDayClass(day)}`}
						key={index}
						onClick={() => handleDayClick(day)}
					>
						{day.date()}日
					</div>
				))}
			</div>
		</div>
	);
};

export default Calendar;
