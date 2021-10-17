import React from 'react';
import { Asset } from 'react-native-image-picker';
import { Image, View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import ImportActivity from './ImportActivity';
import CameraActivity from './CameraActivity';

let globalImageData = ""; // this is a bad idea!

const Centered = (props: any) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{props.children}</View>);
}

const HistoryRoute = () => {
    return (
        <Text>History</Text>
    );
};

const CameraRoute = () => {

    const [data, setData] = React.useState('');

    const changeImageData = (abc: Asset) => {
        if (abc.base64 !== undefined) {
            globalImageData = abc.base64;
            if (abc.uri !== undefined) {
                setData(abc.uri.toString());
                console.log(`URI: ${data}`);
            }
        }
    }

    return (
        <Centered>
            <CameraActivity
                imageDataCallback={changeImageData}
            ></CameraActivity>
        </Centered>
    );
};

const ImportRoute = () => {

    const [data, setData] = React.useState('');

    const changeImageData = (abc: Asset) => {
        if (abc.base64 !== undefined) {
            globalImageData = abc.base64;
            if (abc.uri !== undefined) {
                setData(abc.uri.toString());
                console.log(`URI: ${data}`);
            }
        }
    }

    return (
        <Centered>
            <ImportActivity
                imageDataCallback={changeImageData}
            ></ImportActivity>
        </Centered>
    );
};


export const NavigationBar = () => {
    const [index, setIndex] = React.useState(1);
    const [imageData, setImageData] = React.useState("");

    const changeThisData = (abc: string) => {
        setImageData(abc);
    };

    const [routes] = React.useState([
        { key: 'history', title: 'History', icon: 'book-open-variant' },
        { key: 'camera', title: 'Camera', icon: 'barcode-scan' },
        { key: 'import', title: 'Import', icon: 'card-text-outline' }
    ]);

    const renderScene = BottomNavigation.SceneMap({
        history: HistoryRoute,
        camera: CameraRoute,
        import: ImportRoute
    });

    return (
        <BottomNavigation
            style={{ backgroundColor: 'darkblue' }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};