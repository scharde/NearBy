import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, FlatList } from "react-native";
import { connect, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import {
  FeedsState,
  actionCreators as feedActionCreators,
} from "../store/feeds";
import {
  LocationState,
  actionCreators as locationActionCreators,
} from "../store/location";
import Slider from "@react-native-community/slider";
import { round } from "../utiles/utilits";
import AddButton from "./AddButton";
type HomeScreenProps = FeedsState &
  LocationState &
  typeof feedActionCreators &
  typeof locationActionCreators;

const HomeScreen = (props: HomeScreenProps) => {
  // const locationState: LocationState = useSelector(
  //   (state) => state.locationState
  // );

  useEffect(() => {
    if (props.currentLocation) {
      props.updateFeedsAction();
    }
  }, [props.currentLocation]);

  useEffect(() => {
    props.updateFeedsAction();
  }, [props.distanceInKm]);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          step={5}
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          value={10}
          onSlidingComplete={(value : any) => {
            props.updateDistanceInKmAction(parseInt(value.toString()));
            console.log("Slider Value Chnaged : ", value);
          }}
        />
        <Text>{props.distanceInKm} Km</Text>
      </View>
      <FlatList
        style={styles.flatList}
        data={props.data}
        renderItem={({ item }) => {
          return (
            <View style={styles.notificationsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {/* <View style={styles.distanceView}> */}
                  <Text style={styles.title}>{round(item.distance, 1)} Km</Text>
                {/* </View> */}
              </View>
              <View>
                <Text>{item.message}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    justifyContent: "center",
    alignContent: "flex-end",
    padding: 5,
    flex : 1
  },
  sliderContainer: {
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
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
    margin: 10,
    borderColor: "blue",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  flatList: {
    borderColor: "black",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  distanceView: {
    alignItems:'flex-end'
  }
});

export default connect(
  (state: ApplicationState) => {
    return { ...state.feedsState, ...state.locationState };
  },
  { ...feedActionCreators, ...locationActionCreators }
)(HomeScreen as any);
