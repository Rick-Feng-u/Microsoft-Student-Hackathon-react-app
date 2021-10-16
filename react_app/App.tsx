/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import PermissionsPage from './PermissionsActivity';

import { BottomNavigation, Text } from 'react-native-paper';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const HistoryActivity = () => {
  return (
    <Text>History</Text>
  );
};

const CameraActivity = () => {

  return (<Text>Camera</Text>);
};

const ImportActivity = () => {
  return (<Text>Import</Text>);
};

const NavigationBar = () => {
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    { key: 'history', title: 'History', icon: 'book-open-variant' },
    { key: 'camera', title: 'Camera', icon: 'barcode-scan' },
    { key: 'import', title: 'Import', icon: 'card-text' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    history: HistoryActivity,
    camera: CameraActivity,
    import: ImportActivity,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

const App = () => {
  const [cameraPermission, setCameraPermission] = React.useState<CameraPermissionStatus>();

  React.useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  if (cameraPermission == null) {
    // still loading
    return null;
  }

  const showPermissionsPage = cameraPermission !== 'authorized';
  const navBar = <NavigationBar></NavigationBar>;
  return (
    <PaperProvider>
      {showPermissionsPage ? navBar : <PermissionsPage></PermissionsPage>}
    </PaperProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
