import PushNotification, {
  PushNotificationObject,
} from 'react-native-push-notification';

export const showPush = (
  details: PushNotificationObject,
  timestamp: number,
  vibration?: boolean,
) => {
  const id = Date.now().toString();
  PushNotification.createChannel(
    {
      channelId: id,
      channelName: id,
      vibrate: vibration,
    },
    () => {
      PushNotification.localNotification({
        ...details,
        channelId: id,
        vibrate: vibration,
      });
    },
  );
};
