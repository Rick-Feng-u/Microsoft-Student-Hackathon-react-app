import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { ImagePickerResponse, CameraOptions, ErrorCode, Asset, launchCamera, ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';


const ImportActivity = (
    props: { imageDataCallback: (imageData: Asset) => void }
) => {
    const [filePath, setFilePath] = React.useState({});

    let options: ImageLibraryOptions = {
        mediaType: 'photo',
        includeBase64: true,
        selectionLimit: 1
    };

    let image: Asset;

    let res: ImagePickerResponse;

    const parseResponse = (resp: ImagePickerResponse) => {
        if (!resp.didCancel) {
            res = resp;
            //console.log('hello');
            //console.log(resp);
            props.imageDataCallback((resp.assets as Asset[])[0]);
        }
    }

    const takePicture = () => {
        launchImageLibrary(options, parseResponse);
    }

    return (<Button style={{ margin: 25, padding: 25 }} icon="cloud-upload" mode="contained" onPress={takePicture}>
        Choose image
    </Button>);

};

export default ImportActivity;
