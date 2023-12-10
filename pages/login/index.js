import { AppLogo, logo } from '../../assets';
import * as React from 'react';
import { PrimaryButton, LoadingUi } from '../../components';
import CApi from '../../lib/CApi';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  setUserId,
  setUserEmail,
  setUserFullName,
  setUserName,
} from '../../store/reducer/userSlice';

function LoginScreen({ navigation }) {
  const [isLoading, setLoading]= React.useState(false);
  const [username, setUsername]= React.useState(null);
  const [password, setPassword]= React.useState(null);
  const dispatch = useDispatch()

  const onhandleLoginButton = async ()=>{
    setLoading(true)
    try{
      const body = {
        "dataSource":"Cluster0",
        "database":"izonovel",
        "collection":"anggota",
        "filter": {
            "email":"username@mail.com",
            "password": "password"
        }
      }

      const {data} = await CApi.post('/action/find',body)
      setLoading(false)
      if(data){
        if(data.documents.length > 0){
          dispatch(setUserId(data.documents[0]._id))
          dispatch(setUserEmail(data.documents[0].email))
          dispatch(setUserFullName(data.documents[0].fullName))
          dispatch(setUserName(data.documents[0].userName))

          navigation.navigate('Main')
        }else{
          alert('username dan password tidak ditemukan')
        }
      }
    }catch(err){
      setLoading(false)
      console.error(err)
    }
  }

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <ScrollView>
        <View style={style.container}>
          <Image source={logo} style={style.logoTop} />
          <Text style={style.bodyText}></Text>

          <TextInput
            style={[style.input, { marginTop: 20 }]}
            value={username}
            onChangeText={(val) => setUsername(val)}
            placeholder="Phone Number or Email"
          />

          <TextInput
            value={password}
            onChangeText={(val) => setPassword(val)}
            style={[style.input, { marginTop: 10 }]}
            placeholder="Password"
          />

          <PrimaryButton
            style={style.loginFacebook}
            title="Login"
            onPress={onhandleLoginButton}
          />

          {/*
          <Text style={style.bodyText}>
            Don't have an account?
            <TouchableOpacity onPress={onRegisterPress}>
              <Text style={{ color: '#1156BD' }}>Signup</Text>
            </TouchableOpacity>
          </Text>
  */}
        </View>
      </ScrollView>
      <LoadingUi loading={isLoading} />
    </SafeAreaView>
  );
}

// ...

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFA61A',
  },
  container: {
    flex: 1,
    margin: 35,
  },
  logoTop: {
    alignSelf: 'center',
    marginTop: 20,
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white', // Ubah warna teks menjadi putih
  },
  loginFacebook: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: 'white', // Ubah warna teks input menjadi putih
  },
});

// ...


export default LoginScreen;
