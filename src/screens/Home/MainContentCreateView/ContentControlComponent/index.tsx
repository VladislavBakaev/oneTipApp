import {
  View, Text, StyleSheet 
} from 'react-native'
import { IconButton } from 'react-native-paper'
import { FontFamily, Color } from '../../../../styles/GlobalStyles'

interface ContentControlComponentType {
    toggleOnlyTextMode: () => void
    isPhotoExist: boolean
    takePhoto: () => void
    sendPhoto: () => void
    loadFromGalary: () => void
    isContentTextNotEmpty: boolean
    addTextButtonClick: () => void
    onlyTextMode: boolean
}

const ContentControlComponent = (props: ContentControlComponentType) => {

  const mainButtonEvent = props.isPhotoExist||(props.onlyTextMode && props.isContentTextNotEmpty) ?
    () => props.sendPhoto():
    () => props.takePhoto()

  return (
    <View>
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
        <IconButton icon={'map-marker'} size={35} />
        <IconButton
          style={props.isContentTextNotEmpty ? style.clickedButton : {}}
          icon={'format-text'} 
          size={35} 
          onPress={() => props.addTextButtonClick()}
        />
        <IconButton icon={'music'} size={35} />
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
  clickedButton: {
    borderWidth: 1,
    borderColor: '#E9E9E9',
    backgroundColor: '#E9E9E920'
  },
  onlyTextModeEnable: { backgroundColor: '#E9E9E920', }
})

export default ContentControlComponent
