import React from 'react';
import { withFirebase } from '../../../../Firebase';
import './Progress.css';

class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.ESCAPE_KEY = 27;
    this.ENTER_KEY = 13;
    this.state = {
      editText: this.props.content,
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEditButtonClick() {
    if (this.state.editing) {
      this.handleSubmit();
    } else {
      this.setState({
        editing: true,
      });
    }
  }  
  
  handleChange (e) {
    this.setState({ editText: e.target.value });
  }
  
  async handleSubmit (e) {
    console.log('called handle submit', e.target)
    let val = this.state.editText;
    if (val) {
      let ref = this.props.firebase.db.ref('users')
        .child(this.props.firebase.auth.currentUser.uid)
        .child("freestyle-skills-list")
        .child(this.props.id)
      let snapshot = await ref.once('value');
      let value = snapshot.val();
      let newProgress = null;
      if (value) {
        newProgress = value.progress;
        newProgress.push([val, new Date().toString()]);
      }
      ref.update({
        progress: newProgress,
      });
		  this.setState({
        editing: false,
      });
	  } 
	}
  
  handleKeyDown (e) {
    if (e.which === this.ESCAPE_KEY) {
      this.setState({
          editText: this.props.name,
          editing: false
        });
    } else if (e.which === this.ENTER_KEY) {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <div className="progress-container">
        <button onClick={this.handleEditButtonClick} id="add-square"><i className="fa fa-plus-square" aria-hidden="true"></i></button>
        <div className="content-div">
          <div className={this.state.editing ? 'show' : 'hidden'}>
            <p className={this.state.editing ? 'show-p' : 'hidden'}>New Entry:</p>
            <input 
              className={this.state.editing ? 'show-input' : 'hidden'} 
              value={this.state.editText} 
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown}
            />
          </div>
          
        </div>
        {this.props.progress.reverse().map(progressEntry => {
          return (
            <div className="progress-entry-div">
              <p className='show-p'>{progressEntry[0]}</p>
              <div className="datetime-div">
                <p className='show-p'>{new Date(progressEntry[1]).toLocaleDateString()}</p>
                <p className='show-p'>{new Date(progressEntry[1]).toLocaleTimeString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withFirebase(Progress);