import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/header';
import Footer from "./components/footer";
import Login from './views/Login';
import Register from './views/Register';
import Errorpage from './views/404';
import Private from './views/Private';
import Profile from "./views/Profile";
import ChangePassword from "./views/ChangePassword";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/" component={Private} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route component={Errorpage} />
        </Switch>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;