import React from "react";
import Paper from "@mui/material/Paper";
import SignOut from "./components/SignOut/SignOut";
import SignIn from "./components/SignIn/SignIn";
import { JumpalSpinnerWrapper } from "../../components";
import { useAuth } from "../../hooks";
import { JumpalPageContainer } from "../../components";
import styled from "@emotion/styled";

export default function ProfilePage() {
  const [user, loading] = useAuth();

  return (
    <JumpalSpinnerWrapper loading={loading}>
      {user ? (
        <ProfilePageContainer>
          <ProfileCard elevation={10}>
            <ProfileImage src={user.photoURL} alt="Profile" />
            <DisplayName>{user.displayName}</DisplayName>
            <EmailContainer>
              <EmailLabel>Email:</EmailLabel>
              <EmailValue>{user.email}</EmailValue>
            </EmailContainer>
            <SignOut />
          </ProfileCard>
        </ProfilePageContainer>
      ) : (
        <SignIn />
      )}
    </JumpalSpinnerWrapper>
  );
}

const ProfilePageContainer = styled(JumpalPageContainer)`
  width: 100%;
  height: 94vh;
  padding: 2rem;
  background-image: url("../../images/cloudy-sky.jpg");
  background-repeat: repeat-y;
`;

const ProfileCard = styled(Paper)`
  width: 100%;
  padding: 2rem;
  background-image: url("../../images/cloudy-sky.jpg");
  background-repeat: repeat-y;
`;

const ProfileImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 10rem;
  border-radius: 50%;
  box-shadow: 5px 5px 5px var(--shadow);
`;

const DisplayName = styled.p`
  text-align: center;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const EmailContainer = styled.div`
  display: flex;
  padding: 1rem 1rem 0 1rem;
`;

const EmailLabel = styled.p`
  font-weight: bold;
`;

const EmailValue = styled.p`
  margin: 0 0.5rem;
`;
