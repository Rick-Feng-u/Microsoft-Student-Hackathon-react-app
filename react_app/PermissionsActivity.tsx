import React, { useCallback, useEffect, useState } from 'react';
import { ImageRequireSource, Linking, PanResponderGestureState, StyleSheet } from 'react-native';

import { View, Text, Image } from 'react-native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';

const PermissionsPage = () => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === 'denied') await Linking.openSettings();
        setCameraPermissionStatus(permission);
    }, []);

    useEffect(() => {
        if (cameraPermissionStatus === 'authorized') {
            console.log('Authorized camera.');
        }
    }, [cameraPermissionStatus]);

    return (
        <View>
            {cameraPermissionStatus !== 'authorized' && (
                <Text>
                    This app needs Camera permission.
                    <Text style={{ textDecorationLine: 'underline' }}>Grant</Text>
                </Text>
            )}
        </View>
    );
};

export default PermissionsPage;