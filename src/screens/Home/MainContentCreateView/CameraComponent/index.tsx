import { forwardRef, useImperativeHandle } from 'react';
import React from 'react';
import {
  Image, StyleSheet, View 
} from 'react-native';
import { RNCamera, TakePictureOptions } from 'react-native-camera';
import { IconButton } from 'react-native-paper';

interface CameraComponentType {
    photo: string,
    setPhoto: (photo: string) => void
}

interface CameraComponentRefType {
    takePhoto: () => void
}

const CameraComponent = (
  props: CameraComponentType, ref: React.Ref<CameraComponentRefType>
) => {
  useImperativeHandle(ref, () => ({ takePhoto: takePhoto }))

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [cameraType, setCameraType] = React.useState(RNCamera.Constants.Type.front)
  const [isPhotoTaking, setIsPhotoTaking] = React.useState(false)
  const cameraRef = React.useRef<RNCamera>(null);

  const flipCamera = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newCameraType = cameraType === RNCamera.Constants.Type.front ?
      RNCamera.Constants.Type.back :
      RNCamera.Constants.Type.front
    setCameraType(newCameraType)
  };

  const takePhoto = async () => {
    const options: TakePictureOptions = {
      quality: 1,
      base64: true,
      mirrorImage: cameraType === RNCamera.Constants.Type.front,
      fixOrientation: true
    };
    if (!isPhotoTaking){
      setIsPhotoTaking(true)
      const data = await cameraRef.current?.takePictureAsync(options);
      setIsPhotoTaking(false)
      props.setPhoto(data ? data.uri : '')
    }

  };

  const deletePhoto = () => {
    props.setPhoto('')
  };

  return (
    <View>
      {
        !props.photo ?
          <RNCamera
            ref={cameraRef}
            style={[cameraStyle.cameraStyle, cameraStyle.fullSize]}
            captureAudio={false}       
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            type={cameraType}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          >
            <IconButton
              icon={'camera-flip-outline'}
              size={30}
              onPress={flipCamera}
              style={cameraStyle.flipIconStyle}
            />
          </RNCamera> :
          <View style={cameraStyle.fullSize}>
            <Image
              source={{ uri: props.photo }}
              style={[cameraStyle.cameraStyle, cameraStyle.fullSize]}
            />  
            <View style={cameraStyle.deletePhotoContainer}>
              <IconButton icon={'close'} size={50} onTouchEnd={deletePhoto}/>
            </View> 
          </View>
      }
    </View>
  )
}

const cameraStyle = StyleSheet.create({
  cameraStyle: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  fullSize: {
    width: '100%',
    height: '100%'
  },
  flipIconStyle: {
    left: '80%',
    bottom: '-84%'
  },
  deletePhotoContainer: {
    borderBottomStartRadius: 28,
    borderBottomEndRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    width: '100%',
    height: 60,
    top: -60,
    zIndex:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default forwardRef(CameraComponent)

export type { CameraComponentRefType, }