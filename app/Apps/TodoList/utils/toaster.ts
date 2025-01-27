import { Platform, ToastAndroid } from "react-native";

export const toast = (message: string) => {
    switch (Platform.OS) {
        case 'android':
            ToastAndroid.show(message, ToastAndroid.SHORT);
            break;
    
        default:
            break;
    }
}