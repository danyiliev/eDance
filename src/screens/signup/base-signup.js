import React from 'react';
import {BaseAuth} from '../base-auth';
import {LoadingHUD} from 'react-native-hud-hybrid';
import ImagePicker from 'react-native-image-picker';
import SelectPicker from '../../components/SelectPicker/SelectPicker';
import {styles} from './styles';
import {Picker} from '@react-native-community/picker';
import {Platform} from 'react-native';
import {STATES} from '../../constants/constant-data';

export class BaseSignup extends BaseAuth {
  photoFile = null;

  constructor(props) {
    super(props);

    this.loadingHUD = new LoadingHUD();
  }

  onClickPhoto() {
    const options = {
      title: 'Select Image',
      mediaType: 'photo',
      noData: true,
      maxWidth: 640,
      maxHeight: 640,
      quality: 0.5,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.photoFile = response;

        this.setState({
          photoImg: source,
          photoFileName: response.fileName,
        });
      }
    });
  }
}
