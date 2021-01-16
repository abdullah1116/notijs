import React from 'react';
import {
  Button,
  TextInput,
  Platform,
  Text,
  Vibration,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { Card } from 'react-native-paper';

export default function App() {
  const [js, SetJs] = React.useState(`_.btn =    {
      1: () => {alert(1)},
      2: () => {alert(2)},
      3: () => {alert(3)},
    }`);

  const SetJsFn = (text) => {
    SetJs(text);
    console.log(js);
  };
  const onBtn = (i) => {
    try {
      _.btn[i]();
    } catch (e) {
      alert(e);
    }
  };
  const _ = {
    React,
    Vibration,
    btn: {
      1: () => {},
      2: () => {},
      3: () => {},
    },
  };

  const Apply = () => {
    function Rn(_) {
      try {
        eval(js);
      } catch (e) {
        alert(e);
      }
    }
    Rn(_);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(val) => SetJsFn(val)}
        value={js}
        multiline={true}
      />
      <View>
        <Button title='apply js' onPress={() => Apply()} />
      </View>

      <View>
        <Text style={styles.h2}> Customs buttons</Text>
        <View style={styles.customBtnContainer}>
          <Button
            title='btn: 1'
            style={styles.customBtn}
            onPress={() => {
              onBtn(1);
            }}
          />
          <Button
            title='btn: 2'
            style={styles.customBtn}
            onPress={() => {
              onBtn(2);
            }}
          />
          <Button
            title='btn: 3'
            style={styles.customBtn}
            onPress={() => {
              onBtn(3);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 8,
  },

  textInput: {
    // height: '80vh',
    borderWidth: 0.5,
  },
  customBtnContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  customBtn: {},
});
