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
import { COLORS, FONTS, ICONS } from '../../../../config/theme';
import AuthHeader from '../../../../components/AuthHeader';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../components/InputField';
import CustomButton from '../../../../components/CustomButton';
import FocusedSelection from '../../../../components/FocusedSelection';
import DateTimePicker from '@react-native-community/datetimepicker';
import ToggleSwitch from 'toggle-switch-react-native';
import DropdownField from '../../../../components/DropDown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const steps = ['basics'];

const GuidedPlay = () => {
  const [stepIndex, setStepIndex] = useState(0);
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

  const [showPicker, setShowPicker] = useState(false);
  const [showPicker2, setShowPicker2] = useState(false);
  const [showPicker3, setShowPicker3] = useState(false);
  const [showPicker4, setShowPicker4] = useState(false);

  const onChange = (selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const onChangeDate = (selectedDate: any) => {
    setShowPicker2(false);
    if (selectedDate) seteEndDate(selectedDate);
  };

  const onChangeStartTime = (selectedDate: any) => {
    setShowPicker3(false);
    if (selectedDate) setStartTime(selectedDate);
  };

  const onChangeEndTime = (selectedDate: any) => {
    setShowPicker4(false);
    if (selectedDate) setEndTime(selectedDate);
  };

  const getBarColor = (index: any) => {
    if (index < stepIndex) return COLORS.green;
    if (index === stepIndex) return COLORS.pink;
    return COLORS.fieldColor;
  };

  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.assets?.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

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

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFPercentage(2) }}
      >
        <AuthHeader
          title="Create Guided Play"
          right={true}
          rightText="Save Drafts"
        />

        <View style={styles.innerWrapper}>
          <View style={styles.stepBarContainer}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepBar,
                  {
                    backgroundColor: getBarColor(index),
                    marginLeft: index === 0 ? 0 : RFPercentage(0.7),
                  },
                ]}
              />
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.eventTitle}>Event Basics</Text>
            <Text style={styles.eventSubtitle}>
              Set the basics: name your event and define the experience.
            </Text>
          </View>

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

          <View style={{ marginTop: imageUri ? RFPercentage(-2) : 0 }}>
            <InputField
              placeholder="Event Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

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
            selectedText={date.toDateString()}
            onPress={() => setShowPicker(true)}
            icon={
              <Image
                source={ICONS.cl}
                resizeMode="contain"
                style={styles.dateIcon}
              />
            }
          />
          {showPicker && (
            <DateTimePicker value={date} mode="date" onChange={onChange} />
          )}

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

          {checked && (
            <>
              <View style={{ marginTop: RFPercentage(1) }}>
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
                  />
                )}
              </View>
            </>
          )}

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
          {isOn && (
            <View style={{ marginTop: RFPercentage(3) }}>
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.primary,
                  fontSize: RFPercentage(1.8),
                  marginBottom: RFPercentage(1),
                }}
              >
                Admission Details
              </Text>
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
                  style={{ marginTop: RFPercentage(3) }}
                />
              </View>
            </View>
          )}

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
          {recurring && (
            <>
              <View
                style={{
                  width: '100%',
                  borderWidth: RFPercentage(0.1),
                  borderColor: COLORS.lightWhite,
                  borderRadius: RFPercentage(2),
                  padding: RFPercentage(1.5),
                  marginTop: RFPercentage(3),
                }}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      fontSize: RFPercentage(1.9),
                    }}
                  >
                    Set how often you'd like this session to repeat
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFPercentage(2),
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: FONTS.bold,
                        fontSize: RFPercentage(1.8),
                      }}
                    >
                      Repeat every
                    </Text>
                    <TextInput
                      placeholder="1"
                      placeholderTextColor={COLORS.placeholder}
                      style={{
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
                      }}
                    />

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
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
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontFamily: FONTS.medium,
                          fontSize: RFPercentage(1.8),
                        }}
                      >
                        Week
                      </Text>
                      <FontAwesome
                        name="caret-down"
                        size={RFPercentage(2)}
                        color={COLORS.pink}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      fontSize: RFPercentage(1.8),
                      marginTop: RFPercentage(2),
                    }}
                  >
                    Repeat on
                  </Text>
                  <FlatList
                    data={Days}
                    horizontal
                    contentContainerStyle={{ paddingTop: RFPercentage(1.8) }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => setSelectedDay(item.id)}
                          activeOpacity={0.8}
                          style={{
                            marginRight: RFPercentage(1.5),
                            width: RFPercentage(4.2),
                            height: RFPercentage(4.2),
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              selectedDay === item.id
                                ? COLORS.pink4
                                : COLORS.fieldColor,
                            borderRadius: RFPercentage(100),
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: FONTS.medium,
                              color:
                                selectedDay === item.id
                                  ? COLORS.pink
                                  : COLORS.lightGrey,
                              fontSize: RFPercentage(1.8),
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />

                  <Text
                    style={{
                      color: COLORS.primary,
                      fontFamily: FONTS.bold,
                      fontSize: RFPercentage(1.8),
                      marginTop: RFPercentage(2.5),
                    }}
                  >
                    Ends
                  </Text>
                  <TouchableOpacity
                    onPress={() => setSelectedGroup('never')}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFPercentage(1.6),
                    }}
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
                    <Text
                      style={{
                        color: COLORS.primary,
                        fontFamily: FONTS.medium,
                        fontSize: RFPercentage(1.8),
                        marginLeft: RFPercentage(1),
                      }}
                    >
                      Never
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFPercentage(2.5),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedGroup('on')}
                      activeOpacity={0.8}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
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
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontFamily: FONTS.medium,
                          fontSize: RFPercentage(1.8),
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        On
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        width: RFPercentage(14),
                        height: RFPercentage(4.8),
                        backgroundColor: COLORS.fieldColor,
                        borderWidth: RFPercentage(0.1),
                        borderColor: COLORS.fieldBorder,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: RFPercentage(1),
                        marginLeft: RFPercentage(12),
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.placeholder,
                          fontFamily: FONTS.regular,
                          fontSize: RFPercentage(1.6),
                        }}
                      >
                        4th July 2025
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: RFPercentage(2.5),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setSelectedGroup('after')}
                      activeOpacity={0.8}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
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
                      <Text
                        style={{
                          color: COLORS.primary,
                          fontFamily: FONTS.medium,
                          fontSize: RFPercentage(1.8),
                          marginLeft: RFPercentage(1),
                        }}
                      >
                        After
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={{
                        width: RFPercentage(14),
                        height: RFPercentage(4.8),
                        backgroundColor: COLORS.fieldColor,
                        borderWidth: RFPercentage(0.1),
                        borderColor: COLORS.fieldBorder,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: RFPercentage(1),
                        marginLeft: RFPercentage(10),
                      }}
                    >
                      <Text
                        style={{
                          color: COLORS.inputColor,
                          fontFamily: FONTS.regular,
                          fontSize: RFPercentage(1.6),
                        }}
                      >
                        5 sessions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}

          <Text
            style={{
              color: COLORS.primary,
              fontFamily: FONTS.bold,
              fontSize: RFPercentage(1.8),
              marginTop: RFPercentage(3),
            }}
          >
            Additional details
          </Text>

          <Text style={styles.sectionTitle}>Select what applies</Text>
          <ScrollView horizontal style={styles.badgeWrapper} showsHorizontalScrollIndicator={false}>
            {experience.map(item => (
              <TouchableOpacity key={item.id} style={styles.experienceBadge}>
                <Text style={styles.badgeText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View>
            <DropdownField
              placeholder="Choose game variant"
              data={['American', 'War Mahjong', 'Hong Kong', 'Mahjong Titans']}
              selectedValue={refund}
              onValueChange={(val: any) => setRefund(val)}
              isDropdownVisible={isDropdownVisible2}
              setIsDropdownVisible={setIsDropdownVisible2}
              style={{ marginTop: RFPercentage(3) }}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtonWrapper}>
          <CustomButton title="Save And Next" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default GuidedPlay;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  stepBarContainer: { flexDirection: 'row', alignItems: 'center' },
  stepBar: {
    width: RFPercentage(6.5),
    height: RFPercentage(0.7),
    borderRadius: RFPercentage(100),
  },
  sectionHeader: { marginTop: RFPercentage(3) },
  eventTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(2.5),
    fontFamily: FONTS.headline,
  },
  eventSubtitle: {
    color: COLORS.lightGrey,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.regular,
    marginTop: RFPercentage(2.5),
  },
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
  sectionTitle: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.medium,
    marginTop: RFPercentage(2),
  },
  badgeWrapper: {
    marginTop: RFPercentage(1.5),
    flexDirection: 'row',
  },
  uploadIcon: { width: RFPercentage(8), height: RFPercentage(8) },
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
  changeImageWrapper: { alignItems: 'center', bottom: RFPercentage(2.5) },
   badgeText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.6),
    fontFamily: FONTS.medium,
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
  changeImageIcon: { width: RFPercentage(1.6), height: RFPercentage(1.6) },
  changeImageText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    marginLeft: RFPercentage(0.6),
  },
  bioWrapper: { marginTop: RFPercentage(2) },
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
  bioIcon: { width: RFPercentage(1.5), height: RFPercentage(1.5) },
  locationIcon: { width: RFPercentage(2.5), height: RFPercentage(2.5) },
  dateIcon: { width: RFPercentage(2), height: RFPercentage(2) },
  checkWrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: RFPercentage(2),
  },
  checkIcon: { width: RFPercentage(3), height: RFPercentage(3) },
  business: {
    color: COLORS.inputColor,
    fontSize: RFPercentage(1.9),
    fontFamily: FONTS.regular,
    marginLeft: RFPercentage(1),
  },
  footer: {
    width: '100%',
    borderTopWidth: RFPercentage(0.1),
    borderTopColor: COLORS.lightWhite,
    paddingTop: RFPercentage(2),
    paddingBottom: RFPercentage(4),
  },
  footerButtonWrapper: { width: '90%', alignSelf: 'center' },
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
});
