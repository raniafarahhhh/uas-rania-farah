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
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'; // Import axios

function TaskScreen({ navigation }) {
  const route = useRoute();
  const selectedMenu = route.params ? route.params.selectedMenu : '';
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [initialID, setInitialID] = useState('');
  const [initialPage, setInitialPage] = useState('');
  const [counter, setCounter] = useState('');

  const handleBackClick = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleDropdownClick = () => {
    navigation.navigate('');
  };

  const handleSaveClick = async () => {
    // Validate input fields before saving (add your validation logic here)
    if (!accountName || !email || !initialID || !initialPage || !counter) {
      Alert.alert('Info', 'Data yang Anda masukkan belum lengkap. Harap isi semua field.');
      return;
    }

    try {
      const response = await CApi.post('/action/insertOne',
        {
          'dataSource': 'Cluster0',
          'database': 'puppet_uas',
          'collection': 'account',
          'document': {
            'account_id': 'selectedMenu',
            'accountName': 'accountName',
            'email': 'email',
            'initialID': 'initialID',
            'initialPage': 'initialPage',
            'counter': 'counter',
          },
        }
      );

      // Assuming the API response contains an array of accounts
      console.log(response.data);
    } catch (error) {
      console.error('Error adding data:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackClick}>
          <Image source={require('./assets/back.png')} style={styles.headerImage} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Task</Text>
      </View>

      {/* Account Type Input and Button */}
      <View style={styles.inputContainer}>
        <Text style={[styles.label, { marginTop: 20 }]}>Select Account</Text>
        <View style={styles.inputButtonContainer}>
          <TextInput
            style={[styles.input1, { marginRight: 15, fontSize: 18, backgroundColor: '#ECECEC' }]}
            placeholder="Select Account"
            value={selectedMenu}
            editable={false}
          />
          <TouchableOpacity onPress={handleDropdownClick} style={styles.buttonup}>
            <Text style={styles.buttonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Name Input */}
      <Text style={styles.label}>Account Type</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18, backgroundColor: '#ECECEC' }]}
        placeholder="Account Type"
        value={accountName}
        editable={false}
        onChangeText={(text) => setAccountName(text)}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18, backgroundColor: '#ECECEC' }]}
        placeholder="Input Email"
        value={email}
        editable={false}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Initial ID Input */}
      <Text style={styles.label}>Initial ID</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Input Initial ID"
        value={initialID}
        onChangeText={(text) => setInitialID(text)}
      />

      {/* Initial Page Input */}
      <Text style={styles.label}>Initial Page</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Input Initial Page"
        value={initialPage}
        onChangeText={(text) => setInitialPage(text)}
      />

      {/* Counter Input */}
      <Text style={styles.label}>Counter</Text>
      <TextInput
        style={[styles.input, { marginRight: 15, fontSize: 18 }]}
        placeholder="Input Counter"
        value={counter}
        onChangeText={(text) => setCounter(text)}
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

export default TaskScreen;
