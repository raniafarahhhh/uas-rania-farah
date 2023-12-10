import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import CApi from '../../lib/CApi'; // Import CApi

function AccountScreen({ navigation }) {
  const route = useRoute();
  const selectedMenu = route.params ? route.params.selectedMenu : '';
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [accountPassword, setAccountPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => {
    navigation.navigate('Home');
  };

  const handleDropdownClick = () => {
    navigation.navigate('dropdown');
  };

  const handleSaveClick = async () => {
    // Validate input fields before saving (add your validation logic here)
    if (!accountName || !email || !accountPassword) {
      Alert.alert('Info', 'Data yang Anda masukkan belum lengkap. Harap isi semua field.');
      return;
    }

    try {
      setLoading(true); // Set loading to true before making the request

      const response = await CApi.post('/action/insertOne', {
        'dataSource': 'Cluster0',
        'database': 'puppet_uas',
        'collection': 'account',
        'document': {
          'account_type': selectedMenu,
          'account_name': accountName,
          'email': email,
          'account_password': accountPassword,
        },
      });

      // Assuming the API response contains an array of accounts
      console.log(response.data);

      // Show success alert
      Alert.alert('Success', 'Data has been saved successfully.');
    } catch (error) {
      console.error('Error adding data:', error.message);
      // Show error alert
      Alert.alert('Error', 'An error occurred while saving data. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA61A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackClick}>
          <Image source={require('./assets/back.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
      </View>

      {/* Account Type Input and Button */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { marginTop: 20 }]}>Account Type:</Text>
        <View style={styles.inputButtonContainer}>
          <TextInput
            style={[styles.input1, { marginRight: 15, fontSize: 18 }]}
            placeholder="Account Type"
            value={selectedMenu}
            editable={false}
          />
          <TouchableOpacity onPress={handleDropdownClick} style={styles.buttonup}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Name Input */}
      <Text style={styles.label}>Account Name:</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Account Name"
        value={accountName}
        onChangeText={(text) => setAccountName(text)}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Input Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Account Password Input */}
      <Text style={styles.label}>Account Password:</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Account Password"
        value={accountPassword}
        onChangeText={(text) => setAccountPassword(text)}
        secureTextEntry // For password input
      />

      {/* Save Button */}
      <TouchableOpacity onPress={handleSaveClick} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 8,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerImage: {
    height: 35,
    width: 35,
    tintColor: 'black',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  input1: {
    flex: 1,
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#FFA61A',
    padding: 17,
    borderRadius: 15,
    alignItems: 'center',
    height: 60,
  },
  buttonup: {
    backgroundColor: '#FFA61A',
    height: 60,
    width: 100,
    borderRadius: 15,
    alignItems: 'center',
    padding: 17,
  },
  buttonText: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
