import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { ImagePickerResponse, CameraOptions, ErrorCode, Asset, launchCamera } from 'react-native-image-picker';


const ImportActivity = (
    props: { imageDataCallback: (imageData: string) => void }
) => {
    const [filePath, setFilePath] = React.useState({});

    let options: CameraOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        includeBase64: true
    };

    let image: Asset;

    let res: ImagePickerResponse;

    const parseResponse = (resp: ImagePickerResponse) => {
        res = resp;
        //console.log('hello');
        //console.log(resp);
        props.imageDataCallback((resp.assets as Asset[])[0].base64 as string);
    }

    const takePicture = () => {
        launchCamera(options, parseResponse);
    }

    return (<Button icon="camera" mode="contained" onPress={takePicture}>
        Press me
    </Button>);

};

export default ImportActivity;
