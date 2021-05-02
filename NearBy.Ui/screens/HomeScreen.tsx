import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Notifications, { INotificatonModel } from "../data/NotificationsData";
import FindMe from "./FindMe";

const Home = (props : any) => {
  const [notificationsData, setNotification] = useState(
    [] as INotificatonModel[]
  );
  useState(() => {
    setNotification(Notifications);
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={notificationsData}
        renderItem={({ item }) => {
          return (
            <View style={styles.notificationsContainer}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View>
                <Text>{item.message}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <FindMe></FindMe>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationsContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  flatList: {
    borderWidth: 1,
    borderColor: "black",
    display: "none",
  },
});

export default Home;
