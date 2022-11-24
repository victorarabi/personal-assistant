import { useEffect } from 'react';
import axios from 'axios';
import LoginCard from '../../components/LoginCard/LoginCard';
import './HomePage.scss';

//fetches server_URL from environment Variable
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function HomePage({
  isLoggedIn,
  setIsLoggedIn,
  profileData,
  setProfileData,
}) {
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/profile`, { withCredentials: true })
      .then((res) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          setIsLoggedIn(false);
        } else {
          console.log('Error authenticating', err);
        }
      });
  });

  if (!isLoggedIn) {
    return <LoginCard />;
  }
  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}
