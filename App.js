/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from 'sp-react-native-in-app-updates';
import VersionCheck from 'react-native-version-check';

const App = () => {


  // useEffect(() => {
  //   cekAppVersionRelease()
  // }, []);

  const InAppUpdates=()=>{
    const inAppUpdates = new SpInAppUpdates(
      false // isDebug
    );
    // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
    inAppUpdates.checkNeedsUpdate({ curVersion: '0.0.8' }).then((result) => {
      console.log(result);
      if (result.shouldUpdate) {
        let updateOptions = {};
        if (Platform.OS === 'android') {
          // android only, on iOS the user will be promped to go to your app store page
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }
        inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
      }
    });
  }

  const cekAppVersionRelease = () => {
    VersionCheck.needUpdate().then(async (res) => {
      console.log(res); // true
      if (res?.isNeeded) {
        // Linking.openURL(res.storeUrl); // open store if update is needed.
        Alert.alert(
          'Silakan update aplikasi anda',
          `Versi aplikasi anda ${res.currentVersion} terbaru aroma medan telah tersedia di versi ${res.latestVersion}`,
          [
            {
              text: 'Nanti',
              onPress: () => crashlytics().log('Menolak update apps'),
              style: 'cancel',
            },
            {text: 'Update', onPress: () => Linking.openURL(res.storeUrl)},
          ],
        );
      }
    })
  }

  return (
    <View >
        <Text>Suma albaroh</Text>
        <Button
          title={'check in app update'}
          onPress={()=>InAppUpdates()}
        />
        <View
          style={{
            marginBottom: 20,
          }}
        />
        <Button
          title={'check update on play store'}
          onPress={cekAppVersionRelease}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

