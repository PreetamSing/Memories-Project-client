import React from 'react';
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './memories/components/Home/Home';
import Auth from './memories/components/Auth/Auth';
import GoogleSignUp from './memories/components/Auth/GoogleSignUp';
import GoogleSignIn from './memories/components/Auth/GoogleSignIn';

function App() {

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/memories" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/auth/googlesignup" exact component={GoogleSignUp} />
          <Route path="/auth/googlesignin" exact component={GoogleSignIn} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
