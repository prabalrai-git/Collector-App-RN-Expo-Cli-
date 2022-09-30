import { StyleSheet } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import collector from "../../assets/images/collector.png";

const MarkerCostome = (props) => {
  return (
    <>
      {props.forCollector && (
        <Marker
          coordinate={props.coordinate}
          title={props.title}
          description={props.description}
          image={collector}
          // width= {'20px'}
        />
      )}
      {props.forClient && (
        <Marker
          coordinate={props.coordinate}
          title={props.title}
          description={props.description}
          // image={collector}
          // width= {'20px'}
        />
      )}
    </>
  );
};

export default MarkerCostome;

const styles = StyleSheet.create({});
