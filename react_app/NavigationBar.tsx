import React from 'react';

import { BottomNavigation, Text } from 'react-native-paper';
import ImportActivity from './ImportActivity';

let globalImageData = ""; // this is a bad idea!

const HistoryRoute = () => {
    return (
        <Text>History</Text>
    );
};

const CameraRoute = () => {
    return (
        <Text>Camera</Text>
    );
};

const ImportRoute = () => {

    const [data, setData] = React.useState('');

    React.useEffect(() => {

    }, [globalImageData]);

    const changeImageData = (abc: string) => {
        console.log("calling from callback!");
        globalImageData = abc;
        console.log(abc.length);
    }

    return (
        <>
            <ImportActivity
                imageDataCallback={changeImageData}
            ></ImportActivity>
            <Text>{globalImageData}</Text>
        </>
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
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};