import React from 'react'; 
import './Freestyle.css';
import Instagram from './Instagram/Instagram';
import SkillList from './SkillList/SkillList';
import { withFirebase } from '../../Firebase/index';

class Freestyle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openInstagram: false,
      openSkillList: true,
    }
    this.toggleInstagram = this.toggleInstagram.bind(this);
    this.toggleSkillList = this.toggleSkillList.bind(this);
  }

  toggleInstagram() {
    if (this.state.openInstagram) {
      this.setState({ openInstagram: false });
    } else {
      this.setState({ 
        openInstagram: true,
        openSkillList: false 
      });
    }
  }

  toggleSkillList() {
    if (this.state.openSkillList) {
      this.setState({ openSkillList: false });
    } else {
      this.setState({ 
        openSkillList: true,
        openInstagram: false
       });
    }
  }

  render() {
    return (  
        <div className="freestyle-container">
          <h1>Freestyle</h1>
          <button className="button" onClick={this.toggleInstagram}>Instagram Inspiration</button>
          <button className="button" onClick={this.toggleSkillList}>Skill List</button>
          {this.state.openInstagram ? <Instagram /> : null }
          {this.state.openSkillList ? <SkillList /> : null }
        </div>
    );
  }
}

export default withFirebase(Freestyle);