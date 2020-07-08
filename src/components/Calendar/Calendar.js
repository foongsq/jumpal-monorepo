import React from 'react';
import './Calendar.css';
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
import { withFirebase } from '../../Firebase/index';

const appointments = [
  { startDate: '2020-07-09T09:45', endDate: '2020-07-09T10:45', title: 'Meeting' },
  { startDate: '2020-07-08T12:00', endDate: '2020-07-08T13:30', title: 'Go to a gym' },
];

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate: new Date(),
      isDataLoaded: false
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.saveAppointmentsToDatabase= this.saveAppointmentsToDatabase.bind(this);
  }

  componentDidMount() {
    let appointments = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('appointments');
      ref.on('value', function(snapshot) {
        console.log('snapshot', snapshot)
        appointments.push(snapshot.val());
      });
    
      this.setState({
        appointments: appointments,
        isDataLoaded: true
      })
    }
  }

  saveAppointmentsToDatabase() {
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
    .child('appointments')
    .set({
      appointmentArr: this.state.data
    });
  }

  render() {
    const { data, currentDate } = this.state;
    console.log(this.props.firebase)
    if (this.props.firebase.auth.currentUser && this.state.isDataLoaded) {
      return (
        <div>
          <div className="title-save-div">
          <h2>Calendar of Events</h2>
            <button onClick={this.saveAppointmentsToDatabase} className="save-button"><i className="fa fa-save"></i>Save</button>
          </div>
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
    } else if (this.props.firebase.auth.currentUser) {
      return (
        <div>
          <div className="title-save-div">
          <h2>Calendar of Events</h2>
          </div>
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
    } else {
      return (
        <div><p style={{color: 'red'}}>Please wait for data to load...</p></div>
      )
    }
  }
}

export default withFirebase(Calendar);
