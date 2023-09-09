import {
  LayoutChangeEvent, StyleSheet, View 
} from 'react-native';
import { ContentTextStyleType, } from './types';

import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';
import CameraComponent, { CameraComponentRefType } from './CameraComponent';
import ContentControlComponent from './ContentControlComponent';
import InputTextCreatorComponent from './InputTextCreatorComponent';
import InputTextCreatorControlComponent from './InputTextCreatorControlComponent';
import SelectFriendsForSendComponent from './SelectFriendsForSendComponent';

const MainContentCreateView = () => {
  const [photo, setPhoto] = React.useState('')
  const [contentText, setContentText] = React.useState('')
  const [geolocation, setGeoLocation] = React.useState<Geolocation.GeoPosition>()
  const [trackUrl, setTrackUrl] = React.useState('')

  const contentTextStyleDefault: ContentTextStyleType = {
    fontColor: 'white',
    fontFamily: 'Roboto',
    fontSize: 30,
    position: { x: 0, y: 0 }
  }
  const [
    contentTextStyle, setContentTextStyle
  ] = React.useState<ContentTextStyleType>(contentTextStyleDefault)

  const [textCreatorMode, setTextCreatorMode] = React.useState(false);
  const [onlyTextMode, setOnlyTextMode] = React.useState(false);
  const [cameraHeight, setCameraHeight] = React.useState(400);
  const [sendModalVisible, setSendModalVisible] = React.useState(false);

  const photoRef = React.useRef<CameraComponentRefType>(null);

  const takePhoto = () => {
    photoRef.current?.takePhoto();
  };
  const loadFromGalary = () => {
    console.log('load from galary');
    const options: ImageLibraryOptions = { mediaType: 'photo' };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.errorCode) {
        console.log('ImagePicker Error: ', res.errorMessage);
      } else if (res.assets) {
        if (res.assets.length > 0) {
          if (res.assets[0].uri) {
            setPhoto(res.assets[0].uri);
          }
        }
      }
    });
  };
  const sendPhotoPrepareScreen = () => {
    setSendModalVisible(true);
  };
  const sendWidget = (selectedFriends: Array<number>, selectedGroups: Array<number>) => {
    console.log(selectedFriends)
    console.log(selectedGroups)
    console.log(contentText)
    console.log(contentTextStyle)
    console.log(geolocation?.coords)
    console.log(trackUrl)
  }
  const addTextButtonClick = () => {
    setTextCreatorMode(true);
  };
  const changeCameraContainerSize = (event: LayoutChangeEvent) => {
    setCameraHeight(event.nativeEvent.layout.width)
  }

  return (
    <>
      <SelectFriendsForSendComponent
        visible={sendModalVisible}
        setVisible={setSendModalVisible}
        onPressSend={sendWidget}
      />
      <View style={style.mainContainer}>
        <View
          style={{ width: '100%', height: cameraHeight }}
          onLayout={changeCameraContainerSize}
        >
          {onlyTextMode ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                borderRadius: 30,
              }}
            />
          ) : (
            <CameraComponent
              ref={photoRef}
              photo={photo}
              setPhoto={setPhoto}
            />
          )}
          <InputTextCreatorComponent
            textCreatorMode={textCreatorMode}
            contentText={contentText}
            setContentText={setContentText}
            setTextInputStyle={setContentTextStyle}
            textInputStyle={contentTextStyle}
          />
        </View>
        <View style={style.propsPanelStyle}>
          {!textCreatorMode ? (
            <ContentControlComponent
              isGeoLocationExist={geolocation !== undefined}
              isContentTextNotEmpty={contentText !== ''}
              isPhotoExist={photo !== ''}
              setGeoLocation={setGeoLocation}
              addTextButtonClick={addTextButtonClick}
              loadFromGalary={loadFromGalary}
              sendPhoto={sendPhotoPrepareScreen}
              takePhoto={takePhoto}
              onlyTextMode={onlyTextMode}
              setTrackUrl={setTrackUrl}
              trackUrl={trackUrl}
              toggleOnlyTextMode={
                () => setOnlyTextMode(!onlyTextMode)
              }
            />
          ) : (
            <InputTextCreatorControlComponent
              contentTextStyle={contentTextStyle}
              setContentText={setContentText}
              setContentTextStyle={setContentTextStyle}
              setDefaultContentTextStyle={
                () => setContentTextStyle(contentTextStyleDefault)
              }
              setTextCreatorMode={setTextCreatorMode}
            />
          )}
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'rgba(171, 171, 171, 0.28)',
    paddingTop: 20,
    borderRadius: 30,
  },
  propsPanelStyle: {
    width: '100%',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    marginTop: 20,
    paddingTop: 10,
  },
});

export default MainContentCreateView;
