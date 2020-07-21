import React from 'react';
import {BaseAuth} from '../base-auth';
import {LoadingHUD} from 'react-native-hud-hybrid';

export class BaseSignup extends BaseAuth {
  photoFile = null;

  constructor(props) {
    super(props);

    this.loadingHUD = new LoadingHUD();
  }
}
