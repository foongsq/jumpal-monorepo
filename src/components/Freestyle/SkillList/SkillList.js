// import React from 'react';
// import { withFirebase } from '../../../Firebase';
// import SkillCollapsible from '../SkillCollapsible/SkillCollapsible';
// import ReactLoading from 'react-loading';

// class SkillList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       skillName: '-',
//       progress: [['-', new Date().toString()]],
//       url: '-',
//       learnt: false,
//       dataFromDB: [],
//       isDataLoaded: false,
//     }
//     this.handleSkillNameChange = this.handleSkillNameChange.bind(this);
//     this.handleProgressChange = this.handleProgressChange.bind(this);
//     this.handleBreakthroughChange = this.handleBreakthroughChange.bind(this);
//     this.handleMasteredChange = this.handleMasteredChange.bind(this);
//     this.handleURLChange = this.handleURLChange.bind(this);
//     this.submitEntry = this.submitEntry.bind(this);
//     // this.readDatafromDB = this.readDatafromDB.bind(this);
//     this.onSkillListDataChange = this.onSkillListDataChange.bind(this);
    
//     this.authListener = this.props.firebase.auth.onAuthStateChanged(
//       (authUser) => {
//         if(authUser) {
//           this.ref = this.props.firebase.db.ref('users')
//           .child(this.props.firebase.auth.currentUser.uid)
//           .child("freestyle-skills-list");
//           this.ref.on('value', this.onSkillListDataChange)
//         }
//       })
//   }

//   onSkillListDataChange(snapshot) {
//     let dataFromDB = [];
//     dataFromDB.push(snapshot.val());
//     this.setState({ dataFromDB: dataFromDB });
//   }

//   handleSkillNameChange(event) {
//     this.setState({ skillName: event.target.value });
//   }

//   handleProgressChange(event) {
//     this.setState({ progress: [[event.target.value, new Date().toString()]] });
//   }

//   handleBreakthroughChange(event) {
//     this.setState({ breakthrough: event.target.value });
//   }

//   handleMasteredChange(event) {
//     this.setState({ mastered: event.target.value });
//   }

//   handleURLChange(event) {
//     this.setState({ url: event.target.value });
//   }

//   submitEntry(event) { //save entry to database
//     let ref = this.props.firebase.db.ref('users')
//       .child(this.props.firebase.auth.currentUser.uid)
//       .child("freestyle-skills-list");
//     ref.push({
//       skillName: this.state.skillName,
//       progress: this.state.progress,
//       url: this.state.url,
//       learnt: this.state.learnt,
//     });
//     window.alert("New skill saved successfully!")
//     this.freestyleform.reset();
//     event.preventDefault();
//   }

//   async componentDidMount() {
//     let dataFromDB = [];
//     if (this.props.firebase.auth.currentUser) {
//       let ref = this.props.firebase.db.ref('users')
//       .child(this.props.firebase.auth.currentUser.uid)
//       .child("freestyle-skills-list");
//       let snapshot = await ref.once("value");
//       let value = snapshot.val();
//       if (value) {
//         dataFromDB.push(value);
//       }
//       this.setState({ 
//         dataFromDB: dataFromDB,
//         isDataLoaded: true });
//     }
//   }

//   // async readDatafromDB() {
//   //   let dataFromDB = [];
//   //   let ref = this.props.firebase.db.ref('users')
//   //   .child(this.props.firebase.auth.currentUser.uid)
//   //   .child("freestyle-skills-list");
//   //   let snapshot = await ref.once("value");
//   //   let value = snapshot.val();
//   //   if (value) {
//   //     dataFromDB.push(value);
//   //   }
//   //   console.log(dataFromDB)
//   //   this.setState({ dataFromDB: dataFromDB });
//   // }

  
//   render() {
//     if (this.state.isDataLoaded) {
//       let dataValues = [];
//       let notLearntData = [];
//       let learntData = [];
//       if (this.state.dataFromDB && this.state.dataFromDB.length !== 0) {
//         dataValues = Object.values(this.state.dataFromDB[0]).reverse();
//         let keys = Object.keys(this.state.dataFromDB[0]).reverse();
//         console.log('keys', keys)
//         console.log('dataValues', dataValues)
//         for (let i = 0; i < dataValues.length; i++) {
//           if (dataValues[i].learnt) {
//             learntData[i] = [keys[i], dataValues[i]];
//           } else {
//             notLearntData[i] = [keys[i], dataValues[i]];
//           }
//         }
//       }
//       return (
//         <div>
//           <h1>Skill List</h1>
//           <form ref={(el) => this.freestyleform = el} className="form">
//             <label>Skill Name:<input className="input" onChange={this.handleSkillNameChange} type="text" placeholder="Enter freestyle skill name here"/></label>
//             <label>Progress: (as of {new Date().toDateString()})<input className="input" onChange={this.handleProgressChange} type="text" placeholder="Enter progress here"/></label>
//             <label>Instagram URL:<input className="input" type="text" onChange={this.handleURLChange} placeholder="Enter Instagram URL here"/></label>
//             <div className="button-div">
//               {this.props.firebase.auth.currentUser 
//                 ? <input type="submit" onClick={this.submitEntry} className="button" />
//                 : <input type="submit" disabled /> }
//             </div>
//           </form>
//           {/* {this.props.firebase.auth.currentUser 
//               ? <button onClick={this.readDatafromDB} id="refresh-button" className="button">Refresh</button>
//               : null } */}
          
//           {this.state.dataFromDB && this.state.dataFromDB.length !== 0 && this.props.firebase.auth.currentUser ? 
//                 <div>
//                   <h2>Skills I want to learn</h2>
//                   {notLearntData.length > 0 
//                     ? notLearntData.map(object => {
//                       return (
//                         <div>
//                           <SkillCollapsible 
//                             skillName={object[1].skillName}
//                             description={object[1].description} 
//                             progress={object[1].progress}
//                             url={object[1].url}
//                             id={object[0]}
//                             learnt={false}
//                           />
//                         </div>
//                     )})
//                     : <p style={{textAlign: 'center'}}>No skills to learn... Add some above !</p>}
//                   <h2>Skills I have learnt</h2>
//                   {learntData.length > 0 
//                   ? learntData.map(object => {
//                     console.log('obj[0]', object[1])
//                     return (
//                       <div>
//                         <SkillCollapsible 
//                           skillName={object[1].skillName}
//                           description={object[1].description} 
//                           progress={object[1].progress}
//                           url={object[1].url}
//                           id={object[0]}
//                           learnt={true}
//                         />
//                       </div>
//                     )})
//                     : <p style={{textAlign: 'center'}}>Haven't learnt any skills, jiayou!</p>}
//                 </div>
//               : <p>Nothing to display, you could start by adding some skills above.</p>}
//         </div>
//       );
//     } else {
//       return <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} />
//     }
//   }
// }

// export default withFirebase(SkillList);