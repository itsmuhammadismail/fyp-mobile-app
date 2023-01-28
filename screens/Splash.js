import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';

// import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
export default function Login(props) {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#0782F9' barStyle="light-content" />
            <View style={styles.header}>
                <LottieView source={require('../assets/72989-monitoring.json')} autoPlay loop />
            </View>
            <Animatable.View
                style={[styles.footer, {
                    //   backgroundColor: colors.background
                }]}
                animation="fadeInUpBig"
            >
                <Text style={[styles.title, {
                    //   color: colors.text
                }]}>The best of me is yet to come.!</Text>
                {/* <Text style={styles.text}>Sign in with account</Text> */}
                <View style={styles.button}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#0782F9', '#0782F9']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign} onPress={() => props.navigation.navigate("Login")}>Get Started</Text>
                            <MaterialIcons
                                name="navigate-next"
                                color="white"
                                size={30}
                            />
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </View>
    );
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0782F9'
        
    },
    header: {
        flex: 2,
        paddingBottom:30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 40,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#102129',
        fontSize: 25,
        fontWeight: 'bold'
    },
    text: {
        color: 'blue',
        marginTop: 5,
        fontSize:15,
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        color: 'black',
        fontSize:60,
    },
    heading:{
        color:'white',
        fontSize: 25,
        padding:4,
        textAlign:'center',
        //marginTop:-100,
        fontWeight:'bold',
        opacity:0.8,
    
      },
    textSign: {
        color: 'white',
        width: 80,
        fontWeight: 'bold',
        fontSize:15
        
    }
});

