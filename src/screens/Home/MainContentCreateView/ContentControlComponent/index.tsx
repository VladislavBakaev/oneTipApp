import {
  View, Text, StyleSheet, PermissionsAndroid 
} from 'react-native'
import { IconButton } from 'react-native-paper'
import { FontFamily, Color } from '../../../../styles/GlobalStyles'
// import { navigate } from '../../../../navigation/navigatorRef'
import Geolocation from 'react-native-geolocation-service';
import { setLoadingState } from '../../../../services/mainApp';
import React from 'react';
import DialogActionWithExistGeoComponent from './DialogActionWithExistGeoComponent';
import DialogConfirmSetLocationComponent from './DialogConfirmSetLocationComponent';
import { navigate } from '../../../../navigation/navigatorRef';
import { LogBox } from 'react-native';

interface ContentControlComponentType {
    toggleOnlyTextMode: () => void
    isPhotoExist: boolean
    isGeoLocationExist: boolean
    setGeoLocation: (geo: Geolocation.GeoPosition | undefined) => void
    takePhoto: () => void
    sendPhoto: () => void
    loadFromGalary: () => void
    isContentTextNotEmpty: boolean
    addTextButtonClick: () => void
    onlyTextMode: boolean
    setTrackUrl: (url: string) => void
    trackUrl: string
}

const ContentControlComponent = (props: ContentControlComponentType) => {

  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = React.useState(false);

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const mainButtonEvent = props.isPhotoExist||(props.onlyTextMode && props.isContentTextNotEmpty) ?
    () => props.sendPhoto():
    () => props.takePhoto()

  const getCurrentLocation = async () => {
    if (dialogVisible) {
      setDialogVisible(false)
    }
    if (confirmDialogVisible) {
      setConfirmDialogVisible(false)
    }
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        setLoadingState({ state: true })
        Geolocation.getCurrentPosition(
          position => {
            props.setGeoLocation(position)
            setLoadingState({ state: false })
          },
          error => {
            console.log(error.code, error.message);
            setLoadingState({ state: false })
          },
          {
            enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
          },
        );
      }
    } catch (err) {
      console.error('request location permision error')
    }
  }

  const openDialogWhenGeoExist = () => {
    setDialogVisible(true)
  }

  const onClearGeoLocation = () => {
    setDialogVisible(false)
    props.setGeoLocation(undefined)
  }

  return (
    <View>
      <DialogConfirmSetLocationComponent
        visible={confirmDialogVisible}
        onHidden={() => setConfirmDialogVisible(false)}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={getCurrentLocation}
      />
      <DialogActionWithExistGeoComponent
        visible={dialogVisible}
        onHidden={() => setDialogVisible(false)}
        onClearPress={onClearGeoLocation}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSetNewPress={getCurrentLocation}
      />
      <View style={style.selectCameraDataTypeContainer}>
        <Text 
          style={[style.onlyTextStyle, props.onlyTextMode ? style.onlyTextModeEnable:{}]}
          onPress={() => props.toggleOnlyTextMode()}
        >
                    Only text
        </Text>
        <View style={style.photoButtonStyleBase} onTouchEnd={mainButtonEvent}>
          <View style={style.photoButtonStyleInside}>
            {
              props.isPhotoExist || (props.onlyTextMode && props.isContentTextNotEmpty) ?
                <IconButton icon={'send'} size={35} /> :
                <IconButton icon={'camera'} size={40} /> 
            }
          </View>
        </View>
        <IconButton
          icon={'tray-arrow-up'}
          size={40}
          onPress={!props.onlyTextMode ? props.loadFromGalary : undefined}
          style={style.loadFromGalaryButtonStyle}
        />
      </View>
      <View style={style.selectMediaDataContainer}>
        <IconButton
          icon={'map-marker'}
          size={35}
          onTouchEnd={
            props.isGeoLocationExist ?
              () => openDialogWhenGeoExist()
              :
              () => setConfirmDialogVisible(true)
          }
          style={props.isGeoLocationExist ? style.clickedButton : {}}
        />  
        <IconButton
          style={props.isContentTextNotEmpty ? style.clickedButton : {}}
          icon={'format-text'} 
          size={35} 
          onPress={() => props.addTextButtonClick()}
        />
        <IconButton
          icon={'music'}
          size={35}
          onTouchEnd={() => navigate('MusicSelectorScreen', { updateTrackURL: props.setTrackUrl, trackUrl: props.trackUrl })}
          style={props.trackUrl ? style.clickedButton : {}}
        />
      </View>
    </View> 
  )
}

const style = StyleSheet.create({
  photoButtonStyleBase: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButtonStyleInside: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0081B8',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadFromGalaryButtonStyle: {
    position: 'absolute',
    right: '10%'
  },
  selectMediaDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  onlyTextStyle: {
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontSize: 20,
    color: Color.textColor,
    padding: 5,
    height: 40,
    borderRadius: 20,
    textAlignVertical: 'center',
    position: 'absolute',
    left: '10%'
  },
  selectCameraDataTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  clickedButton: { backgroundColor: '#E9E9E920' },
  onlyTextModeEnable: { backgroundColor: '#E9E9E920', }
})

export default ContentControlComponent
