import React from 'react'; 
import './Instagram.css';
import InstaCollapsible from '../InstaCollapsible/InstaCollapsible';
import { withFirebase } from '../../../Firebase/index';

class Instagram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      note: null,
      dataFromDB: [],
    }
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.addInstaPost = this.addInstaPost.bind(this);
    this.readDatafromDB = this.readDatafromDB.bind(this);
    this.onInstagramDataChange = this.onInstagramDataChange.bind(this);

    this.ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls");
    this.ref.on('value', this.onInstagramDataChange)
  }

  onInstagramDataChange(snapshot) {
    let dataFromDB = [];
    dataFromDB.push(snapshot.val());
    this.setState({ dataFromDB: dataFromDB });
  }

  handleURLChange(event) {
    this.setState({ url: event.target.value });
  }

  handleNoteChange(event) {
    this.setState({ note: event.target.value });
  }

  addInstaPost(event) { //saves url to database
    let url = this.state.url;
    let note = this.state.note;
    let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls");
    ref.push({
      url: url,
      note: note,
    })
    window.alert("Instagram post saved successfully!")
    this.freestyleform.reset();
    event.preventDefault();
  }

  async componentDidMount() {
    let dataFromDB = [];
    if (this.props.firebase.auth.currentUser) {
      let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls");
      let snapshot = await ref.once("value");
      let value = snapshot.val();
      if (value) {
        dataFromDB.push(value);
      }
      console.log(dataFromDB)
      this.setState({ dataFromDB: dataFromDB });
    }
  }

  async readDatafromDB() {
    let dataFromDB = [];
    let ref = this.props.firebase.db.ref('users')
    .child(this.props.firebase.auth.currentUser.uid)
    .child("freestyle-saved-insta-urls");
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
        <div className="instagram-container">
          <form ref={(el) => this.freestyleform = el} className="form">
            <label>Instagram URL:<input className="input" type="text" onChange={this.handleURLChange} placeholder="Enter Instagram URL here"/></label>
            <label>Note:<input className="input" type="text" onChange={this.handleNoteChange} placeholder="Enter note here"/></label>
            <div className="button-div">{this.props.firebase.auth.currentUser 
            ? <input type="submit" onClick={this.addInstaPost} className="button" />
            : <input type="submit" disabled /> }</div>
          </form>
         
          {this.props.firebase.auth.currentUser 
            ? <button onClick={this.readDatafromDB} id="refresh-button" className="button">Refresh</button>
            : null }
          <div className="collapsible-div">
            {this.state.dataFromDB && this.state.dataFromDB.length !== 0 ? 
              data.map(object => {
                return (
                  <div>
                    <InstaCollapsible content={object.note} url={object.url} />
                  </div>
                )})
            : <p>Nothing to display, you could start by adding some posts above.</p>}
          </div>
        </div>
    );
  }
}

export default withFirebase(Instagram);