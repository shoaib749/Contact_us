import { View, Text, Button } from 'react-native'
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native'

const Contactus = (navigation) => {
    const nav = useNavigation();
    useLayoutEffect(() => {
        nav.setOptions({
            headerShown: false,
        })
    },);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("Submit");
    const submit = async () => {
        let isValid = true;

        if (!email) {
            Alert.alert('Please input email');
            isValid = false;
        } else if (!email.match(/\S+@\S+\.\S+/)) {
            Alert.alert('Please input a valid email');
            isValid = false;
        }

        if (!name) {
            Alert.alert('Please input Name');
            isValid = false;
        }

        if (!phone) {
            Alert.alert('Please input phone number');
            isValid = false;
        }else if(phone.length!=10){
            Alert.alert('Enter valid phone number')
        }

        if (!message) {
            Alert.alert('Please input message');
            isValid = false;
        } else if (message.length > 200) {
            Alert.alert('Max message length of 200');
            isValid = false;
        }

        if (isValid) {
            setStatus("Sending...");
            let details = {
                name: name,
                email: email,
                message: message,
                phoneNumber: phone
            };
            let response = await fetch("http://192.168.43.89:5000/v1//text-mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(details),
            });
            setStatus("Submit");
            let result = await response.json();
            // alert(result.status);
            Alert.alert(`Thank You ${name}`);
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.mainHeader}>Contact us </Text>



            <View style={styles.box}>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}> Enter your name </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={""}
                        value={name}
                        onChangeText={(userdata) => setName(userdata)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}> Enter your Email </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={""}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}> Enter your mobile </Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder={""}
                        value={phone}
                        keyboardType="name-phone-pad"
                        onChangeText={(phone) => setPhone(phone)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.labels}> Enter your message... </Text>
                    <TextInput
                        style={[styles.inputStyle, styles.multilineStyle]}
                        placeholder={""}
                        value={message}
                        onChangeText={(msg) => setMessage(msg)}
                        numberOfLines={5}
                        multiline={true}
                    />
                </View>

                <TouchableOpacity
                    style={
                        styles.buttonStyle}
                    onPress={submit}>
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        paddingHorizontal: 30,
        backgroundColor: "#fff",
    },
    mainHeader: {
        fontSize: 24,
        color: "#344055",
        fontWeight: "500",
        paddingTop: 80,
        paddingBottom: 15,
        // fontFamily: "Nunito_700Bold",
        textTransform: "capitalize",
    },

    inputContainer: {
        marginTop: 20,
    },
    labels: {
        rfontWeight: "bold",
        fontSize: 15,
        color: "#7d7d7d",
        paddingBottom: 5,
        // fontFamily: "WorkSans_400Regular",
        lineHeight: 25,
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 10,
    },
    multiineStyle: {
        paddingVertical: 4,
    },
    buttonStyle: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
        marginTop: 50,
        backgroundColor: "#4630EB"
    },
    buttonText: {
        color: "#eee",
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        // fontFamily: "WorkSans_400Regular",
    },
    wrapperText: {
        marginLeft: 10,
        color: "#7d7d7d",
        // fontFamily: "WorkSans_400Regular",
    },
    box: {
        backgroundColor: "#FFFAFA",
        // borderColor:"#FFFFFF",
        borderWidth: 2,
        padding: 20,
        borderRadius: 10,
    }
});

export default Contactus