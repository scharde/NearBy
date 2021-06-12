import * as SecureStore from "expo-secure-store";

const saveData = async (key: string, data: any) => {
  await SecureStore.setItemAsync(key, data);
};

const getData = async (key: string) => {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("Here is the secret value.", result);
  } else {
    console.log("Error in getting secret value");
  }
  return result;
};

const deleteData = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export { saveData, getData, deleteData };
