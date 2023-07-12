import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import CustomTextInput from '../components/CustomTextInput';
import { SelectList } from 'react-native-dropdown-select-list'
import AppLoading from 'expo-app-loading';
import { getComodity } from '../services/Comodity';
import { userSignin } from '../services/Login';


export default function SubmitScreen() {
    const [fontsLoaded] = useFonts({
        'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
        'PoppinsBold': require('../../assets/fonts/Poppins-Bold.ttf'),
    });

    const [comodity, setComodity] = useState([]);
    const [selected, setSelected] = useState("");

    const userLogin = () => {
        userSignin()
            .then(response => {
                let token = response.data.token;
                getComodity(token).then((response) => {
                    setComodity(response.data.data)
                })

            })
            .catch(console.error);
    };
    useEffect(() => {
        userLogin();
    }, []);


    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.heading}>Customer {'\n'}Inquiry</Text>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={comodity.map((item) => {
                    return { key: item.commodity_id, value: item.en_name }

                })}
                save="value"
                boxStyles={styles.listBox}
                fontFamily='PoppinsRegular'
                inputStyles={styles.list}
                placeholder='Comodity'


            />
            <CustomTextInput
                textInput={{
                    placeholder: 'Quantity',
                    placeholderTextColor: '#2F679B',
                    style: styles.textInputContainer
                }}
            />
            <View style={styles.conrainer2}>
                <View style={{
                    backgroundColor: '#D9D9D9',
                    marginVertical: 5,
                    borderRadius: 5,
                    height: 50,
                    width: '30%',
                    justifyContent: 'center',
                    padding: 5
                }}>
                    <TextInput
                        placeholder='Length'
                        placeholderTextColor='#2F679B'
                        style={styles.textInputContainer2}
                    />
                </View>
                <View style={{
                    backgroundColor: '#D9D9D9',
                    marginVertical: 5,
                    borderRadius: 5,
                    height: 50,
                    width: '30%',
                    justifyContent: 'center',
                    padding: 5
                }}>
                    <TextInput
                        placeholder='Width'
                        placeholderTextColor='#2F679B'
                        style={styles.textInputContainer2}
                    />
                </View>
                <View style={{
                    backgroundColor: '#D9D9D9',
                    marginVertical: 5,
                    borderRadius: 5,
                    height: 50,
                    width: '30%',
                    justifyContent: 'center',
                    padding: 5
                }}>
                    <TextInput
                        placeholder='Height'
                        placeholderTextColor='#2F679B'
                        style={styles.textInputContainer2}
                    />
                </View>

            </View>

            <CustomTextInput
                textInput={{
                    placeholder: 'Volumetric weight',
                    placeholderTextColor: '#2F679B',
                    style: styles.textInputContainer
                }}
            />
            <CustomTextInput
                textInput={{
                    placeholder: 'Description',
                    placeholderTextColor: '#2F679B',
                    style: styles.textInputContainer
                }}
            />





            <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>Submit</Text>

            </TouchableOpacity>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30
    },
    heading: {
        color: '#2F679B',
        fontSize: 45,
        marginTop: 50,
        marginBottom: 50,
        alignSelf: 'flex-start',
        fontFamily: 'PoppinsBold'
    },
    textInputContainer: {
        fontFamily: 'PoppinsRegular',
        marginLeft: 10,
    },
    button: {
        padding: 10,
        height: 50,
        width: "80%",
        backgroundColor: '#2F679B',
        alignSelf: 'center',
        marginTop: 40,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'PoppinsRegular'
    },
    list: {
        color: '#2F679B'
    },
    listBox: {
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: '#D9D9D9',
        height: 50,
        marginVertical: 5,
    },
    conrainer2: {
        flexDirection: 'row',
        flex: 1,

        justifyContent: 'space-between'
    },
    textInputContainer2: {
        fontFamily: 'PoppinsRegular',
        paddingLeft: 5



    },
    list: {
        color: '#2F679B'
    },
    listBox: {
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: '#D9D9D9',
        height: 50,
        marginVertical: 5,
    }
});

