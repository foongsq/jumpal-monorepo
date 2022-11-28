import React from "react";
import useCounterController from "./useCounterController";
import styled from "@emotion/styled";
import { JumpalHideableComponent } from "../../../../components";
import PropTypes from "prop-types";

Counter.propTypes = {
  hide: PropTypes.boolean,
};
export default function Counter(props) {
  const { hide } = props;
  const [count, increment, decrement, reset] = useCounterController();

  return (
    <JumpalHideableComponent hide={hide}>
      <CounterContainer>
        <CountContainer>
          <Count>{count}</Count>
        </CountContainer>
        <CounterButtons>
          <CounterButton onClick={decrement}>-</CounterButton>
          <CounterButton onClick={increment}>+</CounterButton>
        </CounterButtons>
        <ResetButton onClick={reset}>Reset</ResetButton>
      </CounterContainer>
    </JumpalHideableComponent>
  );
}

const CounterContainer = styled.div({
  backgroundColor: "#c2c2c2",
  borderRadius: "10px",
  padding: "1rem",
  margin: "0.5rem auto",
  maxWidth: "500px",
});

const CountContainer = styled.div({
  border: "1px solid #dedede",
  backgroundColor: "#dedede",
});

const Count = styled.h1({
  fontSize: "3rem",
  textAlign: "center",
});

const CounterButtons = styled.div({
  display: "flex",
  justifyContent: "space-between",
});

const CounterButton = styled.button`
  border: none;
  outline: none;
  font-size: 3rem;
  margin: 0.5rem;
  padding: 3rem 3rem;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
  }
`;

const ResetButton = styled.button`
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #ffffff;
  }
`;
