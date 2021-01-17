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
import { vw, vh } from 'react-native-viewport-units';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export default function App() {
  const [js, SetJs] = React.useState(`_.btn =    {
      1: () => {alert(1)},
      2: () => {alert(2)},
      3: () => {alert(3)},
    }`);

  const SetJsFn = (text) => {
    SetJs(text);
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
    TaskManager,
    BackgroundFetch,
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

  //

  let setStateFn = () => {
    console.log('State not yet initialized');
  };
  function myTask() {
    try {
      // fetch data here...
      const backendData = 'Simulated fetch ' + Math.random();
      console.log('myTask() ', backendData);
      setStateFn(backendData);
      return backendData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData;
    } catch (err) {
      return BackgroundFetch.Result.Failed;
    }
  }
  async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
    try {
      if (!TaskManager.isTaskDefined(taskName)) {
        TaskManager.defineTask(taskName, taskFn);
      }
      const options = {
        minimumInterval: interval, // in seconds
      };
      await BackgroundFetch.registerTaskAsync(taskName, options);
    } catch (err) {
      console.log('registerTaskAsync() failed:', err);
    }
  }
  initBackgroundFetch('myTaskName', myTask, 1);
  // Put the next lines inside the React component
  const [state, setState] = React.useState(null);
  setStateFn = setState;
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
    height: vh(80) - 100,
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
