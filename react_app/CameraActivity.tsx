import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { ImagePickerResponse, CameraOptions, ErrorCode, Asset, launchCamera, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';


const CameraActivity = (
    props: { imageDataCallback: (imageData: Asset) => void }
) => {
    const [filePath, setFilePath] = React.useState({});

    let options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        includeBase64: true,
    };

    let image: Asset;

    let res: ImagePickerResponse;

    const parseResponse = (resp: ImagePickerResponse) => {
        res = resp;
        //console.log('hello');
        //console.log(resp);
        props.imageDataCallback((resp.assets as Asset[])[0]);
    }

    const takePicture = () => {
        launchCamera(options, parseResponse);
    }

    return (<Button style={{ margin: 25 }} icon="camera" mode="contained" onPress={takePicture}>
        Launch camera
    </Button>);

};

export default CameraActivity;
