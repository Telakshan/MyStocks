import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Stocks from "./Components/Stock/Stocks";
import About from './Components/About/About'
function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Route exact path="/" component={Stocks} />
        <Switch>
          <Route path="/home" component={Stocks} exact />
          <Route path='/about' component={About} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
