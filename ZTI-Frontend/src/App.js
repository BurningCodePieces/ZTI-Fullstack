import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './hocs/Layout'
import Home from './pages/Home';
import List from './pages/List';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminRoute from './components/Common/AdminRoute';
import UserAccount from './pages/UserAccount';
import PetDetails from './pages/PetDetails';
import UsersList from './pages/UsersList';

import { Provider } from 'react-redux';
import store from './store';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import AddShelter from './pages/AddShelter';
import AddPet from './pages/AddPet';
import PetList from './pages/PetList';
import MoneyManagement from './pages/MoneyManagement';

//alert Options
const alertOptions = {
  timeout: 5000,
  position: 'bottom center',
  transition: 'fade',
  offset: '-30px 0 60px 0'
}

function App() {
  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/contact" exact component={Contact}></Route>
              <Route path="/list" exact render={(props) => <List {...props} showStructuresOfAllUsers={true} />}></Route>
              <Route path="/login" exact component={Login}></Route>
              <Route path="/signup" exact component={Signup}></Route>
              <Route path="/pet_list" exact component={PetList}></Route>
              <Route path="/pet_list/:id" exact component={PetList}></Route>
              <PrivateRoute path="/my_account" exact component={UserAccount}></PrivateRoute>
              <PrivateRoute path="/my_money" exact component={MoneyManagement}></PrivateRoute>
              <Route path="/pet/:id" exact component={PetDetails}></Route>
              <AdminRoute path="/users_list" exact component={UsersList}></AdminRoute>
              <AdminRoute path="/add_shelter" exact component={AddShelter}></AdminRoute>
              <AdminRoute path="/add_pet" exact component={AddPet}></AdminRoute>
            </Switch>
          </Layout>
        </Router>
      </AlertProvider>
    </Provider>
  );
}

export default App;
