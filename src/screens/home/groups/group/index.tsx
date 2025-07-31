import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SearchField from '../../../../components/SearchField';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS, FONTS } from '../../../../config/theme';

const Filters = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Unread 4',
  },
  {
    id: 3,
    name: 'Managed By Me',
  },
];

const Group = () => {
  const [activeFilter, setActiveFilter] = useState(1);

  return (
    <View style={{ width: '100%' }}>
      <SearchField placeholder="Search groups" />
      <FlatList
        data={Filters}
        keyExtractor={item => item.id.toString()}
        horizontal
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveFilter(item.id)}
              style={{
                height: RFPercentage(5),
                paddingHorizontal: RFPercentage(2),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: RFPercentage(2.3),
                backgroundColor:
                  activeFilter === item.id ? '#1D211E' : '#F2F2F2',
                marginTop: RFPercentage(3),
                marginRight: RFPercentage(1),
              }}
            >
              <Text
                style={{
                  color: activeFilter === item.id ? COLORS.white : '#696B74',
                  fontFamily: FONTS.medium,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Group;
