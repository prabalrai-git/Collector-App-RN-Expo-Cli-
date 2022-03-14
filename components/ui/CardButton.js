import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CardButton = ({data}) => {
  const navigation = useNavigation()
  console.log(data.img);
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(`${data.pathName}`)} style={{marginBottom: 15}}>

    <View style={styles.container} >
        <ImageBackground
          source={require(data.img)}
          // source={{uri: '../../assets/images/doctor.png'}}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.text}>{data.name}</Text>
        </ImageBackground>
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
    margin: 2,
  },
  image: {
    width: "100%",
    height: "100%"
  },
  text: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: '#ffffff9e',
    fontSize: 16,
    padding: 2,
  }
})