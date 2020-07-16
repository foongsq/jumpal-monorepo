import React from 'react'; 
import './Freestyle.css';
import Collapsible from '../Collapsible/Collapsible';
import { withFirebase } from '../../Firebase/index';

class Freestyle extends React.Component {
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
  }

  handleURLChange(event) {
    this.setState({ url: event.target.value });
  }

  handleNoteChange(event) {
    this.setState({ note: event.target.value });
  }

  addInstaPost() { //saves url to database
    let url = this.state.url;
    let note = this.state.note;
    let ref = this.props.firebase.db.ref('users')
      .child(this.props.firebase.auth.currentUser.uid)
      .child("freestyle-saved-insta-urls");
    ref.push({
      url: url,
      note: note,
    })
    this.myFormRef.reset();
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
        <div className="freestyle-container">
          <h1>Freestyle</h1>
          <form ref={(el) => this.freestyleform = el} className="form">
            <label>Instagram URL:<input className="input" type="text" onChange={this.handleURLChange} placeholder="Enter Instagram URL here"/></label>
            <label>Note:<input className="input" type="text" onChange={this.handleNoteChange} placeholder="Enter note here"/></label>
            <div className="button-div">{this.props.firebase.auth.currentUser 
            ? <input type="submit" onSubmit={this.addInstaPost} className="button" />
            : <input type="submit" onSubmit={this.addInstaPost} disabled /> }</div>
          </form>
         
          {this.props.firebase.auth.currentUser 
            ? <button onClick={this.readDatafromDB} id="refresh-button" className="button">Refresh</button>
            : null }
          <div className="collapsible-div">
            {this.state.dataFromDB && this.state.dataFromDB.length !== 0 ? 
              data.map(object => {
                return (
                  <div>
                    <Collapsible content={object.note} url={object.url} />
                  </div>
                )})
            : <p>Nothing to display, you could start by adding some posts above.</p>}
          </div>
        </div>
    );
  }
}

export default withFirebase(Freestyle);