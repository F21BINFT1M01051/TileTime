import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../../../../components/InputField';
import FocusedSelection from '../../../../../../../components/FocusedSelection';
import DateTimePicker from '@react-native-community/datetimepicker';
import ToggleSwitch from 'toggle-switch-react-native';
import DropdownField from '../../../../../../../components/DropDown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const experience = [
  {
    id: 1,
    name: 'Beginner-friendly',
  },
  {
    id: 2,
    name: 'Fast Paced',
  },
  {
    id: 3,
    name: 'Elder Friendly',
  },
];

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

const GuidedPlayBasic = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [checked, setChecked] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [endDate, seteEndDate] = useState(new Date());
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  const [isOn3, setIsOn3] = useState(false);
  const [isOn4, setIsOn4] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [refund, setRefund] = useState(null);
  const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [varient, setVarient] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);
  const [showPicker5, setShowPicker5] = useState(false);
  const [endOn, setEndOn] = useState(new Date());
  const [applies, setApplies] = useState([]);

  const onChange = ({event, selectedDate}:any) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeDate = ({event, selectedDate}:any) => {
    setShowPicker2(false);
    if (selectedDate) seteEndDate(selectedDate);
  };

  const onChangeStartTime = ({event, selectedDate}:any) => {
    setShowPicker3(false);
    if (selectedDate) setStartTime(selectedDate);
  };

  const onChangeEndTime = ({event, selectedDate}:any) => {
    setShowPicker4(false);
    if (selectedDate) setEndTime(selectedDate);
  };

  const endOnDate = ({event, selectedDate}:any) => {
    setShowPicker5(false);
    if (selectedDate) setEndOn(selectedDate);
  };

  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response?.assets?.length > 0) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  const toggleSelection = (id: any) => {
    if (applies.includes(id)) {
      setApplies(applies.filter(item => item !== id));
    } else {
      setApplies([...applies, id]);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.innerWrapper}>
          <View style={styles.sectionHeader}>
            <Text style={styles.eventTitle}>Event Basics</Text>
            <Text style={styles.eventSubtitle}>
              Set the basics: name your event and define the experience.
            </Text>
          </View>

          {/* Banner Image */}
          <View
            style={[
              styles.imageUploadBox,
              { borderStyle: imageUri ? 'solid' : 'dashed' },
            ]}
          >
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                resizeMode="cover"
                style={styles.uploadedImage}
              />
            ) : (
              <>
                <Image
                  source={ICONS.upload}
                  resizeMode="contain"
                  style={styles.uploadIcon}
                />
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.uploadButton}
                  activeOpacity={0.8}
                >
                  <Text style={styles.uploadButtonText}>
                    Upload Banner Image
                  </Text>
                </TouchableOpacity>
                <Text style={styles.imageHint}>
                  Suggested dimensions: 1200x600
                </Text>
              </>
            )}
          </View>

          {imageUri && (
            <View style={styles.changeImageWrapper}>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.changeImageButton}
                activeOpacity={0.8}
              >
                <Image
                  source={ICONS.pen33}
                  resizeMode="contain"
                  style={styles.changeImageIcon}
                />
                <Text style={styles.changeImageText}>Change Image</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Event Title */}
          <View style={{ marginTop: imageUri ? RFPercentage(-2) : 0 }}>
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
            selectedText={date.toDateString()}
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
                  selectedText={endDate.toDateString()}
                  onPress={() => setShowPicker2(true)}
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
                  />
                )}

                <FocusedSelection
                  placeholder="Start Time"
                  selectedText={startTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  onPress={() => setShowPicker3(true)}
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
                  />
                )}

                <FocusedSelection
                  placeholder="End Time"
                  selectedText={endTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  onPress={() => setShowPicker4(true)}
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
                  />
                )}
              </View>
            </>
          )}

          {/* Paid Event */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Make This a Paid Event</Text>
            <ToggleSwitch
              isOn={isOn}
              onColor={COLORS.pink}
              offColor={COLORS.switch}
              size="small"
              onToggle={() => setIsOn(!isOn)}
            />
          </View>

          {/* If Paid Event */}
          {isOn && (
            <View style={styles.admissionDetailsWrapper}>
              <Text style={styles.admissionTitle}>Admission Details</Text>
              <InputField
                placeholder="Set Admission Price"
                value={price}
                onChangeText={setPrice}
              />
              <InputField
                placeholder="Total Seats Available"
                value={seats}
                onChangeText={setSeats}
              />
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Enable Waitlist</Text>
                <ToggleSwitch
                  isOn={isOn2}
                  onColor={COLORS.pink}
                  offColor={COLORS.switch}
                  size="small"
                  onToggle={() => setIsOn2(!isOn2)}
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>
                  Payment Required to confirm seat
                </Text>
                <ToggleSwitch
                  isOn={isOn3}
                  onColor={COLORS.pink}
                  offColor={COLORS.switch}
                  size="small"
                  onToggle={() => setIsOn3(!isOn3)}
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>Enable Refunds</Text>
                <ToggleSwitch
                  isOn={isOn4}
                  onColor={COLORS.pink}
                  offColor={COLORS.switch}
                  size="small"
                  onToggle={() => setIsOn4(!isOn4)}
                />
              </View>

              {/* Refund Eligibility */}
              <View>
                <DropdownField
                  placeholder="Refund Eligibility"
                  data={[
                    '24 hours before event',
                    '24 hours before event',
                    '24 hours before event',
                    '24 hours before event',
                  ]}
                  selectedValue={refund}
                  onValueChange={(val: any) => setRefund(val)}
                  isDropdownVisible={isDropdownVisible2}
                  setIsDropdownVisible={setIsDropdownVisible2}
                  style={styles.dropdownField}
                />
              </View>
            </View>
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
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.weekButton}
                    >
                      <Text style={styles.weekText}>Week</Text>
                      <FontAwesome
                        name="caret-down"
                        size={RFPercentage(2)}
                        color={COLORS.pink}
                      />
                    </TouchableOpacity>
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
                        {endOn.toDateString()}
                      </Text>
                    </TouchableOpacity>

                    {showPicker5 && (
                      <DateTimePicker
                        value={endOn}
                        mode="date"
                        onChange={endOnDate}
                        style={{
                          position: 'absolute',
                          bottom: RFPercentage(5),
                          right: RFPercentage(6.5),
                          zIndex: 999,
                        }}
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

          {/* Additional Details */}
          <Text style={styles.additionalDetailsTitle}>Additional details</Text>
          <Text style={styles.sectionTitle}>Select What Applies</Text>
        </View>

        <ScrollView
          horizontal
          style={styles.badgeWrapper}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgeContent}
        >
          {experience.map(item => {
            const isSelected = applies.includes(item.id);
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={[
                  styles.experienceBadge,
                  isSelected && { backgroundColor: COLORS.primary },
                ]}
                onPress={() => toggleSelection(item.id)}
              >
                <Text
                  style={[
                    styles.badgeText,
                    isSelected && { color: COLORS.white },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Game Varient */}
        <View style={styles.dropdownWrapper}>
          <DropdownField
            placeholder="Choose game variant"
            data={['American', 'War Mahjong', 'Hong Kong', 'Mahjong Titans']}
            selectedValue={varient}
            onValueChange={(val: any) => setVarient(val)}
            isDropdownVisible={isDropdownVisible2}
            setIsDropdownVisible={setIsDropdownVisible2}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default GuidedPlayBasic;

// Main container styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // ScrollView content styles
  scrollViewContent: {
    paddingBottom: RFPercentage(2),
  },
  // Inner wrapper for content
  innerWrapper: {
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(1),
  },
  // Step bar navigation styles
  stepBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepBar: {
    width: RFPercentage(6.5),
    height: RFPercentage(0.7),
    borderRadius: RFPercentage(100),
  },
  // Section header styles
  sectionHeader: {
    marginTop: RFPercentage(3),
  },
  eventTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
    fontFamily: FONTS.headline,
  },
  eventSubtitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2),
  },
  // Image upload box styles
  imageUploadBox: {
    marginTop: RFPercentage(3),
    width: '100%',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.dashedBorder,
    height: RFPercentage(26),
    borderRadius: RFPercentage(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: RFPercentage(2),
  },
  uploadIcon: {
    width: RFPercentage(8),
    height: RFPercentage(8),
  },
  uploadButton: {
    height: RFPercentage(5.3),
    alignItems: 'center',
    width: RFPercentage(21),
    borderWidth: RFPercentage(0.1),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2),
    marginTop: RFPercentage(2),
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
  },
  imageHint: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.5),
    textAlign: 'center',
    marginTop: RFPercentage(2),
  },
  // Change image button styles
  changeImageWrapper: {
    alignItems: 'center',
    bottom: RFPercentage(2.5),
  },
  changeImageButton: {
    height: RFPercentage(5.3),
    alignItems: 'center',
    width: RFPercentage(21),
    borderWidth: RFPercentage(0.1),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    borderRadius: RFPercentage(2.2),
    flexDirection: 'row',
    backgroundColor: COLORS.white,
  },
  changeImageIcon: {
    width: RFPercentage(1.6),
    height: RFPercentage(1.6),
  },
  changeImageText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    marginLeft: RFPercentage(0.6),
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
  checkIcon: {
    width: RFPercentage(3),
    height: RFPercentage(3),
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
  // Admission details styles
  admissionDetailsWrapper: {
    marginTop: RFPercentage(3),
  },
  admissionTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    marginBottom: RFPercentage(1),
  },
  // Dropdown field styles
  dropdownField: {
    marginTop: RFPercentage(3),
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
  // Additional details title
  additionalDetailsTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
    marginTop: RFPercentage(3.5),
  },
  // Section title for experience selection
  sectionTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.medium,
    marginTop: RFPercentage(3),
  },
  // Badge wrapper for experience selection
  badgeWrapper: {
    marginTop: RFPercentage(1.5),
    flexDirection: 'row',
  },
  badgeContent: {
    // paddingHorizontal: RFPercentage(2),
  },
  experienceBadge: {
    height: RFPercentage(4.5),
    paddingHorizontal: RFPercentage(1.8),
    backgroundColor: COLORS.fieldColor,
    borderRadius: RFPercentage(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: RFPercentage(1.5),
    marginBottom: RFPercentage(1.5),
  },
  badgeText: {
    color: COLORS.grey3,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.medium,
  },
  // Dropdown wrapper for game variant
  dropdownWrapper: {
    width: '100%',
    alignSelf: 'center',
    marginTop: RFPercentage(-1),
  },
 
});
