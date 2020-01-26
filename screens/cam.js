import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const Clarifai = require('clarifai');
const app = new Clarifai.App({apiKey: '28c1825c2f3f4e8e8a00c8c80e36dbe7'});
// const clarifai = new Clarifai.App({
//   apiKey: '28c1825c2f3f4e8e8a00c8c80e36dbe7',
// });
process.nextTick = setImmediate;
export default class Cam extends PureComponent {
  state = {
    predictions: [],
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true, height: 500, width: 300};
      const data = await this.camera.takePictureAsync(options);
      //console.log(data.base64)
      //console.log(data["uri"].toString().slice(53));
      console.log(data['uri'].toString().slice(53));
      app.models.predict('bd367be194cf45149e75f01d59f77ba7', data.base64).then(
        function(response) {
          console.log('hello');
          Alert.alert(response['outputs'][0]['data']['concepts'][0].name);
          for (
            var i = 0, iLen = response['outputs'][0]['data']['concepts'].length;
            i < iLen;
            i++
          ) {
            //Alert.alert(response['outputs'][0]['data']['concepts'][i].name);
            // this.state.predictions.push(response['outputs'][0]['data']['concepts'][i].name)
            //console.log(this.state.predictions);
          }
        },
        function(err) {},
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})