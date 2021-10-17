import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { launchCamera, launchImageLibrary, CameraOptions } from 'react-native-image-picker';


const ImportActivity = () => {
    const parseImg = (response: any) => {
        let didCancel = response.didCancel;
        let errorCode = response.errorCode;
        let errorMessage = response.errorMessage;
        let assets = response.assets;

        return (
            <Text>{didCancel}</Text>
        );
    };
    const getImg = () => {

        let options: CameraOptions = {
            mediaType: 'photo',
            cameraType: 'back',
            saveToPhotos: false
        };

        launchCamera(options, parseImg);
    };

    return (
        <View>
            {getImg()}
        </View>
    );
};

export default ImportActivity;
