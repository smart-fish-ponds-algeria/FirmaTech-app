// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import { Alert, Platform } from 'react-native';

// export async function registerForPushNotificationsAsync(): Promise<string | null> {
//   if (!Device.isDevice) {
//     Alert.alert('Use a physical device!');
//     return null;
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== 'granted') {
//     Alert.alert('Permission not granted!');
//     return null;
//   }

//   const token = await Notifications.getExpoPushTokenAsync();
//   return token.data;
// }
