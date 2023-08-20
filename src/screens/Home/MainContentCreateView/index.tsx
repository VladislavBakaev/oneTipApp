import {
  LayoutChangeEvent, StyleSheet, View 
} from 'react-native';
import { MainContainerCreateType } from './types';

import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import React from 'react';
import CameraComponent, { CameraComponentRefType } from './CameraComponent';
import ContentControlComponent from './ContentControlComponent';
import InputTextCreatorComponent from './InputTextCreatorComponent';
import InputTextCreatorControlComponent from './InputTextCreatorControlComponent';

const MainContentCreateView = (props: MainContainerCreateType) => {
  const [textCreatorMode, setTextCreatorMode] = React.useState(false);
  const [onlyTextMode, setOnlyTextMode] = React.useState(false);
  const [cameraHeight, setCameraHeight] = React.useState(400)

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
            props.setPhoto(res.assets[0].uri);
          }
        }
      }
    });
  };
  const sendPhoto = () => {
    console.log('send photo');
  };
  const addTextButtonClick = () => {
    setTextCreatorMode(true);
  };

  const changeCameraContainerSize = (event: LayoutChangeEvent) => {
    setCameraHeight(event.nativeEvent.layout.width)
  }

  return (
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
            photo={props.photo}
            setPhoto={props.setPhoto}
          />
        )}
        <InputTextCreatorComponent
          textCreatorMode={textCreatorMode}
          contentText={props.contentText}
          setContentText={props.setContentText}
          textInputStyle={props.contentTextStyle}
        />
      </View>
      <View style={style.propsPanelStyle}>
        {!textCreatorMode ? (
          <ContentControlComponent
            isContentTextNotEmpty={props.contentText !== ''}
            isPhotoExist={props.photo !== ''}
            addTextButtonClick={addTextButtonClick}
            loadFromGalary={loadFromGalary}
            sendPhoto={sendPhoto}
            takePhoto={takePhoto}
            onlyTextMode={onlyTextMode}
            toggleOnlyTextMode={
              () => setOnlyTextMode(!onlyTextMode)
            }
          />
        ) : (
          <InputTextCreatorControlComponent
            contentTextStyle={props.contentTextStyle}
            setContentText={props.setContentText}
            setContentTextStyle={props.setContentTextStyle}
            setDefaultContentTextStyle={
              props.setDefaultContentTextStyle
            }
            setTextCreatorMode={setTextCreatorMode}
          />
        )}
      </View>
    </View>
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
