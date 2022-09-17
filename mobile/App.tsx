import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { Background } from './src/componentes/Background';
import { Routes } from './src/routes';
import { Loading } from './src/componentes/Loading';
import './src/services/notificatonConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';
import { Subscription } from 'expo-modules-core'
import { CodesandboxLogo } from 'phosphor-react-native';



export default function App() {

  const getNotificationListener = useRef<Subscription>();
  const respNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })
    respNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    })

    return () => {
      if (getNotificationListener.current && respNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(respNotificationListener.current);
      }
    }
  }, [])

  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background >
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}



