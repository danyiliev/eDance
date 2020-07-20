import React from 'react';
import {User} from '../models/user.model';
import {UserHelper} from '../helpers/user-helper';

export class BaseAuth extends React.Component {
  currentUser: User;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;
  }

  async setUser(user, pageTo) {
    // fetch user from server to update latest

    UserHelper.saveUserToLocalStorage(user, this.props);
  }
}
