import React, { useEffect } from 'react';
import './Instagram.css';
import NewIgModal from './NewIgModal';
import InstaCollapsible from './InstaCollapsible';
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
} from '../../../../components';
import { messages } from '../../../../constants';
import { isDataPopulated } from '../../../../utils';
import { useIgDb } from '../../../../hooks';

function Instagram() {
  const [ig, loading, getIg, addIg, delIg] = useIgDb();

  useEffect(() => {
    getIg();
  }, []);

  const processData = () => {
    const data = [];
    if (isDataPopulated(ig)) {
      const dataValues = Object.values(ig[0]).reverse();
      const keys = Object.keys(ig[0]).reverse();
      for (let i = 0; i < dataValues.length; i++) {
        data[i] = [keys[i], dataValues[i]];
      }
    }
    return data;
  };

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <div className="instagram-container">
        <NewIgModal addIg={addIg} />
        <div className="collapsible-div">
          <JumpalPossiblyEmpty
            msg={messages.IG_EMPTY}
            isPopulated={isDataPopulated(ig)}>
            <div>
              {processData().map((object) => {
                return (
                  <InstaCollapsible
                    key={object[0]}
                    id={object[0]}
                    content={object[1].note}
                    url={object[1].url}
                    delIg={delIg}
                  />
                );
              })}
            </div>
          </JumpalPossiblyEmpty>
        </div>
      </div>
    </JumpalSpinnerWrapper>
  );
}

export default Instagram;
