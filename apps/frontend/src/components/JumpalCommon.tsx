import styled from "@emotion/styled";
import { HiddenStyle, InputStyle } from "../styles/styles";
import { FormControl } from "@mui/material";
import React from "react";

export const JumpalPageContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
  height: 90%;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const JumpalSmallVerticalSpacing = styled.div`
  height: 0.5rem;
`;

export const JumpalVerticalSpacing = styled.div`
  height: 1rem;
`;

export const JumpalHorizontalSpacing = styled.div`
  width: 1rem;
`;

export const CollapsibleButtonsContainer = styled.div`
  display: flex;
  border-radius: 10px;
  border-bottom: 1px solid gray;
`;

export const JumpalCenteredButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
`;

type EditableInputProps = {
  isEditing: boolean;
};

export const EditableInput = styled.input`
  ${(props: EditableInputProps) => (props.isEditing ? InputStyle : HiddenStyle)}
`;

interface JumpalFormControlProps {
  children: React.Component;
}

export const JumpalFormControl = ({ children }: JumpalFormControlProps) => {
  return (
    <>
      <JumpalVerticalSpacing />
      <FormControl fullWidth>{children}</FormControl>
      <JumpalVerticalSpacing />
    </>
  );
};
