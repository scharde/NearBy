import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import Notifications, { INotificatonModel } from "../data/NotificationsData";
import {getDistanceFeeds} from "../service/FeedsService";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { actionCreators, FeedsState} from "../store/feeds";

type HomeScreenProps = FeedsState & typeof actionCreators;

const HomeScreen = (props: HomeScreenProps) => {
  const [notificationsData, setNotification] = useState(
    [] as INotificatonModel[]
  );

  useState(() => {
    props.updateFeedsAction();
  });

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={props.data}
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
      {/* <Button title='Find Location' onPress={() => {
        props.navigation.navigate('FindMe');
      }}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // borderWidth: 1,
    borderColor:'red',
    justifyContent:'center',
    alignContent:'flex-end',
    padding : 5,
  },
  notificationsContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    // margin: 10,
    margin : 10,
    borderColor:'blue',
    // borderWidth:1
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  flatList: {
    // borderWidth: 1,
    borderColor: "black",
  },
});

export default connect((state: ApplicationState) => state.feedsState, actionCreators)(HomeScreen as any);
