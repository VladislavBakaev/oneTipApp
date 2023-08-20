import {
  View, StyleSheet, Text 
} from 'react-native'
import { useSelector } from 'react-redux'
import MainUserHeader from '../../../components/MainUserHeader'
import { RootState } from '../../../redux/AppStore'
import { BackgroundForMenus } from '../../../components/UI/Backgrounds'
import React, { SetStateAction } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Color } from '../../../styles/GlobalStyles'
import { IconButton } from 'react-native-paper'
import Slider from '@react-native-community/slider'

interface SliderSettingType {
  label: string
  min: number
  max: number
  value: number
  updateValue: (value: number) => void
}

const SliderSetting = (props: SliderSettingType) => (
  <View style={sliderStyles.containerStyle}>
    <Text>{props.label + ' '+ props.value.toString()}</Text>
    <View style={sliderStyles.sliderWithRangeContainer}>
      <Text style={sliderStyles.sliderRangeTextStyle}>{props.min+1}</Text>
      <Slider
        style={{ width: '80%', height: 40 }}
        value={props.value}
        step={1}
        onValueChange={props.updateValue}
        minimumValue={props.min}
        maximumValue={props.max}
        thumbTintColor="#0081B8"
        minimumTrackTintColor="#86B5C9"
        maximumTrackTintColor="#86B5C9"
      />
      <Text style={{
        width: '10%', textAlign: 'center', fontSize: 20 
      }}>{props.max}</Text>
    </View>
  </View>
)

const sliderStyles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    alignItems:'center',
    borderBottomWidth: 1,
    borderColor: Color.darkgray,
    paddingBottom: 20,
    paddingTop: 10,
  },
  sliderWithRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sliderRangeTextStyle: {
    width: '10%',
    textAlign: 'center',
    fontSize: 20 
  }
})

interface DropDownLanguangeSelectorType {
  selectedLanguage: string
  languagesList: Array<object>
  setSelectedLanguage: (callback: SetStateAction<string>) => void
}

const DropDownLanguangeSelector = (props: DropDownLanguangeSelectorType) => {
  const [showDropDown, setShowDropDown] = React.useState(false);


  return (
    <DropDownPicker
      open={showDropDown}
      value={props.selectedLanguage}
      items={props.languagesList}
      setOpen={setShowDropDown}
      setValue={props.setSelectedLanguage}
      style={style.selectLanguageStyle}
      dropDownContainerStyle={style.dropDownStyle}
      textStyle={style.selectTextStyle}
      ArrowUpIconComponent={() => (<IconButton icon='chevron-up' />)}
      ArrowDownIconComponent={() => (<IconButton icon='chevron-down' />)}
      TickIconComponent={() => (<IconButton icon='check' />)}
    />
  )
}

const SettingScreen = () => {
  const userData = useSelector((state: RootState) => state.user.user)

  const [selectedLanguage, setSelectedLanguage] = React.useState('en')
  const [activeWidgetCount, setActiveWidgetCount] = React.useState(10)
  const [lifeTimeWidgetCount, setLifeTimeWidgetCount] = React.useState(10)

  const [minActiveWidgetCount, maxActiveWidgetCount] = [0, 20]
  const [minLifeTimeWidgetCount, maxLifeTimeWidgetCount] = [0, 20]

  const updateValueCustom = (value: number,
    setCallback: (value: number) => void,
    minValue: number) => {
    if (value == minValue) {
      setCallback(value + 1)
    } else {
      setCallback(value)
    }
  }

  const languagesList = [
    {
      label: 'English',
      value: 'en',
    },
    {
      label: 'Russian',
      value: 'ru',
    },
  ]
  
  return (
    <View style={{ backgroundColor: '#222222', flex: 1 }}>
      <MainUserHeader
        firstName={userData?.firstName || ''}
        lastName={userData?.lastName || ''}
        avaratSize={120}
        id={userData?.id || 0}
        avaratAndNameContainerStyle={style.avatarAndnameContainerStyle}
      />
      <BackgroundForMenus
        style={style.backgroundContainer}
      >
        <View>

          <SliderSetting
            max={maxActiveWidgetCount}
            min={minActiveWidgetCount}
            updateValue={
              (value) => updateValueCustom(value, setActiveWidgetCount, minActiveWidgetCount)
            }
            value={activeWidgetCount}
            label='Widgets active count'
          />
          <SliderSetting
            max={maxLifeTimeWidgetCount}
            min={minLifeTimeWidgetCount}
            updateValue={
              (value) => updateValueCustom(value, setLifeTimeWidgetCount, minLifeTimeWidgetCount)
            }
            value={lifeTimeWidgetCount}
            label='Widgets active delay (min)'
          />
          <DropDownLanguangeSelector
            languagesList={languagesList}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
        </View>
      </BackgroundForMenus>
    </View>
  )
}

const style = StyleSheet.create({
  avatarAndnameContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  backgroundContainer: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10
  },
  selectLanguageStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 0.5,
    borderColor: Color.darkgray,
    height: 60,
    borderRadius: 30,
    marginTop: 30,
  },
  dropDownStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 30,
    borderTopWidth: 0,
    borderColor: Color.darkgray,
    borderWidth: 0.5,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingBottom: 10,
    paddingLeft: 15
  },
  selectTextStyle: {
    color: Color.textColor,
    fontSize: 18
  }
})

export default SettingScreen;