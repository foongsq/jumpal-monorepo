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

const hardcoded = [
  { id: 0, startDate: '2020-07-08T09:45', endDate: '2020-07-08T11:00', title: 'Meeting' },
  { id: 1, startDate: '2020-07-09T12:00', endDate: '2020-07-09T13:30', title: 'Go to a gym' },
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
    this.saveAppointmentsToDatabase = this.saveAppointmentsToDatabase.bind(this);
    this.readData = this.readData.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
  }

  /*when the home page loads, nothing in calendar, users click refresh and readData() 
  is called. 2 cases: database contains stuff, database contains nothing if database 
  contains stuff, 2 cases, snapshot may contain stuff or snapshot contain nothing 
  (havent loaded, need to refresh). when database contains nothing, only 1 case, snapshot 
  contain nothing. Problem is: given an empty snapshot, how do i tell whether it is due 
  to empty database or unfinished loading? Try console logging how snapshot looks like 
  with empty database vs unfinished loading.
  
  so to do this, we need to console log snapshot and snapshot.val when database empty and
  when data base not empty. 
  When database is empty,
    snapshot: DataSnapshot {node_: ChildrenNode, ref_: Reference, index_: PriorityIndex}
    snapshot.val(): null
  When database is not empty, 
    snapshot: {node_: ChildrenNode, ref_: Reference, index_: PriorityIndex}
    snapshot.val(): {appointmentArr: ...}
  Conclusion, snapshot always loads correctly in the first place, its just whether it has 
  pushed into appointments
  i was thinking right, if it is not loaded, we just keep looping the readdata until is 
  it loaded, but so the users only have to click refresh once, so after they click it 
  once, if theres nothing, means that database is empty.
  */
  readData() {
    let appointments = [];
    let snapshotIsEmpty = false;
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.user(this.props.firebase.auth.currentUser.uid).child('appointments');
      ref.on('value', function(snapshot) {
        console.log('snapshot', snapshot)
        console.log('snapshot.val()', snapshot.val())
        if (snapshot.val()) { //if snapshot is not empty
          snapshotIsEmpty = true;  //snapshot is not empty
          appointments.push(Object.values(snapshot.val()));
        }          
      });

      if (!snapshotIsEmpty) { //if snapshot is empty, finish loading
        console.log('snapshot is empty', snapshotIsEmpty) //loads before snapshot loads
        this.setState({
          isDataLoaded: true
        })
      } else if (appointments[0] && (appointments !== [])) { //if snapshot is not empty
        console.log('snapshot is not empty')
        this.setState({
          data: Object.values(appointments[0][0]),
          isDataLoaded: true
        })
      }
    }
  }

  /*Wait why cant i save to database though? Whenever i refresh then create an event
  right, then when i click save (like the one in appointment form) they will tell me 
  cannot access length of undefined. oh because this.state.data is undefined. Because i 
  prematurely concluded that isDataLoaded is true. Oh this means that the code is going 
  into the setstate data and isdataloaded block instead of only the setstate isdataloaded 
  block. Thats why it is setting it to appointments[0] which is undefined instead of leaving
  it as the default []*/
  saveAppointmentsToDatabase() {
    console.log("data to save", this.state.data)
    //reseting the database first
    this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
      .child('appointments').child('appointmentArr')
      .set({});
    let data = this.state.data;
    //looping through this.state.data and adding apppointments into db
    data.map(appointment => {
      console.log("saving appt.startdate",  JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'))
      this.props.firebase.user(this.props.firebase.auth.currentUser.uid)
      .child('appointments').child('appointmentArr')
      .push({
        id: appointment.id,
        startDate: JSON.stringify(appointment.startDate).replace(/^"(.*)"$/, '$1'),
        endDate: JSON.stringify(appointment.endDate).replace(/^"(.*)"$/, '$1'),
        title: appointment.title
      });
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
