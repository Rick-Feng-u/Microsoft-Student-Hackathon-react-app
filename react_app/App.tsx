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

<<<<<<< HEAD
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

=======
const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
>>>>>>> parent of 89de518 (added support for react-native-paper and vector icons)
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
<<<<<<< HEAD
    <PaperProvider>
      {showPermissionsPage ? navBar : <PermissionsPage></PermissionsPage>}
    </PaperProvider>
=======
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
>>>>>>> parent of 89de518 (added support for react-native-paper and vector icons)
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
