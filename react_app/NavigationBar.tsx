import React, { Component } from 'react';
import { Asset } from 'react-native-image-picker';
import { View } from 'react-native';
import { BottomNavigation, Button } from 'react-native-paper';
import ImportActivity from './ImportActivity';
import CameraActivity from './CameraActivity';
import History, { HistoryData, getDateTime } from './HistoryActivity';

let globalImageData = ""; // this is a bad idea!
let history: Array<HistoryData> = new Array<HistoryData>();



const Centered = (props: any) => {
    return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{props.children}</View>);
}

const HistoryRoute = (props: any) => {
    const [log, setLog] = React.useState(new Array<HistoryData>());

    const updateHistory = () => {
        setLog(history);
    }

    return (
        <>
            <History items={log}></History>
            <Button style={{ margin: 25 }} icon="refresh" mode="contained" onPress={updateHistory}>Refresh history</Button>
        </>
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
                history.push({ uri: data, date: getDateTime() });
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
                history.push({ uri: data, date: getDateTime() });
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
            onIndexChange={(idx) => { setIndex(idx); renderScene;[routes[idx].key] }}
            renderScene={renderScene}

        />
    );
};