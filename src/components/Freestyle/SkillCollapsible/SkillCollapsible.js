import React from 'react';
import './SkillCollapsible.css';
import { withFirebase } from '../../../Firebase';

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
      .orderByChild('url').equalTo(this.props.url);
    let snapshot = await ref.once('value');
    let value = snapshot.val();
   
    this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-skills-list")
      .child(Object.keys(value)[0]).remove();
      window.alert("Skill deleted successfully! (Please refresh to see your updated list)")
  }

  render() {
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
              <label>Skill Name:<p>{this.props.skillName}</p></label>
              <label>Description:<p>{this.props.description}</p></label>
              <label>Progress:<p>{this.props.progress}</p></label>
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