import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Keyboard,
  Image,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { COLORS, FONTS, ICONS } from '../config/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  data: string[];
}

const Search = ({ placeholder, value, onChangeText, data }: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const inputRef = React.useRef<TextInput>(null);

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(value.toLowerCase()),
  );

  const handleSelect = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
    onChangeText('');
    setShowDropdown(false);
    requestAnimationFrame(() => {
      inputRef.current?.blur();
    });
  };

  const removeItem = (itemToRemove: string) => {
    setSelectedItems(selectedItems.filter(item => item !== itemToRemove));
  };

  return (
    <View style={{ width: '100%', position: 'relative' }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: COLORS.white,
            borderColor: showDropdown ? COLORS.pink : COLORS.fieldBorder,
          },
        ]}
      >
        <View style={styles.inputContainer}>
          <TextInput
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholder}
            style={styles.textInput}
            value={value || ''}
            onFocus={() => setShowDropdown(true)}
            onChangeText={text => {
              onChangeText(text);
              if (text.length > 0) {
                setShowDropdown(true);
              } else {
                setShowDropdown(false);
              }
            }}
          />
          <Feather
            name="search"
            color={COLORS.search}
            size={RFPercentage(2.8)}
          />
        </View>
      </View>

      {/*  Dropdown Shown ABOVE selected items */}
      {showDropdown && value.length > 0 && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={filteredData}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const isLastItem =
                index === filteredData.length - 1 &&
                (filteredData.includes(value) || value.length === 0);
              return (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    isLastItem ? { borderBottomWidth: 0 } : null,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={
              value.length > 0 && !filteredData.includes(value) ? (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    {
                      borderBottomWidth: 0,
                      flexDirection: 'row',
                      alignItems: 'center',
                    },
                  ]}
                  onPress={() => handleSelect(value)}
                >
                  <Image
                    source={ICONS.plus}
                    tintColor={COLORS.primary}
                    resizeMode="contain"
                    style={{ width: RFPercentage(2), height: RFPercentage(2) }}
                  />
                  <Text
                    style={[
                      styles.dropdownText,
                      {
                        fontFamily: FONTS.semiBold,
                        color: COLORS.primary,
                      },
                    ]}
                  >
                    Add {value}
                  </Text>
                </TouchableOpacity>
              ) : null
            }
          />
        </View>
      )}

      {/* Selected Items shown BELOW dropdown */}
      {selectedItems.length > 0 && (
        <View style={styles.selectedItemsContainer}>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.selectedItem}>
              <Text style={styles.selectedText}>{item}</Text>
              <TouchableOpacity onPress={() => removeItem(item)}>
                <Image
                  source={ICONS.cross}
                  resizeMode="contain"
                  style={{
                    width: RFPercentage(2.5),
                    height: RFPercentage(2.5),
                  }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    borderWidth: RFPercentage(0.1),
    width: '100%',
    height: RFPercentage(7),
    borderRadius: RFPercentage(1.3),
    justifyContent: 'center',
    zIndex: 1,
  },
  inputContainer: {
    width: '92%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    width: '90%',
    fontSize: RFPercentage(1.8),
    lineHeight: RFPercentage(2),
  },
  dropdownContainer: {
    position: 'absolute',
    top: RFPercentage(7) + RFPercentage(1), // input height + margin
    left: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(1.7),
    borderColor: COLORS.fieldBorder,
    borderWidth: RFPercentage(0.1),
    maxHeight: RFPercentage(25),
    zIndex: 999, // Ensure it appears above selected items
    paddingVertical: RFPercentage(1),
  },

  dropdownItem: {
    borderBottomWidth: RFPercentage(0.1),
    borderBottomColor: COLORS.fieldBorder,
    marginHorizontal: RFPercentage(2),
  },
  dropdownText: {
    color: COLORS.inputColor,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.8),
    marginVertical: RFPercentage(1.6),
    left: RFPercentage(1),
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: RFPercentage(1.5),
    rowGap: RFPercentage(1),
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: RFPercentage(100),
    paddingHorizontal: RFPercentage(2),
    marginRight: RFPercentage(1),
    height: RFPercentage(4.3),
    justifyContent: 'space-between',
  },
  selectedText: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
    fontSize: RFPercentage(1.7),
    marginRight: RFPercentage(0.8),
  },
});
