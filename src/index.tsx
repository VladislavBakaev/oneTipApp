import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { RootState, withAppStore } from './redux/AppStore';
import AppNavigation from './navigation';
import { navigationRef } from './navigation/navigatorRef';
import LoadingScreen from './screens/Loading';
import { useSelector } from 'react-redux';

const lightTheme = {
  'colors': {
    'text':'#171717',
    'secondaryText':'#505050',
    'primary': 'rgb(0, 101, 145)',
    'onPrimary': 'rgb(255, 255, 255)',
    'primaryContainer': 'rgb(201, 230, 255)',
    'onPrimaryContainer': 'rgb(0, 30, 47)',
    'secondary': 'rgb(79, 96, 110)',
    'onSecondary': 'rgb(255, 255, 255)',
    'secondaryContainer': 'rgb(211, 229, 245)',
    'onSecondaryContainer': 'rgb(11, 29, 41)',
    'tertiary': 'rgb(50, 93, 168)',
    'onTertiary': 'rgb(255, 255, 255)',
    'tertiaryContainer': 'rgb(216, 226, 255)',
    'onTertiaryContainer': 'rgb(0, 26, 66)',
    'error': 'rgb(186, 26, 26)',
    'onError': 'rgb(255, 255, 255)',
    'errorContainer': 'rgb(255, 218, 214)',
    'onErrorContainer': 'rgb(65, 0, 2)',
    'background': 'rgb(252, 252, 255)',
    'onBackground': 'rgb(25, 28, 30)',
    'surface': 'rgb(252, 252, 255)',
    'onSurface': 'rgb(25, 28, 30)',
    'surfaceVariant': 'rgb(221, 227, 234)',
    'onSurfaceVariant': 'rgb(65, 71, 77)',
    'outline': 'rgb(113, 120, 126)',
    'outlineVariant': 'rgb(193, 199, 206)',
    'shadow': 'rgb(0, 0, 0)',
    'scrim': 'rgb(0, 0, 0)',
    'inverseSurface': 'rgb(46, 49, 51)',
    'inverseOnSurface': 'rgb(240, 240, 243)',
    'inversePrimary': 'rgb(137, 206, 255)',
    'elevation': {
      'level0': 'transparent',
      'level1': 'rgb(239, 244, 250)',
      'level2': 'rgb(232, 240, 246)',
      'level3': 'rgb(224, 235, 243)',
      'level4': 'rgb(222, 234, 242)',
      'level5': 'rgb(217, 231, 240)'
    },
    'surfaceDisabled': 'rgba(25, 28, 30, 0.12)',
    'onSurfaceDisabled': 'rgba(25, 28, 30, 0.38)',
    'backdrop': 'rgba(43, 49, 55, 0.4)'
  }
}

const darkTheme = {
  'colors': {
    'text': '#EFEFEF',
    'secondaryText': '#A4A4A4',
    'primary': 'rgb(137, 206, 255)',
    'onPrimary': 'rgb(0, 52, 77)',
    'primaryContainer': 'rgb(0, 76, 110)',
    'onPrimaryContainer': 'rgb(201, 230, 255)',
    'secondary': 'rgb(183, 201, 217)',
    'onSecondary': 'rgb(33, 50, 63)',
    'secondaryContainer': 'rgb(56, 73, 86)',
    'onSecondaryContainer': 'rgb(211, 229, 245)',
    'tertiary': 'rgb(173, 198, 255)',
    'onTertiary': 'rgb(0, 46, 106)',
    'tertiaryContainer': 'rgb(16, 68, 143)',
    'onTertiaryContainer': 'rgb(216, 226, 255)',
    'error': 'rgb(255, 180, 171)',
    'onError': 'rgb(105, 0, 5)',
    'errorContainer': 'rgb(147, 0, 10)',
    'onErrorContainer': 'rgb(255, 180, 171)',
    'background': '#313131',
    'onBackground': 'rgb(226, 226, 229)',
    'surface': 'rgb(25, 28, 30)',
    'onSurface': 'rgb(226, 226, 229)',
    'surfaceVariant': 'rgb(65, 71, 77)',
    'onSurfaceVariant': 'rgb(193, 199, 206)',
    'outline': 'rgb(139, 145, 152)',
    'outlineVariant': 'rgb(65, 71, 77)',
    'shadow': 'rgb(0, 0, 0)',
    'scrim': 'rgb(0, 0, 0)',
    'inverseSurface': 'rgb(226, 226, 229)',
    'inverseOnSurface': 'rgb(46, 49, 51)',
    'inversePrimary': 'rgb(0, 101, 145)',
    'elevation': {
      'level0': 'transparent',
      'level1': 'rgb(31, 37, 41)',
      'level2': 'rgb(34, 42, 48)',
      'level3': 'rgb(37, 48, 55)',
      'level4': 'rgb(38, 49, 57)',
      'level5': 'rgb(41, 53, 62)'
    },
    'surfaceDisabled': 'rgba(226, 226, 229, 0.12)',
    'onSurfaceDisabled': 'rgba(226, 226, 229, 0.38)',
    'backdrop': 'rgba(43, 49, 55, 0.4)'
  }
}
  

function App(): JSX.Element {
  const isLoading = useSelector((state: RootState) => state.mainAppState.isLoading)

  return (
    <>
      <PaperProvider theme={darkTheme}>
        { isLoading && <LoadingScreen /> }
        <NavigationContainer ref={navigationRef}>
          <AppNavigation />
        </NavigationContainer>          
      </PaperProvider>
    </>
  );
}

export default withAppStore<typeof App>(App);
