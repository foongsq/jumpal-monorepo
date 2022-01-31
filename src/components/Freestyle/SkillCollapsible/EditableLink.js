// import React from 'react';
// import './EditableLink.css';
// import { withFirebase } from '../../../Firebase';

// class EditableLink extends React.Component {
//   constructor(props) {
//     super(props);
//     this.ESCAPE_KEY = 27;
//     this.ENTER_KEY = 13;
//     this.state = {
//       editText: this.props.content,
//       editing: false
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleEditButtonClick = this.handleEditButtonClick.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
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
 
//   handleSubmit () {
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
//     console.log('e.which', e.which)
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
//     return (
//       <div className="editable-text-container">
//         <div className="content-div">
//           <div className="insta-link">
//             <a 
//               href={this.state.editText} 
//               target='_blank' 
//               rel="noopener noreferrer"  // added for security: https://mathiasbynens.github.io/rel-noopener/
//               className={this.state.editing ? 'hidden' : 'insta-link'}
//             >
//               {this.state.editText}
//             </a>
//           </div>
          
//           <input 
//             className={this.state.editing ? 'show-input' : 'hidden'} 
//             value={this.state.editText} 
//             onChange={this.handleChange} 
//             onBlur={this.handleSubmit}
//             onKeyDown={this.handleKeyDown}
//           />
//         </div>
//         <button className="edit-button" onClick={this.handleEditButtonClick}><i className="fa fa-pencil" aria-hidden="true"></i></button>
//       </div>      
//     );
//   }
// }

// export default withFirebase(EditableLink);