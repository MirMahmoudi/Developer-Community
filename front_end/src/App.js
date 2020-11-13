import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogPage from './LogPage/LogPage';
import HomePage from './Home/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
           <Route exact path="/" component={HomePage} />
           <Route exact path="/auth1" component={LogPage} />
           <Route exact path="/auth2" component={LogPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
