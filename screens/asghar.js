import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { auth, database } from "../firebase";
import * as firebase from "firebase";

import Constants from "expo-constants";
//import * as Notifications from 'expo-notifications';
import axios from "axios";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

var data = [];
let array = [];

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [islist, setlist] = useState([]);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //var hours = new Date().getHours(); //To get the Current Hours
  //var min = new Date().getMinutes(); //To get the Current Minutes
  let array1 = [];
  // const [isalert, setalert] = useState({})


  const [isalert, setalert] = useState([]);
  useEffect(() => {
    console.log("i am in --------");
    let resultantData = [];
    database.ref("/").on("value", (snapshot) => {
      console.log("snapshot", [snapshot.val()]);
      let valueGet = snapshot.val();
      for (var key in valueGet) {
        resultantData.push(valueGet[key]);
      }
      setalert(resultantData);
    });
  }, []);

  //=======================================================================================

  useEffect(() => {
    var currentUser;
    var newData;
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    firebase
      .auth()
      .signInWithEmailAndPassword("asghar123@gmail.com", "123456")
      .then((userCredentials) => {
        registerForPushNotificationsAsync(userCredentials);
      });

    // firebase.database().ref('/').on('value', function (data) {

    //     newData.push(data)
    //     useState({ listViewData: newData })

    // })
  });

  //=======================================================================================

  //=======================================================================================

  registerForPushNotificationsAsync = async (currentUser) => {
    const { existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    var updates = {};
    updates["/expoToken"] = token;
    await firebase
      .database()
      .ref("/" + currentUser.uid)
      .update(updates);
    //call the push notification
  };

  //=======================================================================================

  const removeLetter = (word) => {
    const indexofSpace = word.indexOf(" ");

    if (indexofSpace === -1) {
      return "";
    }
    return word.substring(indexofSpace + 1);
    // console.log('word',word)
  };

  useEffect(() => {
    // if (isalert) {
    //   let array1 = []
    //   for (var key in isalert) {
    //     array1.push({
    //       alertMessage: isalert[key].OfficeAlert
    //       //maskMessage: isalert[key].MaskAlert
    //     })
    //     console.log(array1,'4')

    //   }
    //  // setlist(array1)
    // }

    if (isalert) {
      console.log("isalert", isalert);
      // const result = isalert.length && isalert.filter((item) => { removeLetter(item.OfficeAlert) });
      const result = [];
      console.log("result", result);

      // for (var key in isalert) {
      //   //   console.log(isalert[key],'ffff')
      //   // console.log('removeLetter(isalert[key].OfficeAlert)', removeLetter(JSON.parse(JSON.stringify(isalert[key].OfficeAlert))))
      //   console.log('isalert[key].OfficeAlert', isalert[key].OfficeAlert)
      //   if (isalert[key].OfficeAlert === "Asghar Please Get Back To Your Seat Immediately!") {
      //     //let arr = []
      //     // arr.push(isalert[key]);
      //     array1.push(isalert[key])
      //   }
      // }

      setlist(result);
      console.log("11", result);
    }
  }, [isalert]);

  //console.log("A", isalert)

  // for (var key in isalert) {
  //   array.push({
  //     alertMessage: isalert[key].OfficeAlert
  //   })

  // }

  console.log("array office", array);
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container1}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.officealert}>
            {"Alert Messages For Face Detection!!"}
          </Text>
          {islist?.length > 0
            ? islist?.map((item) => {
                console.log("A", item);
                return (
                  <>
                    <Text style={styles.alertmsg}>
                      {item.OfficeAlert} {hours}:{min} pm
                    </Text>
                  </>
                );
              })
            : null}
          {/* {
      isalert.length > 0 ?
        isalert.map(item => {
          console.log("A", item)
          return (
            <>
              <Text style={{ color: 'blue', fontWeight: 'bold', marginTop: 10, margin: 13, padding: 10, fontSize: 20, marginLeft: 10 }}>{item.alertMsg}</Text>
            </>
          )
        })
        :
        null
    } */}
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
          <TouchableOpacity onPress={handleSignOut} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Mask")}
            style={styles.button}
          >
            <Text style={styles.buttonText2}>Mask Alert</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  container1: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  officealert: {
    color: "black",
    fontSize: 20,
    marginBottom: 30,
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginLeft: 70,
    marginBottom: 3,
  },
  alertmsg: {
    //backgroundColor:'red',
    color: "white",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#0782F9",
    borderColor: "#0782F9",
    borderWidth: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  buttonText2: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
});
