import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as KundliActions from '../../redux/actions/KundliActions';
import { connect } from 'react-redux';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../config/Screen';
import { colors } from '../../config/Constants1';
import { Fonts, Sizes } from '../../assets/style';
import MyLoader from '../../components/MyLoader';
import { showToastMessage } from '../../utils/services';

const Muhurat = ({ dispatch, isLoading, muhuratData }) => {
  const [buttonStatus, setButtonStatus] = useState(0);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dob, setDob] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState('vivah'); // Default muhurat option

  useEffect(() => {
    dispatch(KundliActions.getMuhurat());
  }, [dispatch]);

  console.log("MuhuratData :::KKK", muhuratData)

  useEffect(() => {
    handleFetchKundli(selectedOption, dob); // Fetch data based on default muhurat option
  }, [selectedOption, dob, dispatch]);

  const date_handle = (event, selectedDate) => {
    if (event.type === 'set') {
      const newDate = selectedDate || date;
      setDob(newDate);
      setShow(false);
      handleFetchKundli(selectedOption, newDate); // Re-fetch data after date change
    } else {
      setShow(false);
    }
  };

  const handleMuhuratsSelection = (muhurat, status) => {
    setSelectedOption(muhurat); // Set selected muhurat
    setButtonStatus(status); // Update button status for active state
    if (dob) {
      handleFetchKundli(muhurat, dob); // Fetch data for selected muhurat and date
    }
  };

  const handleFetchKundli = (muhurat, selectedDate) => {
    if (!muhurat) {
      showToastMessage({ message: 'Please Select Muhurat' });
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
      yog: muhurat,
      month: month,
      year: year,
      lat: 25.15,
      lon: 82.5,
      tz: 5.5,
      userid: 'tathastujy',
      authcode: '86ce34784bfc07a39392bf690995ef33',
    };

    console.log('Sending payload:', payload);
    dispatch(KundliActions.getMuhurat(payload));
  };

  const renderButton = (text, muhurat, status) => (
    <TouchableOpacity
      onPress={() => handleMuhuratsSelection(muhurat, status)}
      style={{
        width: SCREEN_WIDTH * 0.4,
        height: SCREEN_HEIGHT * 0.06,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: buttonStatus === status ? colors.background_theme2 : colors.background_theme1,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: buttonStatus === status ? colors.white_color : colors.background_theme2,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          paddingVertical: SCREEN_HEIGHT * 0.02,
          paddingHorizontal: SCREEN_WIDTH * 0.02,
          borderWidth: 1,
          marginHorizontal: Sizes.fixPadding,
        }}
      >
        {Object.entries(item).map(([key, value], i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
            <Text style={{ ...Fonts.PoppinsSemiBold, color: 'white' }}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </Text>
            <Text style={{ ...Fonts.PoppinsSemiBold, color: 'red' }}>
              {value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../assets/images/BG45.png')} style={{ flex: 1 }}>
      <MyLoader isVisible={isLoading} />
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/BG120.png')}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity onPress={() => setShow(true)}>
            <MaterialIcons name="date-range" size={25} color={'white'} />
          </TouchableOpacity>

          <ScrollView style={{ height: SCREEN_HEIGHT * 0.1 }} showsHorizontalScrollIndicator={false} horizontal>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                paddingHorizontal: SCREEN_WIDTH * 0.015,
                alignItems: 'center',
              }}
            >
              {renderButton('Vivah', 'vivah', 0)}
              {renderButton('Grahpravesh', 'grahpravesh', 1)}
              {renderButton('Vaahan', 'vaahan', 2)}
              {renderButton('Sampatti', 'sampatti', 3)}
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
          data={muhuratData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: SCREEN_HEIGHT * 0.2 }}>
              <Text style={{ ...Fonts.PoppinsSemiBold, fontSize: 16, color: 'white' }}>
                No Data Available in {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
              </Text>
            </View>
          )}
        />
      </ImageBackground>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  isLoading: state.setting.isLoading,
  yogdata: state.kundli.yogdata,
});

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Muhurat);
