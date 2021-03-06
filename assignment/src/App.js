import logo from './logo.svg';
import './App.css';
import Login from './src/Login';
import Customers from './src/Customers';
import AddUser from './src/AddUser';
import EditUser from './src/EditUser';
import {BrowserRouter as Router  , Switch , Route , Link , useRouteMatch , useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        
        <Route path="/admin">
          <Customers />
        </Route>
        <Route path="/add">
          <AddUser />
        </Route>
        <Route path="/edit">
          <EditUser />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
