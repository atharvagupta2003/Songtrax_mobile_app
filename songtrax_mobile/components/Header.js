import { Appearance, Image, Text, View } from 'react-native'
import React from 'react'
import { colors } from './styles'
import icons from 'songtrax_mobile/data/icons.js';


const Header = () => {
    const { getColorScheme } = Appearance
    const theme = getColorScheme()
    return (
        <View style={{
            marginBottom: 24,
            flexDirection: 'row',
            marginHorizontal: 24,
            justifyContent: 'space-between', alignItems: 'center', marginVertical: 16
        }}>
            <Image
                resizeMode='contain'
                source={theme == 'dark' ? require(icons.pinlight) : require(icons.pindark)}
                style={{ height: 55, width: 55 }}
            />
            <Text style={{
                fontSize: 30,
                fontWeight: "bold",
                color: colors[theme].fgColor,
            }}>UQ Lakes</Text>
        </View>
    )
}

export default Header