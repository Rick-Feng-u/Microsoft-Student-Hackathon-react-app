import React from 'react';

import { BottomNavigation, Text } from 'react-native-paper';
import ImportActivity from './ImportActivity';

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
    return (
        <ImportActivity></ImportActivity>
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
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};