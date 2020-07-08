import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [
  { startDate: '2020-07-01T09:45', endDate: '2020-07-01T09:45', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: new Date(),
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
  }

  render() {
    const { data, currentDate } = this.state;
    return (
      <div>
        <h2>Calendar of Events</h2>
        <Paper>
          <Scheduler
            data={data}
            height={660}
          >
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <WeekView
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <Appointments />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}