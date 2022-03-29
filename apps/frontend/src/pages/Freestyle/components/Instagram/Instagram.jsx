import React, { useEffect, useState, useContext } from 'react';
import './Instagram.css';
import InstaCollapsible from './InstaCollapsible';
import { FirebaseContext } from '../../../../Firebase/index';
import { onAuthStateChanged } from 'firebase/auth';
import { off, get } from 'firebase/database';
import { onValue } from 'firebase/database';
import
JumpalAlertFeedback,
{ alertSeverity }
  from '../../../../components/JumpalAlertFeedback';
import NewIgModal from './NewIgModal';
import JumpalSpinnerWrapper from '../../../../components/JumpalSpinnerWrapper';

function Instagram() {
  const firebase = useContext(FirebaseContext);
  const [igData, setIgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
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
              console.error(error);
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

  const onAction = (msg) => {
    setSuccess(msg);
  };

  const onInstagramDataChange = (snapshot) => {
    const dataFromDB = [];
    dataFromDB.push(snapshot.val());
    setIgData(dataFromDB);
  };

  const processData = () => {
    const data = [];
    const dataValues = Object.values(igData[0]).reverse();
    const keys = Object.keys(igData[0]).reverse();
    for (let i = 0; i < dataValues.length; i++) {
      data[i] = [keys[i], dataValues[i]];
    }
    return data;
  };

  return (
    <JumpalSpinnerWrapper loading={loading || !igData}>
      <div className="instagram-container">
        <JumpalAlertFeedback
          msg={success}
          severity={alertSeverity.SUCCESS}
          onClose={() => setSuccess(null)}
          global
        />
        <NewIgModal />
        <div className="collapsible-div">
          {igData && igData.length >= 0 && igData[0] ?
            processData().map((object) => {
              return (
                <InstaCollapsible
                  key={object[0]}
                  id={object[0]}
                  content={object[1].note}
                  url={object[1].url}
                  onAction={onAction}
                />
              );
            }) :
            <p>
              Nothing to display, you could start by adding some posts above.
            </p>
          }
        </div>
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default Instagram;
