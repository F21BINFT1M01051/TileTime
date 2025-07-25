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
}

const DropdownField: React.FC<Props> = ({ placeholder, data, selectedValue, onValueChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const animatedIsFocused = useRef(new Animated.Value(selectedValue ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || selectedValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFocused, selectedValue]);

  const labelStyle = {
    position: 'absolute' as const,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFPercentage(2.5), RFPercentage(1.1)],
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
    left: RFPercentage(2),
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
    setIsFocused(true);
  };

  const handleSelect = (item: string) => {
    onValueChange(item);
    setShowDropdown(false);
    setIsFocused(false);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          showDropdown && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>

        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={toggleDropdown}
          activeOpacity={0.8}
        >
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
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={RFPercentage(2.6)}
            color={COLORS.icon}
            style={{ bottom: RFPercentage(1) }}
          />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdownList}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
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
                  <Text style={{ fontFamily: FONTS.regular, color: COLORS.inputColor }}>
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
    borderWidth: 1,
    width: '100%',
    height: RFPercentage(8),
    backgroundColor: COLORS.fieldColor,
    borderColor: COLORS.fieldBorder,
    borderRadius: RFPercentage(1.5),
    marginTop: RFPercentage(2),
    paddingHorizontal: RFPercentage(2),
    justifyContent: 'center',
  },
  dropdownButton: {
    height: RFPercentage(6),
    top: RFPercentage(1.2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: RFPercentage(1.8),
    flex: 1,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: COLORS.fieldBorder,
    borderBottomRightRadius: RFPercentage(1.2),
    borderBottomLeftRadius: RFPercentage(1.2),
    backgroundColor: COLORS.fieldColor,
    maxHeight: RFPercentage(20),
    borderTopWidth: 0,
    zIndex:999999
  },
  dropdownItem: {
    paddingVertical: RFPercentage(1.8),
    paddingHorizontal: RFPercentage(2),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dropDown,
  },
});
