import React, { useEffect, useState, useContext } from 'react';
import './Instagram.css';
import InstaCollapsible from '../InstaCollapsible/InstaCollapsible';
import { FirebaseContext } from '../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { off, get } from 'firebase/database';
import { JumpalSpinner } from '../../CustomComponents/core';
import useAuth from '../../../Auth';
import { onValue } from 'firebase/database';
import NewIgModal from './NewIgModal';

function Instagram() {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  const [igData, setIgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const igsRef = firebase.igs;

  useEffect(() => {
    onValue(igsRef, onInstagramDataChange);
    const unsubscribe = onAuthStateChanged(firebase.auth, async (user) => {
      if (user) {
        const dataFromDB = [];
        get(igsRef).then((snapshot) => {
          const value = snapshot.val();
          dataFromDB.push(value);
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

  const processData = (isIgDataPopulated) => {
    const data = [];
    if (isIgDataPopulated) {
      const dataValues = Object.values(igData[0]).reverse();
      const keys = Object.keys(igData[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        data[i] = [keys[i], dataValues[i]];
      }
    }
    return data;
  };


  if (loading || !igData) {
    return <JumpalSpinner />;
  } else {
    if (user) {
      const isIgDataPopulated = igData && igData.length !== 0 &&
        !(igData.length === 1 &&
        (igData[0] === null || igData[0] === undefined));
      const data = processData(isIgDataPopulated);
      return (
        <div className="instagram-container">
          <NewIgModal />
          <div className="collapsible-div">
            {isIgDataPopulated ?
                data.map((object) => {
                  return (
                    <InstaCollapsible
                      key={object[0]}
                      id={object[0]}
                      content={object[1].note}
                      url={object[1].url}
                    />
                  );
                }) :
              <p>
                Nothing to display, you could start by adding some posts above.
              </p>}
          </div>
        </div>
      );
    } else {
      return <JumpalSpinner />;
    }
  }
}

export default Instagram;
