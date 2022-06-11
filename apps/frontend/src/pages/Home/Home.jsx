import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../routes/routes';
import styled from '@emotion/styled';
import { JumpalPageContainer } from '../../components';

export default function Home() {
  return (
    <HomePageContainer>
      <SpeedFreestyleButtonsContainer>
        <SpeedFreestyleButton to={routes.SPEED}>
          <p>Speed</p>
        </SpeedFreestyleButton>
        <SpeedFreestyleButton to={routes.FREESTYLE}>
          <p>Freestyle</p>
        </SpeedFreestyleButton>
      </SpeedFreestyleButtonsContainer>
    </HomePageContainer>
  );
}

const HomePageContainer = styled(JumpalPageContainer)`
  height: 90vh;
`;

/* To display buttons side by side and vertically center them */
const SpeedFreestyleButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
  height: 50%;
  @media screen and (max-width: 700px) {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 100%;
    height: 100%;
  }
`;

/* Buttons:
  - Add margin around them
  - round corners of button
  - set green background color
  - set width to 40%
  - remove black border */
const SpeedFreestyleButton = styled(Link)`
  margin: 1rem;
  border-radius: 10px;
  background-color: var(--bootstrapGreen);
  width: 40%;
  border: none;
  box-shadow: 5px 5px 5px var(--shadow);
  &:hover {
    background-color: var(--green500);
    text-decoration: none;
    transition: all 1s ease;
    box-shadow: 15px 15px 15px var(--shadow);
  }
  p {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
    text-align: center;
    position: relative;
    top: 40%;
    text-shadow: 2px 2px var(--shadow);
  }
  p:hover {
    font-size: 1.75rem;
    transition: all 1s ease;
  }
  @media screen and (max-width: 700px) {
    width: auto;
    height: 50%;
  }
`;
