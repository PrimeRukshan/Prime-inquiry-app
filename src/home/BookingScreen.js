import { StyleSheet, Text, TouchableOpacity, ScrollView, View, TextInput, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import CustomTextInput from '../components/CustomTextInput';
import { SelectList } from 'react-native-dropdown-select-list'
import AppLoading from 'expo-app-loading';
import DropDownPicker from 'react-native-dropdown-picker';



import { userSignin } from '../services/Login';
import { getPackages } from '../services/Packages';
import { getServices } from '../services/Services';
import { getComodity } from '../services/Comodity';
import { getCountry } from '../services/Country';
import { postBooking } from '../services/Booking';


export default function BookingScreen() {

  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [selectedComodity, setSelectedComodity] = useState("");
  const [mainToken, setMainToken] = useState('');
  const [enableModal, setEnableModal] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [address, setAddress] = useState("");
  const [servicetype, setServiceType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [comodityType, setComodityType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [legnth, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [hight, setHight] = useState("");
  const [weight, setWeight] = useState("");
  const [remarks, setRemarks] = useState("");

  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [comodity, setComodity] = useState([]);
  const [country, setCountry] = useState([]);

  const VolumetricWeight = () => {
    let weight = (legnth * width * hight) / 5000;
    setWeight(weight)
  }

  const forOrigin = () => {
    for (i = 0; i < country.length; i++) {
      if (country[i].name == selectedOrigin) {
        // console.log('the origin id ----->',country[i].country_id)
        setOrigin(i + 1)

        return;
      }
    }

  }

  const forDestination = () => {

    for (i = 0; i < country.length; i++) {
      if (country[i].name == selectedDestination) {
        setDestination(i + 1)
        return;
      }
    }

  }

  const forService = () => {
    for (i = 0; i < services.length; i++) {
      if (services[i].en_name == selectedService) {
        setServiceType(i + 1)
        return;
      }
    }

  }

  const forpackage = () => {
    for (i = 0; i < packages.length; i++) {
      if (packages[i].en_name == selectedPackageType) {
        setPackageType(i + 1)
        return;
      }
    }

  }
  const forComodity = () => {
    for (i = 0; i < comodity.length; i++) {
      if (comodity[i].en_name == selectedComodity) {
        setComodityType(i + 1)
        return;
      }
    }

  }

  const onClickNext = () => {
    console.log('the token ---->', mainToken)
    console.log('the name ---->', name)
    console.log('the email ---->', email)
    console.log('the address ---->', address)
    console.log('the mobile ---->', mobile)
    console.log('the service ---->', servicetype)
    console.log('the comodity ---->', comodityType)
    console.log('the package ---->', packageType)
    console.log('the origin ---->', origin)
    console.log('the destination ---->', destination)
    console.log('the qty ---->', quantity)
    console.log('the length ---->', legnth)
    console.log('the width ---->', width)
    console.log('the height ---->', hight)
    console.log('the remarks ---->', remarks)

    let data =
    {

      date: "2023-6-25",
      customer_name: name,
      email_add: email,
      address: address,
      contact_no: mobile,
      service_id: servicetype,
      commodity_id: comodityType,
      package_id: packageType,
      origin_id: origin,
      destination_id: destination,
      quantity: quantity,
      leng: legnth,
      width: width,
      height: hight,
      remarks: remarks
    }

    postBooking(mainToken, data).then((response) => {
      console.log(response.data)
      setEnableModal(true)
    }).catch(console.error)


  }



  const userLogin = () => {


    userSignin()
      .then(response => {
        let token = response.data.token;
        setMainToken(token)
        getPackages(token).then(response => {
          // console.log(' package response ---->>', response.data.data)
          setPackages(response.data.data)
        }).catch(console.error)
        getServices(token).then(response => {
          // console.log(' services response ---->>', response.data.data)
          setServices(response.data.data)

        }).catch(console.error)
        getComodity(token).then((response) => {
          // console.log(' comodity response ---->>', response.data.data)
          setComodity(response.data.data)
        }).catch(console.error)
        getCountry(token).then((response) => {
          // console.log(' country response ---->>', response.data.data)
          setCountry(response.data.data)
        }).catch(console.error)



      })
      .catch(console.error);
  };


  useEffect(() => {
    userLogin();
    let date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    console.log('the date is ===>', year + '-' + month + '-' + date)
  }, []);


  const [fontsLoaded] = useFonts({
    'PoppinsRegular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'PoppinsBold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <>
      <View flex={1} style={styles.secondContainer}>
        <Text style={styles.heading}>Customer {'\n'}Inquiry</Text>


        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >


          <CustomTextInput
            textInput={{
              placeholder: 'Customer Name',
              placeholderTextColor: '#2F679B',
              onChangeText: setName,
              style: styles.textInputContainer
            }}
          />
          <CustomTextInput
            textInput={{
              placeholder: 'Email Address',
              placeholderTextColor: '#2F679B',
              onChangeText: setEmail,
              style: styles.textInputContainer
            }}
          />
          <CustomTextInput
            textInput={{
              placeholder: 'Contact Number',
              placeholderTextColor: '#2F679B',
              onChangeText: setMobile,
              style: styles.textInputContainer
            }}
          />
          <SelectList
            setSelected={(val) => {
              setSelectedOrigin(val)

            }}
            onSelect={() => forOrigin()}
            data={country.map((item) => {
              return { key: item.country_id, value: item.name }

            })}
            save="value"
            boxStyles={styles.listBox}
            fontFamily='PoppinsRegular'
            inputStyles={styles.list}
            placeholder='Origin Country'


          />
          <SelectList
            setSelected={(value) => {
              setSelectedDestination(value)


            }}
            onSelect={() => forDestination()}
            data={country.map((item) => {
              return { key: item.country_id, value: item.name }

            })}
            save="value"
            boxStyles={styles.listBox}
            fontFamily='PoppinsRegular'
            inputStyles={styles.list}
            placeholder='Destination Country'


          />
          <CustomTextInput
            textInput={{
              placeholder: 'Address',
              placeholderTextColor: '#2F679B',
              onChangeText: setAddress,
              style: styles.textInputContainer
            }}
          />


          <SelectList
            setSelected={(val) => {
              setSelectedService(val)

            }}
            onSelect={() => forService()}

            data={services.map((item) => {
              return { key: item.service_id, value: item.en_name }

            })}
            save="value"
            boxStyles={styles.listBox}
            fontFamily='PoppinsRegular'
            inputStyles={styles.list}
            placeholder='Service'


          />

          <SelectList
            setSelected={(val) => {
              setSelectedPackageType(val)


            }}
            onSelect={() => forpackage()}

            data={packages.map((item) => {
              return { key: item.package_id, value: item.en_name }

            })}
            save="value"
            boxStyles={styles.listBox}
            fontFamily='PoppinsRegular'
            inputStyles={styles.list}
            placeholder='Package Type'


          />
          <SelectList
            setSelected={(val) => {
              setSelectedComodity(val)


            }}
            onSelect={() => forComodity()}
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
              onChangeText: setQuantity,
              keyboardType: 'numeric',
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
                onChangeText={(value) => setLength(value)}
                onSubmitEditing={() => VolumetricWeight()}
                keyboardType='numeric'
                value={legnth}
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
                keyboardType='numeric'
                onChangeText={(value) => setWidth(value)}
                onSubmitEditing={() => VolumetricWeight()}
                value={width}
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
                keyboardType='number-pad'
                style={styles.textInputContainer2}
                // returnKeyLabel='Done' 
                returnKeyType='done'
                onChangeText={(value) => {
                  setHight(value)

                }}
                onSubmitEditing={() => VolumetricWeight()}
                value={hight}
              />
            </View>



          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textInputContainer}>{weight}</Text>

          </View>
          <CustomTextInput
            textInput={{
              placeholder: 'Description',
              placeholderTextColor: '#2F679B',
              onChangeText: setRemarks,
              style: styles.textInputContainer
            }}
          />





        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => onClickNext()}>
          <Text style={styles.btnText}>Submit</Text>

        </TouchableOpacity>
        <Modal
          animationType="slide"
          // transparent={true}
          // hasBackdrop={false}



          visible={enableModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalCard}>
              <Text style={styles.modalText}>
              Successfully Submitted. We will Contact you as soon as possible.
              </Text>
              <TouchableOpacity style={styles.modalBtn} onPress={()=>setEnableModal(!enableModal)}>
                <Text style={styles.modalBtnText}>
                  Return
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        </Modal>

      </View>

    </>

  );
}

const styles = StyleSheet.create({
  secondContainer: {
    padding: 20,
    flex: 1,

  },
  container: {
    flex: 1,
    // padding: 30,
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
  secondttextInputContainer: {
    fontFamily: 'PoppinsRegular',
    marginLeft: 10,
    marginBottom: 50

  },
  button: {
    padding: 10,
    height: 50,
    width: "80%",
    backgroundColor: '#2F679B',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    marginBottom: 50
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
  textContainer: {
    backgroundColor: '#D9D9D9',
    marginVertical: 5,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    padding: 5

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 70,
    backgroundColor: '#D9D9D9'

  },
  modalBtn: {
    height: 50,
    // width:'30%',
    backgroundColor: '#2F679B',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'

  },
  modalCard: {
    
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: '#2F679B'

  },
  modalText: {
    fontFamily: 'PoppinsBold',
    marginBottom: 30,
    fontSize: 20,
    textAlign: 'center',
    color: '#2F679B'
  },
  modalBtnText: {
    fontFamily: 'PoppinsRegular',
    color: 'white'

  }


});

