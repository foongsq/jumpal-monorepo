// import React from 'react';
// import './SkillCollapsible.css';
// import { withFirebase } from '../../../Firebase';
// import EditableText from './EditableText';
// import EditableLink from './EditableLink';
// import Progress from '../SkillCollapsible/Progress/Progress';

// class SkillCollapsible extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ESCAPE_KEY = 27;
//     this.ENTER_KEY = 13;
//     this.state = {
//       open: false,
//       openProgress: false,
//       editText: null,
//       editing: false,
//     }
//     this.handleClick = this.handleClick.bind(this);
//     this.handleProgressClick = this.handleProgressClick.bind(this);
//     this.handleDelete = this.handleDelete.bind(this);
//     this.handleLearnt = this.handleLearnt.bind(this);
//     this.handleUnlearn = this.handleUnlearn.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleClick() {
//     if (this.state.open) {
//       this.setState({ open: false });
//     } else {
//       this.setState({ open: true });
//     }
//   }

//   handleProgressClick() {
//     if (this.state.openProgress) {
//       this.setState({ openProgress: false });
//     } else {
//       this.setState({ openProgress: true });
//     }
//   }

//   handleDelete() {
//     this.props.firebase.db.ref('users')
//       .child(this.props.firebase.auth.currentUser.uid)
//       .child("freestyle-skills-list")
//       .child(this.props.id).remove();
//       window.alert("Skill deleted successfully!")
//   }

//   handleLearnt() {
//     this.props.firebase.db.ref('users')
//     .child(this.props.firebase.auth.currentUser.uid)
//     .child("freestyle-skills-list")
//     .child(this.props.id).update({
//       learnt: true,
//     });
//     window.alert("Congratulations on learning a new skill!");
//   }

//   handleUnlearn() {
//     this.props.firebase.db.ref('users')
//     .child(this.props.firebase.auth.currentUser.uid)
//     .child("freestyle-skills-list")
//     .child(this.props.id).update({
//       learnt: false,
//     });
//     window.alert("Oops gonna have to relearn that!");
//   }

//   handleEditButtonClick() {
//     if (this.state.editing) {
//       this.handleSubmit();
//     } else {
//       this.setState({
//         editing: true,
//       });
//     }
//   }  
  
//   handleChange (e) {
//     this.setState({ editText: e.target.value });
//   }
  
//   async handleSubmit (e) {
//     console.log('called handle submit', e.target)
//     let val = this.state.editText;
//     if (val) {
//       let ref = this.props.firebase.db.ref('users')
//         .child(this.props.firebase.auth.currentUser.uid)
//         .child("freestyle-skills-list")
//         .child(this.props.id)
//       ref.update({
//         url: val,
//       });
// 		  this.setState({
//         editing: false,
//       });
// 	  } 
// 	}
  
//   handleKeyDown (e) {
//     if (e.which === this.ESCAPE_KEY) {
//       this.setState({
//           editText: this.props.name,
//           editing: false
//         });
//     } else if (e.which === this.ENTER_KEY) {
//       this.handleSubmit(e);
//     }
//   }

//   render() {
//     console.log(this.props)
//     return (
//       <div>
//         <div className="note-and-trash-div">
//           <button onClick={this.handleClick} className="note-button">
//             {this.props.skillName}
//           </button>
//           <button onClick={this.handleDelete} className="trash-button">
//             <i className="fa fa-trash-o" aria-hidden="true"></i>
//           </button>
//           {this.props.learnt 
//             ? <button onClick={this.handleUnlearn} className="learnt-button">Unlearn</button> 
//             : <button onClick={this.handleLearnt} className="learnt-button">Learnt</button>}
//         </div>
//         {this.state.open 
//           ? <div className="skill-content">
//               <label>Skill Name:<EditableText id={this.props.id} type="skillName" content={this.props.skillName} /></label>
//               <button id="progress-button" onClick={this.handleProgressClick}><label>Progress:</label></button>
//               {this.state.openProgress ? <Progress progress={this.props.progress} id={this.props.id} /> : null}
//               {this.props.url === '-' 
//                 ? <label>URL: <button onClick={this.handleEditButtonClick} id="add-square"><i className="fa fa-plus-square" aria-hidden="true"></i></button>
//                   <div className="content-div">
//                     <div className={this.state.editing ? 'show' : 'hidden'}>
//                       <p className={this.state.editing ? 'show-p' : 'hidden'}>New URL:</p>
//                       <input 
//                         className={this.state.editing ? 'show-input' : 'hidden'} 
//                         value={this.state.editText} 
//                         onChange={this.handleChange} 
//                         onKeyDown={this.handleKeyDown}
//                       />
//                     </div>
//                   </div>
//                   </label>
//                 : <label>URL: <EditableLink id={this.props.id} content={this.props.url} /></label> }
//             </div>
//           : null}
//       </div>
//     )
//   }
// }

// export default withFirebase(SkillCollapsible);