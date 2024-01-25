import Toast from 'react-native-root-toast';

import { axiosConfig } from './axiosConfig';

import colors from '@/theme/colors';

export const InterceptorError = () => {
  const onError = (error: any) => {
    if (error.response) {
      const { data } = error.response;
      const { message } = data;

      Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: false,
        animation: true,
        hideOnPress: true,
        opacity: 1,
        delay: 0,
        backgroundColor: colors.feedback.error,
        textColor: colors.gray[50],
      });
    }
  };

  axiosConfig.interceptors.response.use(undefined, (error) => {
    onError(error);

    return Promise.reject(error);
  });

  return null;
};
