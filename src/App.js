import React, { useState } from 'react';
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from "./contexts/AuthContext"
import { PostProvider } from "./contexts/PostContext"
import PrivateRoute from "./PrivateRoute"
import Home from './memories/components/Home/Home';
import Auth from './memories/components/Auth/Auth';
import ForgotPassword from './memories/components/Auth/ForgotPassword';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <AuthProvider>
          <PostProvider>
            <Switch>
              <PrivateRoute path="/memories" exact component={Home} setLoading={setLoading} otherPath="/auth" bool={false} />
              <PrivateRoute path="/auth" exact component={Auth} setLoading={setLoading} otherPath="/memories" bool={true} />
              <Route path="/forgot-password" exact component={ForgotPassword} />
            </Switch>
          </PostProvider>
        </AuthProvider>
        {loading && <Grid container justify="center" style={{ height: "100vh" }} alignContent="center">
          <CircularProgress size={60} thickness={4.5} />
        </Grid>}
      </Container>
    </BrowserRouter>
  );
}

export default App;
