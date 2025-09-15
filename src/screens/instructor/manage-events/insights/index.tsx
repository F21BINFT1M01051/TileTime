import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS, FONTS } from '../../../../config/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Insights from '../../../../components/Insights';
import { ProgressBar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const InsightsData = [
  { id: 1, name: 'Total Earnings', subText: '$45.00k' },
  { id: 2, name: 'Total Students Taught', subText: '12' },
];

const InsightsData2 = [
  { id: 1, name: 'Total Earnings', subText: '$45.00k' },
  { id: 2, name: 'Total Students Taught', subText: '12' },
  { id: 3, name: 'Repeat Players', subText: '102' },
  { id: 4, name: 'New Players This Month', subText: '23%' },
];

const filterOptions = [
  'Overall',
  'This Week',
  'Last Week',
  'This Month',
  'Last Month',
  'Last 3 Months',
];

const EventInsights = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Time');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = item => {
    setSelectedFilter(item);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBorder}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.editButton}
          >
            <AntDesign
              name="arrowleft"
              color={COLORS.grey}
              size={RFPercentage(2.5)}
            />
            <Text style={styles.headerTitle}>Event Insights</Text>
          </TouchableOpacity>

          {/* Dropdown trigger */}
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dotsButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text style={styles.allTimeText}>{selectedFilter}</Text>
              <Feather
                name={showDropdown ? 'chevron-up' : 'chevron-down'}
                size={RFPercentage(1.6)}
                color={COLORS.green4}
              />
            </TouchableOpacity>

            {/* Dropdown menu */}
            {showDropdown && (
              <View style={styles.dropdownContainer}>
                {filterOptions.map((option, index) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={option}
                    style={[
                      styles.dropdownItem,
                      index !== filterOptions.length - 1 &&
                        styles.dropdownItemBorder,
                    ]}
                    onPress={() => handleSelect(option)}
                  >
                    <Text style={styles.dropdownText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView>
        <View style={styles.contentContainer}>
          <FlatList
            data={InsightsData}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.flatListColumn}
            renderItem={({ item }) => (
              <View style={styles.flexOne}>
                <Insights name={item.name} subText={item.subText} />
              </View>
            )}
          />

          <View style={styles.paymentCard}>
            <View style={styles.innerCard}>
              <Text style={styles.paymentTitle}>Payment Completion Rate</Text>
              <ProgressBar
                progress={0.4}
                color={COLORS.green}
                style={styles.progress}
                animatedValue={0.4}
              />
              <View style={styles.paymentRow}>
                <Text style={styles.paymentText}>26% Confirmed</Text>
                <Text style={styles.paymentText}>Dropped</Text>
              </View>
            </View>
          </View>

          <View style={styles.bottomList}>
            <FlatList
              data={InsightsData2}
              scrollEnabled={false}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.flatListColumn}
              renderItem={({ item }) => (
                <View style={styles.flexOne}>
                  <Insights name={item.name} subText={item.subText} />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventInsights;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.fieldBorder,
    paddingBottom: RFPercentage(2),
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(8),
    justifyContent: 'space-between',
  },
  editButton: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: RFPercentage(2),
    marginLeft: RFPercentage(1),
  },
  dotsButton: {
    height: RFPercentage(3.8),
    backgroundColor: '#E4F7F6',
    borderRadius: RFPercentage(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFPercentage(1.5),
  },
  allTimeText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.5),
    color: COLORS.primary,
    marginRight: RFPercentage(0.5),
  },
  dropdownContainer: {
    position: 'absolute',
    top: RFPercentage(5),
    right: RFPercentage(-1),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightWhite,
    borderRadius: RFPercentage(1),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    zIndex: 1000,
    width: RFPercentage(17),
  },
  dropdownItem: {
    paddingVertical: RFPercentage(1.5),
    paddingHorizontal: RFPercentage(2),
  },

  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightWhite,
  },
  dropdownText: {
    fontFamily: FONTS.medium,
    fontSize: RFPercentage(1.6),
    color: COLORS.primary,
    textAlign: 'center',
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: RFPercentage(2),
  },
  flatListColumn: {
    justifyContent: 'space-between',
    gap: RFPercentage(1.8),
    marginTop: RFPercentage(1.9),
  },
  flexOne: { flex: 1 },
  paymentCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: RFPercentage(2),
    height: RFPercentage(12),
    justifyContent: 'center',
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.4),
    marginTop: RFPercentage(2),
    borderBottomColor: 'rgba(230, 247, 250, 0.6)',
  },
  innerCard: { width: '90%', alignSelf: 'center' },
  paymentTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: RFPercentage(1.8),
  },
  progress: {
    width: '100%',
    height: RFPercentage(0.7),
    borderRadius: RFPercentage(100),
    marginTop: RFPercentage(1.8),
    backgroundColor: COLORS.red2,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(1.8),
  },
  paymentText: {
    color: COLORS.lightGrey,
    fontFamily: FONTS.regular,
    fontSize: RFPercentage(1.6),
  },
  bottomList: { marginTop: RFPercentage(0.5) },
});
