import { Button, Dimensions, FlatList, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import TestCard from '../../components/ui/TestCard';
import SearchableDropdown from 'react-native-searchable-dropdown';

const windowWidth = Dimensions.get('window').width * 0.9;
const windowHeight = Dimensions.get('window').height * 0.7;

const testlist = [
  {
    id: 1,
    name: 'Test Name 1',
  },
  {
    id: 2,
    name: 'Test Name 2',
  },
  {
    id: 3,
    name: 'Test Name 3',
  },
  {
    id: 4,
    name: 'Test Name 4',
  },
  {
    id: 5,
    name: 'Test Name 5',
  },
  {
    id: 6,
    name: 'Test Name 6',
  },
]

const renderItem = ({ item }) => {
  <TestCard data={item} />
}
const CollectSampleHomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={testlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
       <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={testlist}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
    </View>
  )
}

export default CollectSampleHomeScreen

const styles = StyleSheet.create({

})