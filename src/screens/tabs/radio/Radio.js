import React from 'react';
import DismissKeyboard from '../../../components/DismissKeyboard/DismissKeyboard';
import {styles} from './styles';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Utils} from '../../../helpers/utils';
import {Button, Icon, SearchBar} from 'react-native-elements';
import {colors as colorTheme} from '../../../styles/theme.style';
import MenuModal from '../../../components/MenuModal/MenuModal';

export default class Radio extends React.Component {
  static NAV_NAME = 'radio';

  state = {
    // ui
    showLoading: false,
    redrawIndex: 0,
  };

  // data
  channels = [];

  constructor(props) {
    super(props);

    // load data
    for (let i = 0; i < 20; i++) {
      this.channels.push({});
    }
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        {this.renderHeader()}

        <FlatList
          contentContainerStyle={styles.listCtnContainer}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.showLoading}
          data={Utils.makeEmptyArray(this.channels.length)}
          renderItem={({item, index}) => this.renderItem(item, index)}
          numColumns={2}
        />
      </View>
    );
  }

  renderItem(item, index) {
    return (
      <View style={styles.viewItem}>
        <TouchableOpacity style={styles.viewItemContent}>
          <Image
            style={styles.imgItem}
            source={require('../../../../assets/imgs/radio_default.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderHeader() {
    // search bar
    return (
      <View style={styles.viewSearchbar}>
        <SearchBar
          lightTheme={true}
          placeholder="Search Channel"
          containerStyle={styles.searchCtn}
          inputContainerStyle={styles.searchInputCtn}
          searchIcon={false}
          returnKeyType="search"
          inputStyle={styles.searchInput}
        />
        <View style={styles.butSearchCtn}>
          <Button
            buttonStyle={styles.butSearch}
            icon={
              <Icon
                type="ionicon"
                name="md-search"
                size={22}
                color={colorTheme.light}
              />
            }
          />
        </View>
      </View>
    );
  }

  onRefresh() {}
}
