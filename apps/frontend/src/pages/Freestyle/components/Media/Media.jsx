import React from "react";
import NewMedia from "./NewMedia";
import MediaCollapsible from "./MediaCollapsible";
import {
  JumpalSpinnerWrapper,
  JumpalPossiblyEmpty,
} from "../../../../components";
import { messages } from "../../../../constants";
import { isDataPopulated } from "../../../../utils";
import {
  FullWidthContainer,
  JumpalVerticalSpacing,
} from "../../../../components/JumpalCommon.tsx";
import useMediaController from "./useMediaController";

export default function Media() {
  const [ig, loading, addIg, delIg, processData] = useMediaController();

  return (
    <JumpalSpinnerWrapper loading={loading}>
      <FullWidthContainer>
        <NewMedia addIg={addIg} />
        <JumpalVerticalSpacing />
        <JumpalPossiblyEmpty
          msg={messages.IG_EMPTY}
          isPopulated={isDataPopulated(ig)}
        >
          <div>
            {processData().map((object) => {
              return (
                <MediaCollapsible
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
        <JumpalVerticalSpacing />
      </FullWidthContainer>
    </JumpalSpinnerWrapper>
  );
}
