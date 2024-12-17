import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/Screen';
import {colors} from '../../config/Constants1';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as SettingActions from '../../redux/actions/SettingActions';
import * as KundliActions from '../../redux/actions/KundliActions';
import {connect} from 'react-redux';
import {Fonts, Sizes} from '../../assets/style';

const Yog = ({locationData, dispatch, navigation, yogdata}) => {
  const [buttonStatus, setButtonStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dobVisible, setDobVisible] = useState(false);
  const [dob, setDob] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    dispatch(KundliActions.getYog());
  }, [dispatch]);

  console.log('getYogData:::KKK', yogdata);

  const date_handle = (event, selectedDate) => {
    if (event.type === 'set') {
      const newDate = selectedDate || date;
      setDob(newDate);
      setShow(false);
      handleFetchKundli(selectedOption, newDate);
    } else {
      setShow(false);
    }
  };

  const handleYogSelection = (yog, status) => {
    setSelectedOption(yog);
    setButtonStatus(status);
    if (dob) {
      handleFetchKundli(yog, dob);
    }
  };

  const handleFetchKundli = (yog, selectedDate) => {
    if (!yog) {
      console.warn('Please select Yog');
      return;
    }

    const month = selectedDate ? selectedDate.getMonth() + 1 : null;
    const year = selectedDate ? selectedDate.getFullYear() : null;

    if (!month || month < 1 || month > 12) {
      console.warn('Please select a valid date');
      return;
    }
    if (!year || year < 1900 || year > new Date().getFullYear()) {
      console.warn('Please select a valid date');
      return;
    }

    const payload = {
      yog: yog,
      month: selectedDate ? selectedDate.getMonth() + 1 : null,
      year: selectedDate ? selectedDate.getFullYear() : null,
      lat: 25.15,
      lon: 82.5,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33',
    };

    console.log('Sending payload:', payload);
    dispatch(KundliActions.getYog(payload));
  };

  const renderButton = (text, yog, status) => (
    <TouchableOpacity
      onPress={() => handleYogSelection(yog, status)}
      style={{
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.06,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:
          buttonStatus === status
            ? colors.background_theme2
            : colors.background_theme1,
      }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color:
            buttonStatus === status
              ? colors.white_color
              : colors.background_theme2,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.02,
          paddingHorizontal: SCREEN_WIDTH * 0.02,
          borderWidth: 1,
          marginHorizontal: Sizes.fixPadding,
        }}>
        {Object.entries(item).map(([key, value], i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 4,
            }}>
            <Text style={{...Fonts.PoppinsSemiBold, color: 'white'}}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <Text style={{...Fonts.PoppinsSemiBold, color: 'red'}}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/BG45.png')}
      style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../../assets/images/BG120.png')}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <MaterialIcons name="date-range" size={25} color={'white'} />
          </TouchableOpacity>

          <ScrollView
            style={{height: SCREEN_HEIGHT * 0.1}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: SCREEN_WIDTH * 0.015,
                alignItems: 'center',
              }}>
              {renderButton('AMRITSIDHHI', 'amritsiddhi', 0)}
              {renderButton('SARVATHSIDHHI', 'sarvarthsiddhi', 1)}
              {renderButton('GURUPUSHYA', 'gurupushya', 2)}
              {renderButton('RAVIPUSHYA', 'ravipushya', 3)}
            </View>
          </ScrollView>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={date_handle}
          />
        )}

        <FlatList
          data={yogdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View
              style={{alignItems: 'center', marginTop: SCREEN_HEIGHT * 0.2}}>
              <Text
                style={{
                  ...Fonts.PoppinsSemiBold,
                  fontSize: 16,
                  color: 'white',
                }}>
                No Data Available
              </Text>
            </View>
          )}
        />
      </ImageBackground>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  customerData: state.customer.customerData,
  wallet: state.customer.wallet,
  locationData: state.setting.locationData,
  isLoading: state.setting.isLoading,
  yogdata: state.kundli.yogdata,
});

const mapDispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(Yog);
