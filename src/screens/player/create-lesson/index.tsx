import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/CustomButton';
import AuthHeader from '../../../components/AuthHeader';
import InputField from '../../../components/InputField';
import FocusedSelection from '../../../components/FocusedSelection';
import DateTimePicker from '@react-native-community/datetimepicker';
import ToggleSwitch from 'toggle-switch-react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const Days = [
  {
    id: '1',
    name: 'S',
  },
  {
    id: '2',
    name: 'M',
  },
  {
    id: '3',
    name: 'T',
  },
  {
    id: '4',
    name: 'W',
  },
  {
    id: '5',
    name: 'T',
  },
  {
    id: '6',
    name: 'F',
  },
  {
    id: '7',
    name: 'S',
  },
];

const formatDate = (date: Date) => {
  return moment(date).format('D MMMM YYYY');
};


const CreateLessonPlayer = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [endDate, seteEndDate] = useState(new Date());
  const [recurring, setRecurring] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);
  const [showPicker5, setShowPicker5] = useState(false);
  const [endOn, setEndOn] = useState(new Date());

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Week');

  const handleSelect = (option: any) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker2(false);
      return;
    }
    setShowPicker2(false);
    if (selectedDate) seteEndDate(selectedDate);
  };

  const onChangeStartTime = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker3(false);
      return;
    }
    setShowPicker3(false);
    if (selectedDate) setStartTime(selectedDate);
  };

  const onChangeEndTime = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker4(false);
      return;
    }
    setShowPicker4(false);
    if (selectedDate) setEndTime(selectedDate);
  };

  const endOnDate = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowPicker5(false);
      return;
    }
    setShowPicker5(false);
    if (selectedDate) setEndOn(selectedDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <AuthHeader title="Create Lesson" right={true} rightText="Save Draft" />

        {/* Inner Content */}
        <View style={styles.contentContainer}>
          <View>
            <InputField
              placeholder="Event Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Event Description */}
          <View style={styles.bioWrapper}>
            <View style={styles.bioContainer}>
              <View style={styles.bioInputWrapper}>
                <TextInput
                  placeholder="Event Description"
                  placeholderTextColor={COLORS.placeholder}
                  style={styles.bioInput}
                  multiline
                  maxLength={150}
                  value={description}
                  onChangeText={setDescription}
                  cursorColor={COLORS.primary}
                  selectionColor={COLORS.primary}
                />
              </View>
              <View style={styles.bioIconWrapper}>
                <Image
                  source={ICONS.bars}
                  resizeMode="contain"
                  style={styles.bioIcon}
                />
              </View>
            </View>
          </View>

          {/* Location */}
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

          {/* Event Date */}
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
            />
          )}

          {/* Multi Day */}
          <TouchableOpacity
            style={styles.checkWrap}
            activeOpacity={0.8}
            onPress={() => setChecked(!checked)}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setChecked(!checked)}
            >
              <Image
                source={checked ? ICONS.checked : ICONS.uncheck}
                resizeMode="contain"
                style={styles.checkIcon}
              />
            </TouchableOpacity>
            <Text style={styles.business}>This is a Multi-Day Event</Text>
          </TouchableOpacity>

          {/* If Multi Day event */}
          {checked && (
            <>
              <View style={styles.multiDayWrapper}>
                <FocusedSelection
                  placeholder="Event End Date"
                  selectedText={formatDate(endDate)}
                  onPress={() => setShowPicker2(!showPicker2)}
                  icon={
                    <Image
                      source={ICONS.cl}
                      resizeMode="contain"
                      style={styles.dateIcon}
                    />
                  }
                />
                {showPicker2 && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    onChange={onChangeDate}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    style={{ alignSelf: 'center' }}
                    textColor={COLORS.primary}
                    accentColor={COLORS.pink}
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
                {showPicker3 && (
                  <DateTimePicker
                    value={startTime}
                    mode="time"
                    onChange={onChangeStartTime}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    style={{ alignSelf: 'center' }}
                    textColor={COLORS.primary}
                    accentColor={COLORS.pink}
                  />
                )}

                <FocusedSelection
                  placeholder="End Time"
                  selectedText={endTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  onPress={() => setShowPicker4(!showPicker4)}
                  icon={
                    <Image
                      source={ICONS.clock}
                      resizeMode="contain"
                      style={styles.dateIcon}
                    />
                  }
                />
                {showPicker4 && (
                  <DateTimePicker
                    value={endTime}
                    mode="time"
                    onChange={onChangeEndTime}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    style={{ alignSelf: 'center' }}
                    textColor={COLORS.primary}
                    accentColor={COLORS.pink}
                  />
                )}
              </View>
            </>
          )}

          {/* Recurring Event */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Make This a Recurring Event</Text>
            <ToggleSwitch
              isOn={recurring}
              onColor={COLORS.pink}
              offColor={COLORS.switch}
              size="small"
              onToggle={() => setRecurring(!recurring)}
            />
          </View>

          {/* If Recurring */}
          {recurring && (
            <>
              <View style={styles.recurringContainer}>
                <View>
                  <Text style={styles.repeatTitle}>
                    Set how often you'd like this session to repeat
                  </Text>
                  <View style={styles.repeatRow}>
                    <Text style={styles.repeatLabel}>Repeat every</Text>
                    <TextInput
                      placeholder="1"
                      placeholderTextColor={COLORS.placeholder}
                      style={styles.repeatInput}
                      cursorColor={COLORS.primary}
                      selectionColor={COLORS.primary}
                    />
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.weekButton}
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                      >
                        <Text style={styles.weekText}>{selectedOption}</Text>
                        <FontAwesome
                          name={dropdownVisible ? 'caret-up' : 'caret-down'}
                          size={RFPercentage(2)}
                          color={COLORS.pink}
                        />
                      </TouchableOpacity>

                      {/* Dropdown Options */}
                      {dropdownVisible && (
                        <View style={styles.dropdown}>
                          <TouchableOpacity
                            onPress={() => handleSelect('Week')}
                          >
                            <Text style={styles.dropdownItem}>Week</Text>
                          </TouchableOpacity>
                          <View
                            style={{
                              width: '90%',
                              height: RFPercentage(0.1),
                              backgroundColor: COLORS.lightWhite,
                              alignSelf: 'center',
                            }}
                          ></View>
                          <TouchableOpacity
                            onPress={() => handleSelect('Month')}
                          >
                            <Text style={styles.dropdownItem}>Month</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>

                  <Text style={styles.repeatOnLabel}>Repeat on</Text>
                  <FlatList
                    data={Days}
                    horizontal
                    contentContainerStyle={styles.dayList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setSelectedDay(item.id)}
                          activeOpacity={0.8}
                          style={[
                            styles.dayButton,
                            {
                              backgroundColor:
                                selectedDay === item.id
                                  ? COLORS.pink4
                                  : COLORS.fieldColor,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.dayText,
                              {
                                color:
                                  selectedDay === item.id
                                    ? COLORS.pink
                                    : COLORS.lightGrey,
                              },
                            ]}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />

                  {/* Recurring Ends */}
                  <Text style={styles.endsLabel}>Ends</Text>
                  <TouchableOpacity
                    onPress={() => setSelectedGroup('never')}
                    activeOpacity={0.8}
                    style={[styles.radioRow, { marginTop: RFPercentage(2) }]}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedGroup('never')}
                      style={[
                        styles.radioButton,
                        {
                          borderColor:
                            selectedGroup === 'never'
                              ? COLORS.pink
                              : COLORS.radio,
                          backgroundColor:
                            selectedGroup === 'never'
                              ? 'transparent'
                              : COLORS.radio2,
                        },
                      ]}
                    >
                      {selectedGroup === 'never' && (
                        <View style={styles.radioDot} />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.radioLabel}>Never</Text>
                  </TouchableOpacity>

                  <View style={styles.radioDateRow}>
                    <TouchableOpacity
                      onPress={() => setSelectedGroup('on')}
                      activeOpacity={0.8}
                      style={styles.radioRow}
                    >
                      <TouchableOpacity
                        onPress={() => setSelectedGroup('on')}
                        style={[
                          styles.radioButton,
                          {
                            borderColor:
                              selectedGroup === 'on'
                                ? COLORS.pink
                                : COLORS.radio,
                            backgroundColor:
                              selectedGroup === 'on'
                                ? 'transparent'
                                : COLORS.radio2,
                          },
                        ]}
                      >
                        {selectedGroup === 'on' && (
                          <View style={styles.radioDot} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.radioLabel}>On</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowPicker5(true)}
                      activeOpacity={0.8}
                      style={styles.dateButton}
                    >
                      <Text style={styles.dateText}>
                        {formatDate(endOn)}
                      </Text>
                    </TouchableOpacity>

                    {showPicker5 && (
                      <DateTimePicker
                        value={endOn}
                        mode="date"
                        onChange={endOnDate}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        style={{
                          position: 'absolute',
                          bottom: RFPercentage(5),
                          zIndex: 999,
                          alignSelf: 'center',
                          backgroundColor: COLORS.white,
                          borderWidth: 1,
                          borderColor: COLORS.lightWhite,
                          borderRadius: RFPercentage(1),
                        }}
                        textColor={COLORS.primary} // changes text color
                        accentColor={COLORS.pink}
                      />
                    )}
                  </View>
                  <View style={styles.radioSessionRow}>
                    <TouchableOpacity
                      onPress={() => setSelectedGroup('after')}
                      activeOpacity={0.8}
                      style={styles.radioRow}
                    >
                      <TouchableOpacity
                        onPress={() => setSelectedGroup('after')}
                        style={[
                          styles.radioButton,
                          {
                            borderColor:
                              selectedGroup === 'after'
                                ? COLORS.pink
                                : COLORS.radio,
                            backgroundColor:
                              selectedGroup === 'after'
                                ? 'transparent'
                                : COLORS.radio2,
                          },
                        ]}
                      >
                        {selectedGroup === 'after' && (
                          <View style={styles.radioDot} />
                        )}
                      </TouchableOpacity>
                      <Text style={styles.radioLabel}>After</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.sessionButton}
                    >
                      <Text style={styles.sessionText}>5 sessions</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      {!keyboardIsVisible && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomContent}>
            <CustomButton
              title="Save And Next"
              onPress={() => {
                navigation.navigate('SelectLessonInstructors');
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CreateLessonPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: RFPercentage(15),
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(1.5),
  },

  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
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

  // Bio input styles
  bioWrapper: {
    marginTop: RFPercentage(2),
  },
  bioContainer: {
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
  },
  bioInputWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    textAlignVertical: 'top',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    lineHeight: RFPercentage(2.5),
    fontSize: RFPercentage(1.8),
    height: RFPercentage(10),
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  bioIconWrapper: {
    alignSelf: 'flex-end',
    right: RFPercentage(0.5),
    bottom: RFPercentage(0.5),
  },
  bioIcon: {
    width: RFPercentage(1.5),
    height: RFPercentage(1.5),
  },
  // Location and date icon styles
  locationIcon: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  dateIcon: {
    width: RFPercentage(2),
    height: RFPercentage(2),
  },
  // Checkbox styles
  checkWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },

  business: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
  },
  // Multi-day event wrapper
  multiDayWrapper: {
    marginTop: RFPercentage(1),
  },
  // Toggle switch row styles
  toggleRow: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(4),
  },
  toggleLabel: {
    textAlign: 'center',
    fontFamily: FONTS.regular,
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
  },

  // Recurring event container styles
  recurringContainer: {
    width: '100%',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(2),
    padding: RFPercentage(1.5),
    marginTop: RFPercentage(3),
  },
  repeatTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  repeatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  repeatLabel: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  repeatInput: {
    width: RFPercentage(5),
    height: RFPercentage(5),
    borderRadius: RFPercentage(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    color: COLORS.inputColor,
    textAlign: 'center',
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(2),
    fontSize: RFPercentage(1.9),
  },
  weekButton: {
    width: RFPercentage(12),
    height: RFPercentage(5),
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.pink,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(2),
    borderRadius: RFPercentage(1),
    marginLeft: RFPercentage(2),
  },
  weekText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  repeatOnLabel: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(2),
  },
  dayList: {
    paddingTop: RFPercentage(1.8),
  },
  dayButton: {
    marginRight: RFPercentage(1.5),
    width: RFPercentage(4.2),
    height: RFPercentage(4.2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(100),
  },
  dayText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  endsLabel: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(2.5),
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
    borderRadius: RFPercentage(100),
    borderWidth: RFPercentage(0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: RFPercentage(1.7),
    height: RFPercentage(1.7),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.pink,
  },
  radioLabel: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    marginLeft: RFPercentage(1),
  },
  radioDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2.5),
    justifyContent: 'space-between',
  },
  dateButton: {
    width: RFPercentage(14),
    height: RFPercentage(4.8),
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(1),
    right: RFPercentage(6),
  },
  dateText: {
    color: COLORS.placeholder,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
  },
  radioSessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2.5),
    justifyContent: 'space-between',
  },
  sessionButton: {
    width: RFPercentage(14),
    height: RFPercentage(4.8),
    backgroundColor: COLORS.fieldColor,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFPercentage(1),
    right: RFPercentage(6),
  },
  sessionText: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: RFPercentage(1.5),
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: RFPercentage(1),
    marginTop: RFPercentage(0.5),
    zIndex: 100,
    borderColor: COLORS.grey7,
    alignSelf: 'center',
    width: '90%',
  },
  dropdownItem: {
    padding: RFPercentage(1),
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    color: COLORS.focused,
  },
});
