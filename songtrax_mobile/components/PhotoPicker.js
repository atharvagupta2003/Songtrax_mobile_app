import React, { useState } from "react";
import { Appearance, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View, Image, Dimensions, useWindowDimensions, Text, Button, TextInput, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { colors } from 'songtrax_mobile/data/styles.js';

// Get the screen width and height for styling
const { width, height } = Dimensions.get("window");

// Define the styles for the components
const styles = {
    container: {
        padding: 20
    },
    photoFullView: {
        marginBottom: 20
    },
    photoEmptyView: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#999",
        borderStyle: "dashed",
        width: "100%",
        height: height / 1.5,
        marginBottom: 5
    },
    photoFullImage: {
        width: "100%",
        height: height / 1.5,
        borderRadius: 10,
        marginBottom: 0
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-around"
    }
};

// Main App component
export default function PhotoPicker() {
    const { getColorScheme } = Appearance
    const theme = getColorScheme()
    const { height } = useWindowDimensions()
    // State to hold the photo details
    const [photoState, setPhotoState] = useState({});

    // Function to handle photo selection using the Image Picker
    async function handleChangePress() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // If the user didn't cancel and an image is selected, update the state
        if (!result.canceled && result.assets && result.assets.length > 0) {
            setPhotoState(result.assets[0]);
        }
    }

    // Function to remove the selected photo
    async function handleRemovePress() {
        setPhotoState({});
    }

    // Check if a photo has been selected
    const hasPhoto = Boolean(photoState.uri);

    // Component to display the selected photo or a placeholder
    function Photo(props) {
        if (hasPhoto) {
            return (
                <View style={styles.photoFullView}>
                    <Image
                        style={styles.photoFullImage}
                        resizeMode="cover"
                        source={{ uri: photoState.uri }}
                    />
                </View>
            );
        } else {
            return <View style={styles.photoEmptyView} />;
        }
    }

    // Main render of the App component
    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            paddingHorizontal: '5%',
            paddingVertical: 12,
            backgroundColor: colors[theme].bgColor
        }} >
          <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView>
                    <Text style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: colors[theme].fgColor,
                    }}>Edit Profile</Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: colors[theme].fgColor,
                    }}>Mirror, Mirror On The Wall...</Text>

            <View style={styles.container}>
                <Photo />
                <View style={{
                   marginTop: 10,
                   borderWidth: photoState ? 0 : 2,
                   borderRadius: 10,
                   borderColor: colors[theme].fgColorLighter,
                   borderStyle: "dashed",
                   height: height / 1.85
                   }}>
                   <TouchableOpacity
                       style={{
                           backgroundColor: colors[theme].fgColor,
                           color: colors[theme].bgColor,
                           fontWeight: "bold",
                           padding: 10,
                           borderRadius: 10,
                           textAlign: "center",
                           width: "50%",
                           marginLeft: "25%",
                           marginTop: -72,
                       }}
                           onPress={handleChangePress}
                       >
                       <Text style={{ color: colors[theme].bgColor }}>
                           {hasPhoto ? "      Change Photo" : "         Add Photo"}
                       </Text>
                   </TouchableOpacity>
                   {hasPhoto && (
                       <TouchableOpacity
                           style={{
                               backgroundColor: colors[theme].fgColor,
                                color: colors[theme].bgColor,
                                fontWeight: "bold",
                                padding: 10,
                                borderRadius: 10,
                                textAlign: "center",
                                width: "50%",
                                marginLeft: "25%",
                                marginTop: 10, // Adjust as needed
                           }}
                                onPress={handleRemovePress}
                           >
                           <Text style={{ color: colors[theme].bgColor }}>
                                {"     Remove Photo"}
                           </Text>
                       </TouchableOpacity>
                   )}
                   <TextInput
                       style={{
                          marginTop: 20,
                          backgroundColor: colors[theme].fgColorLighter,
                          color: colors[theme].fgColor,
                          borderRadius: 5,
                          textAlign: "center",
                          height: 40,
                          marginBottom: 100
                          }}
                          placeholder='Enter Name'
                   />
                </View>
            </View>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
    );
}

