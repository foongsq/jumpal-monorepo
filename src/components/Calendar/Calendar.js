import React from 'react';
import './Calendar.css';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withFirebase } from '../../Firebase/index';


class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate: new Date(),
      isDataLoaded: false
    };
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.saveAppointmentsToDatabase = this.saveAppointmentsToDatabase.bind(this);
    this.readData = this.readData.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }

  async readData() {
    console.log('called compdidmount')
    let appointments = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('appointments');
      let snapshot = await ref.once('value');
      let value = Object.values(snapshot.val());
      appointments.push(value);
      console.log(appointments)
      this.setState({
        data: Object.values(appointments[0][0]),
        isDataLoaded: true
      })
    }
  }

  async componentDidMount() {
    console.log('called compdidmount')
    let appointments = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('appointments');
      let snapshot = await ref.once('value');
      let value = Object.values(snapshot.val());
      appointments.push(value);
      console.log(appointments)
      this.setState({
        data: Object.values(appointments[0][0]),
        isDataLoaded: true
      })
    }
  }

  saveAppointmentsToDatabase() {
    console.log("data to save", this.state.data)
    //reseting the database first
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
      .child('appointments').child('appointmentArr')
      .set({});
    let data = this.state.data;
    //looping through this.state.data and adding apppointments into db
    data.map(appointment => {
      console.log('appt to save', appointment)
      if (appointment.rRule) {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
        .child('appointments').child('appointmentArr')
        .push({
          id: appointment.id,
          startDate: JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'),
          endDate: JSON.stringify(appointment.endDate).replace(/^"(.*)"$/, '$1'),
          title: appointment.title,
          rRule: appointment.rRule
        });
      } else {
        this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
        .child('appointments').child('appointmentArr')
        .push({
          id: appointment.id,
          startDate: JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'),
          endDate: JSON.stringify(appointment.endDate).replace(/^"(.*)"$/, '$1'),
          title: appointment.title
        });
      }
    });
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let data = this.state.data;
      if (added) {
        console.log('added', added)
        console.log('added data', data)
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => {
          console.log('appt.id', appointment.id)
          return (changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment);
        });
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;
    console.log('isDataLoaded',this.state.isDataLoaded)
    if (this.props.firebase.auth.currentUser && this.state.isDataLoaded) {
      return (
        <div>
          <div className="title-save-div">
          <h2>Calendar of Events</h2>
          <div className="buttons-div">
            <button onClick={this.saveAppointmentsToDatabase} className="save-button"><i className="fa fa-save"></i>Save</button>
            <button onClick={this.readData} className="refresh-button"><i className="fa fa-refresh"></i>Refresh appointments</button>
          </div>
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
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <IntegratedEditing />
              <WeekView
                startDayHour={9}
                endDayHour={19}
              />
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <ViewSwitcher />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip
                showCloseButton
                showOpenButton
                showDeleteButton
              />
              <AppointmentForm />
            </Scheduler>
          </Paper>
        </div>
      );
    } else if (this.props.firebase.auth.currentUser) {
      return (
        <div>
          <div className="title-save-div">
            <h2>Calendar of Events</h2>
            <button onClick={this.readData} className="refresh-button"><i className="fa fa-refresh"></i>Refresh appointments</button>
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
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <IntegratedEditing />
              <WeekView
                startDayHour={9}
                endDayHour={19}
              />
              <MonthView />
              <Toolbar />
              <DateNavigator />
              <ViewSwitcher />
              <ConfirmationDialog />
              <Appointments />
              <AppointmentTooltip
                showCloseButton
                showOpenButton
                showDeleteButton
              />
              <AppointmentForm />
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
