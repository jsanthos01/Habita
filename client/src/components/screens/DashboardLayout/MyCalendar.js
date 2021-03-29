import React, { useState } from "react";
import { Paper, IconButton } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import moment from "moment";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const theme = createMuiTheme({
  palette: {
    primary: { light: "rgba(0,184,255, 0.15)", main: "rgba(0,184,255, 0.3)", dark: "rgba(0,184,255, 0.5)" },
  },
});

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const today = moment(selectedDate);

  var weeknumber = today.week();
  var year = today.year();
  var month = today.format("MMM");

  const fromDate = today.startOf("week").date();
  const toDate = today.endOf("week").date();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // const renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth, props) => {
  //   const classes = useStyles()

  //   let dateClone = date.clone();
  //   let selectedDateClone = selectedDate.clone();

  //   const start = selectedDateClone.startOf("week").toDate();
  //   const end = selectedDateClone.endOf("week").toDate();

  //   const dayIsBetween = dateClone.isBetween(start, end, null, []);
  //   const isFirstDay = dateClone.isSame(start, "day");
  //   const isLastDay = dateClone.isSame(end, "day");

  //   const wrapperClassName = clsx({
  //     [classes.highlight]: dayIsBetween,
  //     [classes.firstHighlight]: isFirstDay,
  //     [classes.endHighlight]: isLastDay
  //   });

  //   const dayClassName = clsx(classes.day, {
  //     [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
  //     [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween
  //   });

  //   return (
  //     <div>
  //       <div className={wrapperClassName}>
  //         <IconButton className={dayClassName}>
  //           <span>{dateClone.format("DD")}</span>
  //         </IconButton>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <Paper style={{ overflow: "hidden" }}>
          <Calendar
            fullWidth 
            label="Week picker"
            value={selectedDate}
            date={selectedDate}
            onChange={handleDateChange}
            // renderDay={renderWrappedWeekDay}
          />
        </Paper>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default MyCalendar;