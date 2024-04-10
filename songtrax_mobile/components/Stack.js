import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LocationSongs from 'songtrax_mobile/screens/nearme.js';
import PlayMusic from 'songtrax_mobile/screens/playmusic.js';

const Stack = createStackNavigator();

export const SongsStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'nearby_songs'}
                component={LocationSongs} />
            <Stack.Screen name={'song_detail'}
                component={PlayMusic} />
        </Stack.Navigator>
    )
}

export default SongsStack