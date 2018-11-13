import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import UserTable from './UserTable';
import AddUserForm from './AddUserForm';

class App extends Component {

  state = {
      users: []
    }

  componentDidMount() {
    axios.get('/api/users')
      .then((raw) => {
        this.setState(() => ({
          users: raw.data
        }));
      });
  }

  render() {

    return (
      <div>
        <h3>
          All Users
        </h3>
          <UserTable users={this.state.users}/>
        <hr />
              <button className="btn btn-lg btn-primary">
                Add New User
              </button>
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById("content");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
