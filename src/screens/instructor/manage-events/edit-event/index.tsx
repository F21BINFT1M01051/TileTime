import {
  StyleSheet,
  Image,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import DropdownField from '../../../../components/DropDown';
import InputField from '../../../../components/InputField';
import FocusedSelection from '../../../../components/FocusedSelection';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../../../components/CustomButton';
import moment from 'moment';

const formatDate = (date: Date) => {
  return moment(date).format('D MMMM YYYY');
};

const EditEventBasic = () => {
  const [Title, setTitle] = useState('Beginner Mahjong Bootcamp');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [type, setType] = useState('Coaching Session');
  const [location, setLocation] = useState('413, Snow Dr, Gregg, TN, 33211');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showPicker3, setShowPicker3] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeStartTime = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker3(false);
      return;
    }
    setShowPicker3(false);
    if (selectedDate) setStartTime(selectedDate);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AuthHeader
        title="Edit Basics"
        style={{ fontFamily: FONTS.semiBold, fontSize: RFPercentage(1.9) }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <InputField
            placeholder="Event Title"
            value={Title}
            onChangeText={setTitle}
          />
          <DropdownField
            placeholder="Event Type"
            data={[
              'Coaching Session',
              'Coaching Session',
              'Coaching Session',
              'Coaching Session',
            ]}
            selectedValue={type}
            onValueChange={(val: any) => setType(val)}
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
          />
          <InputField
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            icon={
              <Image
                source={ICONS.location}
                resizeMode="contain"
                style={styles.locationIcon}
              />
            }
          />

          <FocusedSelection
            placeholder="Event Date"
            selectedText={formatDate(date)}
            onPress={() => setShowPicker(!showPicker)}
            icon={
              <Image
                source={ICONS.cl}
                resizeMode="contain"
                style={styles.dateIcon}
              />
            }
          />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onChange}
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              style={{ alignSelf: 'center' }}
              textColor={COLORS.primary}
              accentColor={COLORS.pink}
              themeVariant="light"
            />
          )}

          <FocusedSelection
            placeholder="Start Time"
            selectedText={startTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            onPress={() => setShowPicker3(!showPicker3)}
            icon={
              <Image
                source={ICONS.clock}
                resizeMode="contain"
                style={styles.dateIcon}
              />
            }
          />
          {showPicker3 && Platform.OS === 'ios' && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: COLORS.white,
                borderRadius: RFPercentage(2),
                paddingBottom: RFPercentage(3),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                zIndex: 999,
                borderWidth: RFPercentage(0.1),
                borderColor: COLORS.lightWhite,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: RFPercentage(3),
                }}
              >
                <TouchableOpacity onPress={() => setShowPicker3(false)}>
                  <Text
                    style={{
                      color: COLORS.grey4,
                      fontFamily: FONTS.semiBold,
                      fontSize: RFPercentage(1.8),
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowPicker3(false)}>
                  <Text
                    style={{
                      color: COLORS.pink,
                      fontFamily: FONTS.semiBold,
                      fontSize: RFPercentage(1.8),
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={startTime}
                mode="time"
                display="spinner"
                onChange={(e, selectedDate) =>
                  selectedDate && setStartTime(selectedDate)
                }
                style={{ backgroundColor: COLORS.white, alignSelf:"center" }}
                textColor={COLORS.primary}
                accentColor={COLORS.pink}
                themeVariant="light"
              />
            </View>
          )}

          {/* For Android keep it simple */}
          {showPicker3 && Platform.OS === 'android' && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={onChangeStartTime}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View style={styles.bottomContent}>
          <CustomButton title="Save And Next" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default EditEventBasic;

const styles = StyleSheet.create({
  locationIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  dateIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  bottomBar: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    position: 'absolute',
    bottom: 0,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
    backgroundColor: COLORS.white,
  },
  bottomContent: {
    width: '90%',
    alignSelf: 'center',
  },
});
