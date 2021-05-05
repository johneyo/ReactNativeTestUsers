import React, {useRef, useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  ActivityIndicator,
  Easing,
  SectionList,
  Dimensions,
  Pressable,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Touchable from 'react-native-platform-touchable';
import {useDispatch, useSelector} from 'react-redux';
import {wait} from './components/funtions';
import Layout from './constants/Layouts';
import {getUsers, getMoreUsers, GET_USERS, DELETE_USER} from './redux/actions';
import UserCard from './UserCard';
const {width} = Dimensions.get('window');
interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [fetching, setFetching] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [Users, setUsers] = useState<
    Array<{
      title: string;
      data: {
        avatar: string;
        email: string;
        first_name: string;
        id: number;
        last_name: string;
      }[];
    }>
  >([]);
  const pulse = useRef(new Animated.Value(0));
  const dispatch = useDispatch();
  const HeartbeatAnimation = (
    value: Animated.Value,
    minValue: number,
    maxValue: number,
  ) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: maxValue,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: minValue,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

  const spinValue = useRef(new Animated.Value(0));
  // const spinner = (value: Animated.Value) =>
  Animated.loop(
    Animated.timing(spinValue.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    HeartbeatAnimation(pulse.current, 0.8, 1).start();
    return () => {
      HeartbeatAnimation(pulse.current, 0.8, 1).stop();
    };
  }, []);
  const loadingProgress = useRef(new Animated.Value(0));
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    isFetched &&
      Animated.timing(loadingProgress.current, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        setAnimationDone(true);
      });
  }, [isFetched]);

  const scaleOnComplete = loadingProgress.current.interpolate({
    inputRange: [0, 3],
    outputRange: [1, 0.99],
  });

  const page: number = useSelector(
    (state: {
      user: {
        page: number;
      };
    }) => state.user.page,
  );
  const users: Array<{
    avatar: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
  }> = useSelector(
    (state: {
      user: {
        Users: Array<{
          avatar: string;
          email: string;
          first_name: string;
          id: number;
          last_name: string;
        }>;
      };
    }) => state.user.Users,
  );
  useEffect(() => {
    if (users && users.length > 0) {
      let newUsers = users.reduce((r: any, e) => {
        let title = e.last_name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[title]) r[title] = {title, data: [e]};
        // if there is push current element to children array for that letter
        else r[title].data.push(e);
        // return accumulator
        return r;
      }, {});

      setUsers(Object.values(newUsers));
    }
  }, [users]);

  const fetchUsers = () => {
    dispatch({
      type: GET_USERS,
      payload: [],
    });
    setAnimationDone(false);
    setIsFetched(false);
    setFetching(true);
    wait(5000).then(() =>
      dispatch(getUsers(() => (setFetching(false), setIsFetched(true)))),
    );
  };
  const scaleFunc = () =>
    isFetched
      ? scaleOnComplete
      : !fetching
      ? pulse.current
      : new Animated.Value(0);

  const imageScale = [
    {
      scale: scaleFunc(),
    },
  ];

  const imageSpin = [
    {
      rotate: spin,
    },
  ];

  return (
    <View style={styles.root}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <View
            style={{
              height: Layout['dim'](30, 'h'),
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                paddingHorizontal: Layout['dim'](8, 'w'),
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <View>
                <Text style={{color: '#9EA1A8', fontWeight: 'bold'}}>
                  {users.length} Users
                </Text>
                <Text style={{color: '#161312', fontSize: 24}}>
                  React Test Users
                </Text>
                <Text
                  style={{color: '#9EA1A8', fontSize: 10, fontWeight: 'bold'}}>
                  TIP: Swipe to delete
                </Text>
              </View>
              {Users && Users.length > 0 && (
                <View>
                  {fetching || fetchingMore ? (
                    <ActivityIndicator color="#1961c0" />
                  ) : (
                    <Pressable onPress={() => !fetching && fetchUsers()}>
                      <Text style={{color: '#1961c0', fontWeight: 'bold'}}>
                        Refresh
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#f7f8fa',
                  width: Layout['dim'](80, 'w'),
                  height: Layout['dim'](5, 'h'),
                  borderRadius: 14,
                }}>
                <View />
                <TextInput />
                <View />
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            {animationDone && !fetching ? (
              <Fragment>
                <SectionList
                  stickySectionHeadersEnabled
                  showsVerticalScrollIndicator={false}
                  refreshing={fetching}
                  keyExtractor={(item) => item.id.toString()}
                  sections={
                    Users.sort((a, b) => (a.title > b.title ? 1 : -1)) ?? []
                  }
                  contentContainerStyle={{paddingTop: 50}}
                  onEndReached={() => (
                    console.log('fetching more'),
                    setFetchingMore(true),
                    wait(3000).then(() =>
                      dispatch(
                        getMoreUsers(page + 1, () => setFetchingMore(false)),
                      ),
                    )
                  )}
                  onEndReachedThreshold={0.01}
                  ListEmptyComponent={() => <Text>No Component</Text>}
                  renderItem={({item}) => (
                    <UserCard
                      user={item}
                      isEditing={isEditing}
                      deleteUser={(userId) =>
                        dispatch({
                          type: DELETE_USER,
                          payload: userId,
                        })
                      }
                    />
                  )}
                  renderSectionHeader={({section: {title}}) => (
                    <View
                      style={{
                        height: Layout['dim'](4, 'h'),
                        width,
                        paddingHorizontal: Layout['dim'](7, 'w'),
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          backgroundColor: '#ffda1a',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#161312',
                            fontSize: 12,
                          }}>
                          {title}
                        </Text>
                      </View>
                    </View>
                  )}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    width: '100%',
                    height: Layout['dim'](10, 'h'),
                  }}></View>
              </Fragment>
            ) : (
              <Touchable
                style={{
                  transform: [{rotate: '45deg'}],
                  borderRadius: Layout['dim'](21.25, 'w'),
                }}
                onPress={() => fetchUsers()}>
                <Animated.View
                  style={{
                    transform: fetching && !isFetched ? imageSpin : imageScale,
                    backgroundColor: isFetched ? '#ffda1a' : '#14171a',
                    width: Layout['dim'](30, 'w'),
                    height: Layout['dim'](30, 'w'),
                    borderRadius: Layout['dim'](15, 'w'),
                    borderTopColor: '#fff',
                    borderWidth: 5,
                    borderColor: isFetched ? '#ffda1a' : '#14171a',
                    shadowColor: 'grey',
                    shadowOffset: {width: 1, height: 4},
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    elevation: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      transform: [{rotate: '-45deg'}],
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: '#fff'}}>
                      {fetching
                        ? ''
                        : isFetched
                        ? 'Users Fetched'
                        : 'Fetch Users'}
                    </Text>
                  </View>
                </Animated.View>
              </Touchable>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
});
export default Home;
