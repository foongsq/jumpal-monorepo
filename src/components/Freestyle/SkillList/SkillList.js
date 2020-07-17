import React from 'react';
import './SkillList.css';
import { withFirebase } from '../../../Firebase';
import SkillCollapsible from '../SkillCollapsible/SkillCollapsible';

class SkillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillName: null,
      description: null,
      progress: null,
      breakthrough: false,
      mastered: false,
      dataFromDB: [],
    }
    this.handleSkillNameChange = this.handleSkillNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleProgressChange = this.handleProgressChange.bind(this);
    this.handleBreakthroughChange = this.handleBreakthroughChange.bind(this);
    this.handleMasteredChange = this.handleMasteredChange.bind(this);
    this.submitEntry = this.submitEntry.bind(this);
    this.readDatafromDB = this.readDatafromDB.bind(this);
  }

  handleSkillNameChange(event) {
    this.setState({ skillName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleProgressChange(event) {
    this.setState({ progress: event.target.value });
  }

  handleBreakthroughChange(event) {
    this.setState({ breakthrough: event.target.value });
  }

  handleMasteredChange(event) {
    this.setState({ mastered: event.target.value });
  }

  submitEntry() { //save entry to database
    let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-skills-list");
    ref.push({
      skillName: this.state.skillName,
      description: this.state.description,
      progress: this.state.progress,
      breakthrough: this.state.breakthrough,
      mastered: this.state.mastered,
    });
    console.log('saved?')
    window.alert("New skill saved successfully!")
    // this.freestyleform.reset();
  }

  async readDatafromDB() {
    let dataFromDB = [];
    let ref = this.props.firebase.db.ref('users')
    .child(this.props.firebase.auth.currentUser.uid)
    .child("freestyle-skills-list");
    let snapshot = await ref.once("value");
    let value = snapshot.val();
    if (value) {
      dataFromDB.push(value);
    }
    console.log(dataFromDB)
    this.setState({ dataFromDB: dataFromDB });
  }

  render() {
    let data = [];
    if (this.state.dataFromDB && this.state.dataFromDB.length !== 0) {
      data = Object.values(this.state.dataFromDB[0]).reverse();
    }
    return (
      <div>
        <h1>Skill List</h1>
        <form ref={(el) => this.freestyleform = el} className="form">
          <label>Skill Name:<input className="input" onChange={this.handleSkillNameChange} type="text" placeholder="Enter freestyle skill name here"/></label>
          <label>Description:<input className="input" onChange={this.handleDescriptionChange} type="text" placeholder="Enter description here"/></label>
          <label>Progress: (as of {new Date().toDateString()})<input className="input" onChange={this.handleProgressChange} type="text" placeholder="Enter progress here"/></label>
          <label><input type="checkbox" onChange={this.handleBreakthroughChange}/>Breakthrough</label>
          <label><input type="checkbox" onChange={this.handleMasteredChange}/>Mastered</label>
          <div className="button-div">
            {this.props.firebase.auth.currentUser 
              ? <input type="submit" onClick={this.submitEntry} className="button" />
              : <input type="submit" disabled /> }
          </div>
        </form>
        {this.props.firebase.auth.currentUser 
            ? <button onClick={this.readDatafromDB} id="refresh-button" className="button">Refresh</button>
            : null }
        <h2>Skills I want to learn</h2>
        {this.state.dataFromDB && this.state.dataFromDB.length !== 0 ? 
              data.map(object => {
                return (
                  <div>
                    <SkillCollapsible 
                      skillName={object.skillName}
                      description={object.description} 
                      progress={object.progress}
                      breakthrough={object.breakthrough}
                      mastered={object.mastered}
                    />
                  </div>
                )})
            : <p>Nothing to display, you could start by adding some skills above.</p>}
      </div>
    );
  }
}

export default withFirebase(SkillList);