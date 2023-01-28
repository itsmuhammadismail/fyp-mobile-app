import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
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

const HomeScreen = (props) => {
  const navigation = useNavigation();
  
  let resultantData = [];
  const [islist, setlist] = useState([]);
  const [isalert, setalert] = useState([]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const removeLetter = (word) => {
    const indexofSpace = word.indexOf(" ");

    if (indexofSpace === -1) {
      return "";
    }
    return word.substring(indexofSpace + 1);
  };

  useEffect(() => {
    database
    .ref("/")
    .on("value", (snapshot) => {
      let valueGet = snapshot.val();
      setalert(valueGet);
    });
  }, []);

  useEffect(() => {
    if (isalert) {
      for (var key in isalert) {
        if (
          isalert[key].OfficeAlert &&
          islist.includes(isalert[key].OfficeAlert) === false
        ) {
          resultantData.push(isalert[key]);
        }
      }
      let finalResult = resultantData;
      console.log("finalResult", finalResult);
      setlist(finalResult);
      resultantData = [];
      finalResult = [];
    }
  }, [isalert]);

  
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container1}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.officealert}>
            {"Alert Messages For Face Detection!!"}
          </Text>
          {islist?.length > 0
            ? islist?.map((item, index) => {
                return (
                  <Text style={styles.alertmsg} key={index}>
                    {item.OfficeAlert} 
                  </Text>
                );
              })
            : null}
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
