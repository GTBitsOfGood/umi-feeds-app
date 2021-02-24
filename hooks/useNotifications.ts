import { useState, useEffect, useRef} from 'react';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from '../notifications/RegisterForPushNotifications';

type Subscription = {
  remove: () => void;
};

export default function useCachedResources() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined | null>('');
  const [notification, setNotification] = useState<boolean | Notifications.Notification>(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      // HERE IS WHERE WE ARE GOING TO WANT TO SEND SOME SORT OF UPDATE TO THE BACKEND UPDATING IT ON THIS PUSH TOKEN
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts
    // with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // eslint-disable-next-line no-console
      console.log(response);
    });

    return () => {
      // @ts-ignore Couldn't access the Subscription type necessary to suppress this typescript warning
      Notifications.removeNotificationSubscription(notificationListener);
      // @ts-ignore Couldn't access the Subscription type necessary to suppress this typescript warning
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return [expoPushToken, notification];
}
