import { Button, Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width * 0.9;
const windowHeight = Dimensions.get('window').height * 0.7;
const CollectSampleHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require('../../assets/images/qr.png')}
          />
        </View>

        <Text h2 style={styles.span}>OR</Text>
        <Button title="manual entry" onPress={() => navigation.navigate('EnterFormScreen')}/>
      </View>
    </View>
  )
}

export default CollectSampleHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: '#BBE2F1',
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: 30,
    paddingVertical: 40,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fefefe',
    borderRadius: 10,
  },
  span: {
    color: "#205072",
    letterSpacing: 3,
    marginBottom: 20
  }
})