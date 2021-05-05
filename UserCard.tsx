import React from 'react';
import {StyleSheet, View, Text, Image, Pressable, Animated} from 'react-native';
import Layouts from './constants/Layouts';
import Swipeable from 'react-native-gesture-handler/Swipeable';

interface UserCardProps {
  user: {
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
  };
  isEditing: boolean;
  deleteUser: (val: number) => void;
}

const RightActions = ({progress, dragX, onPress}) => {
  const scale = dragX.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <Pressable onPress={onPress} style={styles.RightActions}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
          Delete
        </Animated.Text>
      </View>
    </Pressable>
  );
};

const UserCard: React.FC<UserCardProps> = ({user, isEditing, deleteUser}) => {
  return (
    <Swipeable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={() => deleteUser(user.id)}
        />
      )}>
      <View
        style={{
          width: '100%',
          height: Layouts['dim'](8, 'h'),
          flexDirection: 'row',
          paddingHorizontal: Layouts['dim'](6, 'w'),
        }}>
        {isEditing && <View style={{flex: 0.2}}></View>}
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: user.avatar,
              cache: 'force-cache',
            }}
            style={{
              width: Layouts['dim'](5, 'h'),
              height: Layouts['dim'](5, 'h'),
              borderRadius: 12,
            }}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{color: '#161312'}}>
            {user.last_name + ' ' + user.first_name}
          </Text>
          <Text style={{color: '#9EA1A8'}}>{user.email}</Text>
        </View>
        <View style={{flex: 0.3}}></View>
      </View>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  RightActions: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    paddingHorizontal: Layouts['dim'](5.33, 'w'),
    fontWeight: 'bold',
    fontSize: 14,
  },
});
export default UserCard;
