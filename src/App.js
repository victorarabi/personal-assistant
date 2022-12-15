import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ServerOffline from './components/ServerOffline/ServerOffline';
import NewEvent from './pages/NewEvent/NewEvent';
import Forbidden from './components/Forbidden/Forbidden';
import './App.scss';
import axios from 'axios';

//fetches server_URL from environment Variable
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [calendarAuth, setCalendarAuth] = useState(false);
  const [profileData, setProfileData] = useState({
    id: null,
    name: null,
    email: null,
    picture: null,
    calendarAuth: null,
    tokenExpiryDate: null,
  });

  //request to the server to see if there ifit pushs a user logged in
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/`, { withCredentials: true })
      .then((res) => {
        setIsLoading(false);
        setIsLoggedIn(res.data);
      })
      .catch((err) => {
        console.log(err);
        setServerError(true);
      });
  }, [isLoading]);

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <Switch>
        <Route exact path="/">
          {!serverError ? (
            <Home
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              calendarAuth={calendarAuth}
              setCalendarAuth={setCalendarAuth}
              profileData={profileData}
              setProfileData={setProfileData}
            />
          ) : (
            <ServerOffline />
          )}
        </Route>
        <Route path="/new-event">
          {isLoggedIn ? <NewEvent /> : <Forbidden />}
        </Route>
      </Switch>
    </Router>
  );
}
