import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, { CSSProperties } from 'react';
import RadialGradient from 'react-native-radial-gradient';
import LinearGradient from 'react-native-linear-gradient';

type SignInBagroundType = {
    component: JSX.Element
}

interface BackgroundForMenusType {
  children?: JSX.Element,
  style?: CSSProperties
}

interface HomeBackgroundType {
  children?: JSX.Element
}

export const BackgroundForMenus : React.FC<BackgroundForMenusType> = (props) => (
  <View style={[styleMenuBackground.mainContainer, props.style as StyleProp<ViewStyle>]}>
    <RadialGradient style={styleMenuBackground.ellipse3}
      colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[0,150]}
      radius={400} />
    <RadialGradient style={styleMenuBackground.ellipse2}
      colors={['rgba(255, 255, 255, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[300,400]}
      radius={600} />
    <RadialGradient style={styleMenuBackground.ellipse1}
      colors={['rgba(255, 255, 255, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[0,250]}
      radius={400} />
    <RadialGradient style={styleMenuBackground.ellipse4}
      colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[250,250]}
      radius={400} />
    {props.children}
  </View>
)

export const SignInBackground : React.FC<SignInBagroundType> = (props) => (
  <View style={styles.signInView}>
    <View style={styles.baseBackground}>
      <View style={styles.contentContainer}>
        {props.component}
      </View>
      <RadialGradient style={styles.ellipse2}
        colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
        stops={[0,0.6]}
        center={[0,150]}
        radius={400} />
      <RadialGradient style={styles.ellipse3}
        colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
        stops={[0,0.5]}
        center={[0,500]}
        radius={500} />
    </View>
    <RadialGradient style={styles.ellipse1}
      colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[250,250]}
      radius={400} />
    <View style={styles.ellipse4} />
  </View>
)

export const HomeBackground = (props: HomeBackgroundType) => (
  <>
    <LinearGradient 
      locations={[0, 0.4, 1]}
      colors={
        [
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.0)'
        ]}
      useAngle={false}
      // angle={0}
      style={stylesHome.linearGradientRectangle}
    />
    <RadialGradient style={styles.ellipse1}
      colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[250,250]}
      radius={400} />
    <RadialGradient style={stylesHome.ellipse2}
      colors={['rgba(0, 129, 184, 0.39)', 'rgba(0, 168, 239, 0.00)']}
      stops={[0,0.6]}
      center={[250,250]}
      radius={400} />
    {props.children}
  </>
)

const styles = StyleSheet.create({
  signInView: {
    backgroundColor: '#313131',
    flex: 1,
    zIndex: 1,
    width: '100%',
    height: '100%',
    justifyContent:'flex-end',
    alignContent: 'center'
  },
  baseBackground: {
    zIndex:1,
    width: '100%',
    height: '70%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(56, 56, 56, 0.5)',
  },
  ellipse1: {
    width:450,
    height:450,
    left:220,
    top:125,
    zIndex:0,
    position:'absolute'
  },
  ellipse2: {
    width:450,
    height:450,
    left:0,
    top:0,
    opacity:0.6,
    position:'absolute'
  },
  ellipse3: {
    width:450,
    height:450,
    left:0,
    bottom:0,
    opacity:0.6,
    zIndex:1,
    position:'absolute',
  },
  contentContainer:{
    zIndex:2,
    width: '100%',
    height: '100%',
  },
  ellipse4: {
    width:150,
    height:150,
    right:-50,
    top:-30,
    zIndex:0,
    position:'absolute',
    backgroundColor: 'rgba(0, 129, 184, 1)',
    borderRadius: 75,
    shadowColor: 'black',
    shadowRadius: 0,
    shadowOffset: { width: 10, height: 10 },
    elevation:10,
  }
})

const stylesHome = StyleSheet.create({
  ellipse1: {
    width:500,
    height:500,
    left:'50%',
    top:400,
    zIndex:0,
    position:'absolute'
  },
  ellipse2: {
    width:500,
    height:500,
    left:'-50%',
    top:0,
    zIndex:0,
    position:'absolute'
  },
  linearGradientRectangle: {
    position:'absolute',
    width: '100%',
    height: 800,
    zIndex: 0
  }
})

const styleMenuBackground  = StyleSheet.create({ 
  mainContainer: {
    zIndex: 1,
    flex: 1,
    overflow: 'hidden',
  },
  ellipse1: {
    width:600,
    height:600,
    left:'-40%',
    top:200,
    zIndex:0,
    position:'absolute'
  },
  ellipse2: {
    width:800,
    height:800,
    top:-200,
    zIndex:0,
    position:'absolute'
  },
  ellipse3: {
    width:600,
    height:600,
    top:0,
    zIndex:0,
    position:'absolute'
  },
  ellipse4: {
    width:600,
    height:600,
    top:'50%',
    left: '30%',
    zIndex:0,
    position:'absolute'
  },
})