import React from 'react';
import './SkillCollapsible.css';
import { withFirebase } from '../../../Firebase';
import EditableText from './EditableText';

class SkillCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  async handleDelete() {
    let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-skills-list")
      .orderByChild('skillName').equalTo(this.props.skillName);
    let snapshot = await ref.once('value');
    let value = snapshot.val();
   
    this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-skills-list")
      .child(Object.keys(value)[0]).remove();
      window.alert("Skill deleted successfully! (Please refresh to see your updated list)")
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="note-and-trash-div">
          <button onClick={this.handleClick} className="note-button">
            {this.props.skillName}
          </button>
          <button onClick={this.handleDelete} className="trash-button">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
        {this.state.open 
          ? <div className="skill-content">
              <label>Skill Name:<EditableText id={this.props.id} type="skillName" content={this.props.skillName} /></label>
              <label>Description:<EditableText id={this.props.id} type="description" content={this.props.description} /></label>
              <label>Progress:<EditableText id={this.props.id} type="progress" content={this.props.progress} /></label>
              <p>{this.props.breakthrough === "on" 
                ? "Broke through!! :)" 
                : "Not broken through yet jiayous!" }</p>
              <p>{this.props.mastered === "on" 
                ? "Mastered!! :)" 
                : "Not mastered yet jiayous!" }</p>
            </div>
          : null}
      </div>
    )
  }
}

export default withFirebase(SkillCollapsible);