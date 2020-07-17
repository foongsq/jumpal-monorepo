import React from 'react';
import './SkillCollapsible.css';
import { withFirebase } from '../../../Firebase';
import EditableText from './EditableText';
import InstagramEmbed from 'react-instagram-embed';
import Progress from '../SkillCollapsible/Progress/Progress';

class SkillCollapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openProgress: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleProgressClick = this.handleProgressClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  handleProgressClick() {
    if (this.state.openProgress) {
      this.setState({ openProgress: false });
    } else {
      this.setState({ openProgress: true });
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
              <button id="progress-button" onClick={this.handleProgressClick}><label>Progress:</label></button>
              {this.state.openProgress ? <Progress progress={this.props.progress} id={this.props.id} /> : null}
              <p>{this.props.breakthrough === "on" 
                ? "Broke through!! :)" 
                : "Not broken through yet jiayous!" } {this.props.mastered === "on" 
                ? "Mastered!! :)" 
                : "Not mastered yet jiayous!" }</p>
              {this.props.url === '-' 
                ? null 
                : <InstagramEmbed
                    url={this.props.url}
                    hideCaption={true}
                    className="insta-post"
                  /> }
            </div>
          : null}
      </div>
    )
  }
}

export default withFirebase(SkillCollapsible);