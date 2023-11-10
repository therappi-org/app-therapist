import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(
      `Error: ${error} \n saving async storage data with this key: ${key} and this value: ${value}`
    );
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(`Error: ${error} \n  getting async stored data with this key: ${key}`);
  }
};
