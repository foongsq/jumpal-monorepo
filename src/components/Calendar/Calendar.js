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

const Appointment = ({
  children, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      backgroundColor: '#f5d247',
      borderRadius: '3px',
      margin: '0',
      wordWrap: 'normal'
    }}
  >
    {children}
  </Appointments.Appointment>
);

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
    this.readPublicData = this.readPublicData.bind(this);
  }

  async readData() {
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

  async readPublicData() {
    let appointments = [];
    let ref = this.props.firebase.db.ref('main-calendar').child('appointmentArr');
    let snapshot = await ref.once('value');
    let value = Object.values(snapshot.val());
    appointments.push(value);
    this.setState({
      data: Object.values(appointments[0]),
      isDataLoaded: true
    })
  }

  async componentDidMount() {
    console.log('called compdidmount')
    let appointments = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('appointments');
      let snapshot = await ref.once('value');
      if (snapshot.val() !== null) {
        let value = Object.values(snapshot.val());
        appointments.push(value);
        console.log(appointments)
        this.setState({
          data: Object.values(appointments[0][0]),
          isDataLoaded: true
        })
      } else {
        this.setState({
          isDataLoaded: true
        })
      }
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
    window.alert("Saved calendar events successfully!");
  }

  // //for saving to main calendar
  // saveAppointmentsToDatabase() {
  //   console.log("data to save", this.state.data)
  //   //reseting the database first
  //   this.props.firebase.db.ref('main-calendar')
  //     .child('appointmentArr')
  //     .set({});
  //   let data = this.state.data;
  //   //looping through this.state.data and adding apppointments into db
  //   data.map(appointment => {
  //     if (appointment.rRule) {
  //       this.props.firebase.db.ref('main-calendar')
  //       .child('appointmentArr')
  //       .push({
  //         id: appointment.id,
  //         startDate: JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'),
  //         endDate: JSON.stringify(appointment.endDate).replace(/^"(.*)"$/, '$1'),
  //         title: appointment.title,
  //         rRule: appointment.rRule
  //       });
  //     } else {
  //       this.props.firebase.db.ref('main-calendar')
  //       .child('appointmentArr')
  //       .push({
  //         id: appointment.id,
  //         startDate: JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'),
  //         endDate: JSON.stringify(appointment.endDate).replace(/^"(.*)"$/, '$1'),
  //         title: appointment.title
  //       });
  //     }
  //   });
  //   window.alert("Saved calendar events successfully!");
  // }

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
    console.log(this.state.data)
      return (
        <div>
          <div className="title-save-div">
          <h2>Calendar of Events</h2>
          <div className="buttons-div">
          {this.props.firebase.auth.currentUser && this.state.isDataLoaded 
            ? 
            <div className="buttons-div"><button onClick={this.saveAppointmentsToDatabase} className="save-button"><i className="fa fa-save"></i>Save</button>
            <button onClick={this.readData} className="button"><i className="fa fa-refresh"></i>Refresh appointments</button></div>
            : this.props.firebase.auth.currentUser
              ?  <button onClick={this.readData} className="button"><i className="fa fa-refresh"></i>Refresh appointments</button>
              :  <button onClick={this.readPublicData} className="button"><i className="fa fa-refresh"></i>Get public events</button>}
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
                defaultCurrentViewName="Month"
              />
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <IntegratedEditing />
              <WeekView
                startDayHour={9}
                endDayHour={19}
              />
              <MonthView name="Month"/>
              <Toolbar />
              <DateNavigator />
              <ViewSwitcher />
              <ConfirmationDialog />
              <Appointments 
                appointmentComponent={Appointment}
              />
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
  }
}

export default withFirebase(Calendar);
