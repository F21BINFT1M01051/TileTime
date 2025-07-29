import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../config/theme';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  placeholder: string;
  data: string[];
  selectedValue: string | null;
  onValueChange: (value: string) => void;
  isDropdownVisible: boolean;
  setIsDropdownVisible: (visible: boolean) => void;
  style?: object;
}

const DropdownField: React.FC<Props> = ({
  placeholder,
  data,
  selectedValue,
  onValueChange,
  isDropdownVisible,
  setIsDropdownVisible,
  style,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const animatedIsFocused = useRef(
    new Animated.Value(selectedValue ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || selectedValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectedValue]);

  useEffect(() => {
    if (!isDropdownVisible && !selectedValue) {
      setIsFocused(false);
    }
  }, [isDropdownVisible, selectedValue]);

  const toggleDropdown = () => {
    setIsFocused(true);
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (item: string) => {
    onValueChange(item);
    setIsDropdownVisible(false);
    setIsFocused(false);
  };

  const labelStyle = {
    position: 'absolute' as const,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, RFPercentage(-1.3)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(1.8), RFPercentage(1.5)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.placeholder, COLORS.focused],
    }),
    fontFamily: isFocused || selectedValue ? FONTS.medium2 : FONTS.regular,
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          style,
          isDropdownVisible && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}
          activeOpacity={0.8}
        >
          <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
          <Text
            style={[
              styles.selectedText,
              {
                fontFamily: selectedValue ? FONTS.medium2 : FONTS.regular,
                color: selectedValue ? COLORS.inputColor : COLORS.placeholder,
              },
            ]}
          >
            {selectedValue || ''}
          </Text>

          <Feather
            name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
            size={RFPercentage(2.4)}
            color={COLORS.placeholder}
          />
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => {
              const isLastItem = index === data.length - 1;
              return (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    isLastItem && { borderBottomWidth: 0 },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.regular,
                      color: COLORS.inputColor,
                      fontSize: RFPercentage(1.7),
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default DropdownField;

const styles = StyleSheet.create({
  container: {
    borderWidth: RFPercentage(0.1),
    width: '100%',
    height: RFPercentage(7),
    backgroundColor: COLORS.fieldColor,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.3),
    marginTop: RFPercentage(2),
    justifyContent: 'center',
   
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  selectedText: {
    fontSize: RFPercentage(1.9),
    top: RFPercentage(1),
  },
  dropdownList: {
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.fieldBorder,
    borderBottomRightRadius: RFPercentage(1.2),
    borderBottomLeftRadius: RFPercentage(1.2),
    backgroundColor: COLORS.fieldColor,
    maxHeight: RFPercentage(25),
    borderTopWidth: 0,
    zIndex: 999999,
  },
  dropdownItem: {
    paddingVertical: RFPercentage(1.8),
    paddingHorizontal: RFPercentage(2),
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.dropDown,
  },
});
