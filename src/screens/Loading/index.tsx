import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const LoadingScreen = () => {
  const theme = useTheme();

  return (
    <View style={style.mainContainer}>
      <ActivityIndicator animating={true} color={theme.colors.primary} size={'large'} />
    </View>
  )  
}



const style = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoadingScreen;