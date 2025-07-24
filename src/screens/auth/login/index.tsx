import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, ICONS, IMAGES } from '../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-paper';
import CustomButton from '../../../components/CustomButton';

const Login = ({ navigation }: any) => {
  const [text, setText] = React.useState('');

  return (
    <LinearGradient
      colors={[COLORS.gradient1, COLORS.gradient2]}
      style={styles.gradient}
    >
      <View style={styles.logoContainer}>
        <Image source={IMAGES.logo} resizeMode="contain" style={styles.logo} />

        <Image
          source={IMAGES.headline}
          resizeMode="contain"
          style={styles.headlineImage}
        />
      </View>

      <View style={styles.whiteContainer}>
        <View style={styles.contentWrapper}>
          <Text style={styles.getStartedText}>Log In Now</Text>
          <View style={{ marginTop: RFPercentage(3) }}>
            <TextInput
              label="Email Address"
              value={text}
              onChangeText={text => setText(text)}
              contentStyle={{
                backgroundColor: COLORS.fieldColor,
                // borderWidth: 1,
                // borderColor: COLORS.fieldBorder,
                // borderRadius: RFPercentage(2),
              }}
              activeUnderlineColor={COLORS.fieldBorder}
              activeOutlineColor={COLORS.fieldBorder}
              textColor={COLORS.inputColor}
              cursorColor={COLORS.inputColor}
              mode="flat"
              style={{
                height: RFPercentage(8),
                backgroundColor: 'transparent',
              }}
            />
          </View>
          <View style={{ marginTop: RFPercentage(2.5) }}>
            <TextInput
              label="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
              contentStyle={{
                backgroundColor: COLORS.fieldColor,
              }}
              activeUnderlineColor={COLORS.fieldBorder}
              activeOutlineColor={COLORS.fieldBorder}
              textColor={COLORS.inputColor}
              cursorColor={COLORS.inputColor}
              style={{
                height: RFPercentage(8),
                backgroundColor: COLORS.fieldColor,
              }}
            />
          </View>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <Text
              style={{
                fontFamily: FONTS.regular,
                marginTop: RFPercentage(0.5),
                color: '#8C8C8C',
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View style={{ width: '100%', marginTop: RFPercentage(14) }}>
            <CustomButton
              title="Log Me In"
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: RFPercentage(5),
            }}
          >
            <Text style={{ fontFamily: FONTS.regular2, color: '#8C8C8C' }}>
              Don’t Have An Account?
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: FONTS.semiBold2,
                  color: COLORS.primary,
                  left: RFPercentage(0.4),
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: FONTS.regular2,
              color: '#8C8C8C',
              textAlign: 'center',
              marginTop: RFPercentage(1.3),
            }}
          >
            Privacy & Terms
          </Text>
          <Text
            style={{
              fontFamily: FONTS.regular2,
              color: '#8C8C8C',
              textAlign: 'center',
              marginTop: RFPercentage(1.3),
            }}
          >
            Contact Us
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: RFPercentage(6),
  },
  logo: {
    width: RFPercentage(10),
    height: RFPercentage(10),
  },

  headlineImage: {
    width: RFPercentage(50),
    height: RFPercentage(10),
    marginTop: RFPercentage(1),
  },
  whiteContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopRightRadius: RFPercentage(2.5),
    borderTopLeftRadius: RFPercentage(2.5),
    alignItems: 'center',
    marginTop: RFPercentage(4),
    paddingBottom: RFPercentage(5),
    height: '100%',
  },
  contentWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(3.5),
  },
  getStartedText: {
    color: COLORS.primary,
    fontFamily: FONTS.headline,
    fontSize: RFPercentage(2.8),
  },
  listContainer: {
    width: '100%',
    marginTop: RFPercentage(1),
  },
  skipButton: {
    width: RFPercentage(20),
    alignSelf: 'center',
    marginTop: RFPercentage(6),
  },
  skipText: {
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: RFPercentage(2),
  },
});
