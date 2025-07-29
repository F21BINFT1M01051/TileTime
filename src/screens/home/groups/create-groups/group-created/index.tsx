import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../../../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../../../components/CustomButton';

const GroupCreated = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerBorder}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <AntDesign
              name="arrowleft"
              color={COLORS.grey}
              size={RFPercentage(3)}
            />
          </TouchableOpacity>
          <View style={styles.groupIconContainer}>
            <Image
              source={ICONS.group}
              resizeMode="contain"
              style={styles.groupIcon}
            />
          </View>
          <Text style={styles.groupNameText}>
            Mahjong - Richie Rich Group
          </Text>
          <TouchableOpacity style={styles.dotsButton}>
            <Entypo
              name="dots-three-vertical"
              size={RFPercentage(3)}
              color={COLORS.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ImageBackground
          source={IMAGES.chat}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.todayBadge}>
            <Text style={styles.todayText}>
              Today
            </Text>
          </View>
          <View style={styles.groupInfoCard}>
            <View style={styles.largeGroupIconContainer}>
              <Image
                source={ICONS.group}
                resizeMode="contain"
                style={styles.largeGroupIcon}
              />
            </View>
            <Text style={styles.createdText}>
              You created this group
            </Text>
            <Text style={styles.membersText}>
              Group - 2 members
            </Text>

            <View style={styles.buttonContainer}>
              <CustomButton title="Add members"  onPress={()=> {}}/>
            </View>
            <View style={styles.secondButtonContainer}>
              <CustomButton title="Share group Link" onPress={()=> {}} />
            </View>
          </View>

          <View style={styles.conversationPrompt}>
            <Text style={styles.conversationText}>
              Start a conversation, ask a question, or just say hi.
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.messageInputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.plusIcon}>
            +
          </Text>
          <TextInput
            placeholder="Type your message here"
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Image
              source={ICONS.send}
              resizeMode="contain"
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GroupCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: COLORS.white
  },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2.5),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(4),
  },
  groupIconContainer: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(2),
  },
  groupIcon: {
    width: RFPercentage(5.5),
    height: RFPercentage(5.5),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
  },
  groupNameText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(1),
  },
  dotsButton: {
    position: 'absolute', 
    right: 0
  },
  imageBackground: {
    width: '100%', 
    height: '100%'
  },
  todayBadge: {
    alignSelf: 'center',
    width: RFPercentage(10),
    height: RFPercentage(3.8),
    backgroundColor: COLORS.offWhite,
    borderRadius: RFPercentage(0.7),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
  },
  groupInfoCard: {
    width: '90%',
    padding: RFPercentage(3),
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    alignSelf: 'center',
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(3),
  },
  largeGroupIconContainer: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: RFPercentage(2),
  },
  largeGroupIcon: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    borderTopRightRadius: RFPercentage(100),
    borderTopLeftRadius: RFPercentage(100),
    borderBottomRightRadius: RFPercentage(100),
    right: RFPercentage(0.5),
  },
  createdText: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(1.9),
    textAlign: 'center',
    marginTop: RFPercentage(1.8),
  },
  membersText: {
    color: COLORS.grey4,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    textAlign: 'center',
    marginTop: RFPercentage(0.6),
  },
  buttonContainer: {
    width: '100%', 
    marginTop: RFPercentage(4)
  },
  secondButtonContainer: {
    width: '100%', 
    marginTop: RFPercentage(1)
  },
  conversationPrompt: {
    alignSelf: 'center',
    height: RFPercentage(7),
    backgroundColor: COLORS.offWhite,
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(3),
    alignItems: 'center',
    justifyContent: 'center',
    width: RFPercentage(28)
  },
  conversationText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.8),
    textAlign: 'center'
  },
  messageInputContainer: {
    position: 'absolute',
    bottom: 0,
    height: RFPercentage(13),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  inputWrapper: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: COLORS.fieldColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RFPercentage(100),
    paddingHorizontal: RFPercentage(2),
    height: RFPercentage(6),
  },
  plusIcon: {
    color: COLORS.placeholder,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(3),
  },
  textInput: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    width: '90%',
  },
  sendButton: {
    position: 'absolute', 
    right: RFPercentage(2)
  },
  sendIcon: {
    width: RFPercentage(2.6), 
    height: RFPercentage(2.6)
  },
});