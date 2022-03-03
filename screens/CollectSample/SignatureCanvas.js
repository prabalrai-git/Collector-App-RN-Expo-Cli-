import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { createRef, useRef, useState } from 'react'
import SignatureScreen from "react-native-signature-canvas";
import Signature from "react-native-signature-canvas";
import * as FileSystem from 'expo-file-system';

const windowWidth = Dimensions.get('window').width * 0.98;


const SignatureCanvas = ({ route }) => {


  const [signature, setSign] = useState(null);
  const [finalData, setfinalData] = useState()

  const handleOK = (signature) => {
    // console.log(signature);

    const path = FileSystem.cacheDirectory + "sign.png";
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(console.log)
      .catch(console.error);

    setSign(signature);
    const data = {
      'name': route.params.name,
      'address': route.params.address,
      'age': route.params.age,
      'sampleNo': route.params.sampleNo,
      'phone': route.params.phone,
      'signature': signature
    }
    console.log(data);
    setfinalData(data)

  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: #58dd90;
      color: #FFF;
    }
    `;
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.preview}>
        <ScrollView>
          <Text>{JSON.stringify(finalData)}</Text>
        </ScrollView>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={{ width: 335, height: 114 }}
            source={{ uri: signature }}
          />
        ) : null}
      </View>
      <Signature
        onOK={handleOK}
        onEmpty={handleEmpty}
        descriptionText=""
        clearText="Clear"
        confirmText="Proceed"
        webStyle={style}
        style={styles.previewText}
      />
    </View>
  );
}

export default SignatureCanvas


const styles = StyleSheet.create({
  preview: {
    width: '100%',
    height: 400,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
  },
  previewText: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#ffffff',
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 2,
    width: windowWidth,
    height: "100%"
  },
});