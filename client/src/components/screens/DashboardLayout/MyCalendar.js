import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import moment from "moment";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: { light: green[300], main: green[500], dark: green[700] },
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
          />
        </Paper>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default MyCalendar;