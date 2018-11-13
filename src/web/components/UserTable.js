import React, {Component} from 'react';

function UserTable(props){
  const users = props.users;

  const tableRows = users.map((user) =>
    <tr key={user._id}>
      <td>{user._id}</td>
      <td>{`${user.givenName} ${user.familyName}`}</td>
      <td>{user.age}</td>
      <td>{user.email}</td>
      <td><i className="fas fa-user-edit"></i></td>
      <td><i className="fas fa-trash"></i></td>
      <td></td>
    </tr>
  );

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>User Unique Id</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email Address</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  )
}

export default UserTable;
