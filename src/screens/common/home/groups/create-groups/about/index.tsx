import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import { COLORS, FONTS, ICONS } from '../../../../../../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { launchImageLibrary } from 'react-native-image-picker';
import InputField from '../../../../../../components/InputField';
import * as yup from 'yup';
import { Formik } from 'formik';

export interface AboutFormRef {
  validateForm: () => Promise<any>;
  submitForm: () => void;
}

interface AboutProps {
  setFormValid?: (valid: boolean) => void;
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Group Name is required'),
});

const About = forwardRef<AboutFormRef, AboutProps>(({ setFormValid }, ref) => {
  const [imageUri, setImageUri] = useState(null);
  const formikRef = useRef<any>(null);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response?.assets[0].uri);
      }
    });
  };

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      if (formikRef.current) {
        formikRef.current.setTouched({
          name: true,
        });
        return formikRef.current.validateForm();
      }
      return Promise.resolve();
    },
    submitForm: () => {
      if (formikRef.current) {
        formikRef.current.handleSubmit();
      }
    },
  }));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Tell us about your group</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={pickImage}
          style={styles.profileContainer}
        >
          <View style={styles.profileCircle}>
            <Image
              source={imageUri ? { uri: imageUri } : ICONS.gallery}
              resizeMode="cover"
              style={imageUri ? styles.profileImage : styles.defaultImg}
            />

            {imageUri ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={styles.editIconContainer}
              >
                <Image
                  source={ICONS.edit}
                  resizeMode="contain"
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={pickImage}
                style={styles.addPicButton}
              >
                <Text style={styles.addPicText}>Add Group Picture</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        <Formik
          innerRef={formikRef}
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={values => {}}
          validateOnBlur
          validateOnChange
        >
          {({ handleChange, handleBlur, values, errors, touched, isValid }) => {
            useEffect(() => {
              if (setFormValid) {
                setFormValid(values.name.trim() !== '' && !errors.name);
              }
            }, [values.name, errors.name]);

            return (
              <>
                <View style={styles.inputWrapper}>
                  <InputField
                    placeholder="Group Name"
                    onChangeText={handleChange('name')}
                    handleBlur={handleBlur('name')}
                    value={values.name}
                    password={false}
                    hasError={touched.name && errors.name ? true : false}
                    defaultColor={COLORS.placeholder}
                    focusedColor={COLORS.focused}
                    errorColor={COLORS.red}
                    style={{
                      borderColor:
                        touched.name && errors.name
                          ? COLORS.red
                          : COLORS.fieldBorder,
                    }}
                  />
                  {touched.name && errors.name && (
                    <View style={{ marginTop: RFPercentage(0.6) }}>
                      <Text style={styles.error}>{errors?.name}</Text>
                    </View>
                  )}
                </View>
              </>
            );
          }}
        </Formik>

        <View style={styles.bioWrapper}>
          <View style={styles.bioContainer}>
            <View style={styles.bioInputWrapper}>
              <TextInput
                placeholder="Group Description"
                placeholderTextColor={COLORS.placeholder}
                style={styles.bioInput}
                multiline={true}
                maxLength={170}
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
      </View>
    </TouchableWithoutFeedback>
  );
});

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.3),
  },
  profileContainer: {
    marginTop: RFPercentage(3),
    width: RFPercentage(16),
    alignItems: 'center',
  },
  profileCircle: {
    width: RFPercentage(15),
    height: RFPercentage(15),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.lightWhite3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: RFPercentage(14.8),
    height: RFPercentage(14.8),
    borderRadius: RFPercentage(100),
  },
  defaultImg: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: RFPercentage(-1.5),
  },
  editIcon: {
    width: RFPercentage(3.8),
    height: RFPercentage(3.8),
  },
  conduct: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.9),
  },
  addPicButton: {
    position: 'absolute',
    bottom: RFPercentage(-1),
    width: RFPercentage(16),
    height: RFPercentage(4),
    borderRadius: RFPercentage(100),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPicText: {
    color: COLORS.white,
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.4),
  },
  inputWrapper: {
    marginTop: RFPercentage(2),
  },
  bioWrapper: {
    marginTop: RFPercentage(3),
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
    height: RFPercentage(12),
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
  error: {
    color: COLORS.red,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.7),
  },
});
