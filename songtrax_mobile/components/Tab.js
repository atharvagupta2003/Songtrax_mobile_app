import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, PermissionsAndroid, Platform, Text, TouchableOpacity, View } from 'react-native';
import { colors } from 'songtrax_mobile/data/styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import PlayMusic from 'songtrax_mobile/screens/playmusic.js';
import ShowMap from 'songtrax_mobile/components/MapView.js';
import icons from 'songtrax_mobile/data/icons.js';
import { useMapContext } from 'songtrax_mobile/components/MapContext.js';
import SongsStack from 'songtrax_mobile/components/Stack.js';
import PhotoPicker from 'songtrax_mobile/components/PhotoPicker.js';
import { getDistance } from 'geolib';
const Tab = createBottomTabNavigator();

function MyTabBar({ props }) {
    const { state, descriptors, navigation } = props
    return (
        <View style={{
            backgroundColor: 'transparent',
            // borderTopWidth: ShowGradient ? 0 : .5,
            borderTopColor: '#e9e9e9',
            position: 'absolute',
            bottom: 0, right: 0, left: 0,
        }}>
            <LinearGradient colors={[colors.purpleColorLighter, colors.blueColorDarker]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    height: 60,
                    paddingHorizontal: 26
                }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: index == 1 ? 5 : 1, alignItems: 'center' }}
                        >
                            <View style={{ alignItems: 'center', opacity: isFocused ? 1 : index == 1 ? 1 : .4, justifyContent: 'center', backgroundColor: isFocused ? '#00000090' : 'transparent', width: index == 1 ? 200 : 60, height: '100%' }}>
                                {index == 1 &&
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Image style={{ height: 24, width: 150 }} resizeMode='contain'
                                            source={require('songtrax_mobile/AppIcons/logo-white.png')} />
                                         <Text style={{ color: 'white' }}>There is music Nearby</Text>
                                    </View>
                                }
                                {index == 0 && <Image style={{ height: 30, width: 30 }}
                                    source={require('songtrax_mobile/AppIcons/tab-map-white.png')} />}
                                {index == 2 && <Image style={{ height: 30, width: 30 }}
                                    source={require('songtrax_mobile/AppIcons/tab-profile-white.png')} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </LinearGradient>
        </View>
    );
}

export function TabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={props => <MyTabBar props={props} />}
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                }}>
                <Tab.Screen name="map" component={ShowMap} />
                <Tab.Screen name="songs_stack" component={SongsStack} />
                <Tab.Screen name="profile" component={PhotoPicker} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
