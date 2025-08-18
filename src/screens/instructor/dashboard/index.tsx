import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS, ICONS } from '../../../config/theme';
import TopNavigation from '../../../routers/TopBar';
import { RFPercentage } from 'react-native-responsive-fontsize';
import ActionsCard from '../../../components/ActionsCard';
import Insights from '../../../components/Insights';
import SettingsButton from '../../../components/SettingsButton';

const dashboard = ['1'];
const InsightsData = [
  {
    id: 1,
    name: 'Total Earnings',
    subText: '$45.00k',
  },
  {
    id: 2,
    name: 'Total Students Taught',
    subText: '12',
  },
  {
    id: 3,
    name: 'Repeat Players',
    subText: '102',
  },
  {
    id: 4,
    name: 'New Players This Month',
    subText: '23%',
  },
  {
    id: 5,
    name: 'Total Events hosted',
    subText: '1,039',
  },
  {
    id: 6,
    name: 'Average RSVP count',
    subText: '23%',
  },
  {
    id: 7,
    name: 'Profile Views',
    subText: '679',
  },
  {
    id: 8,
    name: 'Event Views',
    subText: '1234',
  },
];

const data = [
  {
    id: 1,
    name: 'Create Event',
    icon: ICONS.hm1,
    color: COLORS.pink4,
  },
  {
    id: 2,
    name: 'Reschedule Event',
    icon: ICONS.schedule,
    color: COLORS.yellow2,
  },
  {
    id: 3,
    name: 'Create Group',
    icon: ICONS.hm2,
    color: COLORS.blue2,
  },
  {
    id: 4,
    name: 'Find Local Events',
    icon: ICONS.hm4,
    color: COLORS.green3,
  },
];

const Dashboard = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TopNavigation title="My Dashboard" noVector={true} />

        {/* Quick Actions */}
        {dashboard.length > 0 ? (
          <>
            <View style={styles.section}>
              <View style={styles.innerWrapper}>
                <Text style={styles.quickText}>Quick Actions</Text>
              </View>
              <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickListContent}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[
                        styles.quickCard,
                        { borderBottomColor: item.color },
                      ]}
                    >
                      <View style={styles.quickCardInner}>
                        <Image
                          source={item.icon}
                          resizeMode="contain"
                          style={styles.quickCardIcon}
                        />
                        <Image
                          source={ICONS.arrow55}
                          resizeMode="contain"
                          style={styles.quickArrow}
                        />
                        <Text style={styles.quickCardText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              {/* Insights */}
              <View style={styles.innerWrapper}>
                <View style={styles.insightsSection}>
                  <Text style={styles.quickText}>Insights</Text>
                  <FlatList
                    data={InsightsData}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.insightColumns}
                    renderItem={({ item }) => (
                      <View style={styles.insightCard}>
                        <Insights name={item.name} subText={item.subText} />
                      </View>
                    )}
                  />
                </View>
                <View style={styles.payoutsBtnWrap}>
                  <SettingsButton
                    title="Payouts"
                    icon={ICONS.arrow22}
                    onPress={() => navigation.navigate('PayoutsInstructor')}
                  />
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* Empty Content */}
            <View style={styles.innerWrapper}>
              <View style={styles.wrap}>
                <Text
                  style={styles.head}
                >{`The table's\nwaiting for you`}</Text>
                <Text style={styles.sub}>
                  Once you start hosting or joining sessions, your dashboard
                  will come alive.
                </Text>
                <Image
                  source={ICONS.border}
                  resizeMode="contain"
                  style={styles.borderImg}
                />
              </View>
              <View style={styles.actionsWrap}>
                <ActionsCard />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: RFPercentage(4),
  },
  section: {
    marginTop: RFPercentage(3),
  },
  innerWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  quickText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.8),
    fontFamily: FONTS.semiBold,
  },
  quickListContent: {
    paddingHorizontal: RFPercentage(2),
    marginTop: RFPercentage(2),
  },
  quickCard: {
    width: RFPercentage(18),
    height: RFPercentage(14),
    borderWidth: RFPercentage(0.1),
    borderColor: COLORS.lightWhite,
    borderBottomWidth: RFPercentage(0.5),
    paddingVertical: RFPercentage(1.7),
    borderRadius: RFPercentage(1.6),
    marginRight: RFPercentage(1.5),
  },
  quickCardInner: {
    width: '85%',
    alignSelf: 'center',
  },
  quickCardIcon: {
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  quickArrow: {
    width: RFPercentage(2.7),
    height: RFPercentage(2.7),
    position: 'absolute',
    right: 0,
    top: 0,
  },
  quickCardText: {
    color: COLORS.primary,
    fontSize: RFPercentage(1.7),
    fontFamily: FONTS.semiBold,
    top: RFPercentage(2.6),
  },
  insightsSection: {
    marginTop: RFPercentage(4),
  },
  insightColumns: {
    justifyContent: 'space-between',
    gap: RFPercentage(1.8),
    marginTop: RFPercentage(1.9),
  },
  insightCard: {
    flex: 1,
  },
  payoutsBtnWrap: {
    marginTop: RFPercentage(3.5),
  },
  wrap: {
    width: '100%',
    alignItems: 'center',
    marginTop: RFPercentage(5),
  },
  head: {
    fontFamily: FONTS.headline,
    color: COLORS.primary,
    fontSize: RFPercentage(2.6),
    textAlign: 'center',
  },
  sub: {
    color: COLORS.primary,
    fontFamily: FONTS.stylish,
    fontSize: RFPercentage(1.8),
    marginTop: RFPercentage(1.5),
    textAlign: 'center',
  },
  borderImg: {
    width: RFPercentage(10),
    height: RFPercentage(2),
    left: RFPercentage(8),
  },
  actionsWrap: {
    marginTop: RFPercentage(3),
  },
});
