import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CardButton = ({ data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate(`${data.pathName}`)} style={{ marginBottom: 4 }}>
      <View style={[styles.container, {
        backgroundColor: data.color
      }]}  >
        <Text style={styles.text}>{data.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CardButton

const styles = StyleSheet.create({
  container: {
    width: 180,
    height: 110,
    overflow: 'hidden',
    borderRadius: 18,
    flex: 1,
    flexDirection: 'column',
    margin: 4,
    
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "#fefefe",
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
})