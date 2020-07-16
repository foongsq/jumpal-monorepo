import React from 'react';
import './Collapsible.css';
import InstagramEmbed from 'react-instagram-embed';
import { withFirebase } from '../../Firebase';

class Collapsible extends React.Component {
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
      <div>
        <div className="note-and-trash-div">
          <button onClick={this.handleClick} className="note-button">
            {this.props.content}
          </button>
          <button onClick={this.handleDelete} className="trash-button">
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
        {this.state.open ? <InstagramEmbed
          url={this.props.url}
          hideCaption={true}
          className="insta-post"
        /> : null}
      </div>
    )
  }
}

export default withFirebase(Collapsible);