import React, { useState } from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/AuthContext"
import { PostProvider } from "./contexts/PostContext"
import PrivateRoute from "./PrivateRoute"
import Home from './memories/components/Home/Home';
import Auth from './memories/components/Auth/Auth';
import ForgotPassword from './memories/components/Auth/ForgotPassword';
import Portfolio from './portfolio/index';
import Navbar from './Navbar';
import JoinChat from './videoChat/join';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Navbar />
      <AuthProvider>
        <PostProvider>
          <Switch>
            <PrivateRoute path="/memories" exact component={Home} setLoading={setLoading} otherPath="/auth" bool={false} />
            <PrivateRoute path="/auth" exact component={Auth} setLoading={setLoading} otherPath="/memories" bool={true} />
            <Route path="/forgot-password" exact component={ForgotPassword} setLoading={loading && setLoading(false)} />
            <Route path="/video-chat" exact component={JoinChat} setLoading={loading && setLoading(false)} />
            <Route path="/" exact component={Portfolio} setLoading={loading && setLoading(false)} />
          </Switch>
        </PostProvider>
      </AuthProvider>
      {loading && <Grid container justify="center" style={{ height: "100vh" }} alignContent="center">
        <CircularProgress size={60} thickness={4.5} />
      </Grid>}
    </BrowserRouter>
  );
}

export default App;
