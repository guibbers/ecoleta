import { StatusBar } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import Home from '@/src/pages/Home';
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

export default function HomeScreen() {

  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          "RobotoRegular": Roboto_400Regular,
          "RobotoMNedium": Roboto_500Medium,
          "UbuntuBold": Ubuntu_700Bold,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppReady(true)
      }
    })()
  }, [])

  const onLayout = useCallback(() => {
    if (appReady) {
      SplashScreen.hideAsync()
    }
  }, [appReady])

  if (!appReady) {
    return null
  }
  
  return (
    <>
      <Home />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
    </>
  );
}
