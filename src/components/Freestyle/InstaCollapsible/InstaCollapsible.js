import React from 'react';
import './InstaCollapsible.css';
import { withFirebase } from '../../../Firebase';

class InstaCollapsible extends React.Component {
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
    console.log('this.state.url', this.props.url)
    let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls")
      .orderByChild('url').equalTo(this.props.url);
    let snapshot = await ref.once('value');
    let value = snapshot.val();
    console.log('Object.keys(value)[0]', Object.keys(value)[0])
    this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls")
      .child(Object.keys(value)[0]).remove();
      window.alert("Instagram post deleted successfully! (Please refresh to see your updated list)")
  }

  render() {
    return (
      <div className="insta-collapsible-container">
        <div className="note-and-trash-div">
          <button onClick={this.handleClick} className="note-button">
            {this.props.content}
          </button>
          <button onClick={this.handleDelete} className="trash-button">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
        {this.state.open ? 
        <a 
          target="_blank" 
          rel="noopener noreferrer" // added for security: https://mathiasbynens.github.io/rel-noopener/
          href={this.props.url} 
          className="insta-link"
        >
          <p>{this.props.url}</p>
        </a> 
        : null}
      </div>
    )
  }
}

export default withFirebase(InstaCollapsible);