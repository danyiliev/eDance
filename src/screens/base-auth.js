import React from 'react';
import {User} from '../models/user.model';
import {UserHelper} from '../helpers/user-helper';
import {ApiService} from '../services';

export class BaseAuth extends React.Component {
  currentUser: User;

  userType = User.TYPE_STUDENT;

  constructor(props) {
    super(props);

    this.currentUser = props.UserReducer.user;

    // get parameter
    if (props.route.params) {
      this.userType = props.route.params.userType;
    }
  }

  async setUser(user, pageTo) {
    // fetch user from server to update latest

    UserHelper.saveUserToLocalStorage(user, this.props);
  }
}
