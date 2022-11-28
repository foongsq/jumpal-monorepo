import React from "react";
import NewMedia from "./NewMedia";
import MediaCollapsible from "./MediaCollapsible";
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
  JumpalErrorText,
  JumpalHideableComponent,
} from "../../../../components";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import {
  FullWidthContainer,
  JumpalVerticalSpacing,
} from "../../../../components/JumpalCommon.tsx";
import useMediaController from "./useMediaController";
import PropTypes from "prop-types";
import { useAuth } from "../../../../data";

Media.propTypes = {
  hide: PropTypes.boolean,
};

export default function Media(props) {
  const { hide } = props;
  const [user] = useAuth();
  const [ig, loading, addIg, delIg] = useMediaController();

  return (
    <JumpalHideableComponent hide={hide}>
      {!user ? (
        <JumpalErrorText msg={messages.IG_NOT_SIGNED_IN} />
      ) : (
        <JumpalSpinnerWrapper loading={loading}>
          <FullWidthContainer>
            <NewMedia addIg={addIg} />
            <JumpalVerticalSpacing />
            <JumpalPossiblyEmpty
              msg={messages.IG_EMPTY}
              isPopulated={isDataPopulated(ig)}
            >
              <div>
                {ig.map((feMediaRefRecord) => {
                  return (
                    <MediaCollapsible
                      key={feMediaRefRecord.id}
                      id={feMediaRefRecord.id}
                      content={feMediaRefRecord.note}
                      url={feMediaRefRecord.url}
                      delIg={delIg}
                    />
                  );
                })}
              </div>
            </JumpalPossiblyEmpty>
            <JumpalVerticalSpacing />
          </FullWidthContainer>
        </JumpalSpinnerWrapper>
      )}
    </JumpalHideableComponent>
  );
}
