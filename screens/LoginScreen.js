import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("MaskScreen")
      }
    })

    return unsubscribe
  }, [])


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      
      <View style={styles.inputContainer}>
        
        
        <Text style={styles.text1}>{"Employee Login "}</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {/* <TouchableOpacity>
                <Text style={styles.btn} onPress={()=>props.navigation.navigate("Splash")} >back</Text>
                
            </TouchableOpacity> */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.btn} onPress={() => props.navigation.navigate("Splash")} >back</Text>

        </TouchableOpacity>
        
      </View>
      
    </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>


  );
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  // text: {
  //   fontSize: 42,
  // },
  contentContainer: {
    paddingVertical: 20
  },
  inputContainer: {
    width: '90%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 22,
    marginLeft:30,
  },
  text1: {
    color: 'blue',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 100,
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft:50,

  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft:80,
  },
  btn:
  {
    fontSize: 16,
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
    textAlign: 'center', color: 'black',
    borderRadius: 10,
    backgroundColor: '#0782F9',
    fontWeight: '700',
    width: 220,
    marginLeft:5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
