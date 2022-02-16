import React, { useEffect, useState, useContext } from 'react';
import './Instagram.css';
import InstaCollapsible from '../InstaCollapsible/InstaCollapsible';
import { FirebaseContext } from '../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { off, get } from 'firebase/database';
import { JumpalSpinner } from '../../CustomComponents/core';
import useAuth from '../../../Auth';
import { onValue, push } from 'firebase/database';

function Instagram() {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  const [url, setUrl] = useState(null);
  const [note, setNote] = useState(null);
  const [igData, setIgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const igsRef = firebase.igs;
  let igForm = null;

  useEffect(() => {
    onValue(igsRef, onInstagramDataChange);
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        const dataFromDB = [];
        get(igsRef).then((snapshot) => {
          const value = snapshot.val();
          if (value) {
            dataFromDB.push(value);
          }
          setIgData(dataFromDB);
          setLoading(false);
        })
            .catch((error) => {
              console.log(error);
            });
      } else {
        alert('Please sign in to continue');
        setLoading(false);
      }
    });
    return () => {
      off(igsRef);
      unsubscribe();
    };
  }, []);

  const onInstagramDataChange = (snapshot) => {
    const dataFromDB = [];
    dataFromDB.push(snapshot.val());
    setIgData(dataFromDB);
  };

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const addInstaPost = (event) => {
    event.preventDefault();
    push(igsRef, {
      url: url,
      note: note,
    });
    window.alert('Instagram post saved successfully!');
    igForm.reset();
  };

  const data = [];
  if (loading) {
    return <JumpalSpinner />;
  } else {
    if (igData && igData.length !== 0) {
      const dataValues = Object.values(igData[0]).reverse();
      const keys = Object.keys(igData[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        data[i] = [keys[i], dataValues[i]];
      }
    }
    return (
      <div className="instagram-container">
        <form ref={(el) => igForm = el} className="form">
          <label>Instagram URL:
            <input
              className="input"
              type="text"
              onChange={handleURLChange}
              placeholder="Enter Instagram URL here"
            />
          </label>
          <label>Note:
            <input
              className="input"
              type="text"
              onChange={handleNoteChange}
              placeholder="Enter note here"
            />
          </label>
          <div className="button-div">{user ?
            <input type="submit" onClick={addInstaPost} className="button" /> :
            <input type="submit" disabled /> }</div>
        </form>
        <div className="collapsible-div">
          {igData && igData.length !== 0 ?
              data.map((object, index) => {
                return (
                  <div key={index}>
                    <InstaCollapsible
                      id={object[0]}
                      content={object[1].note}
                      url={object[1].url}
                    />
                  </div>
                );
              }) :
            <p>
              Nothing to display, you could start by adding some posts above.
            </p>}
        </div>
      </div>
    );
  }
}

export default Instagram;
