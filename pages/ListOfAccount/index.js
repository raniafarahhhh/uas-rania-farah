import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import CApi from '../../lib/CApi'; // Import CApi

function ListOfAccount({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchText);
  };
  

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await CApi.post('/action/find', {
        dataSource: 'Cluster0',
        database: 'puppet_uas',
        collection: 'account',
      });

      // Assuming the API response contains an array of accounts
      setAccountList(response.data.documents || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
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
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackClick}>
          <Image
            source={require('./assets/back.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>List Of Account</Text>
      </View>

      {/* Search form */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="gray"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Display account list */}
      {accountList.map((account, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <View style={styles.body}>
            <View style={styles.headerbody}>
              <TouchableOpacity onPress={handleBackClick}>
                <Image
                  source={require('./assets/email.png')}
                  style={styles.headerImage}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bodyText}>Account Name: {account.accountName}</Text>
              <Text style={styles.bodyText1}>Email: {account.email}</Text>
              <View style={styles.textbody}>
                <Image
                  source={require('./assets/comment.png')}
                  style={styles.headerImage1}
                />
                <Text style={styles.bodyText2}>Account type: {account.accountType}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Body */}
      {/* Add your list items here */}
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
  headerbody: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DFD8CC',
    borderRadius: 10,
    padding: 10,
    height: 60,
    width: 60,
    paddingLeft: 12,
  },
  textContainer: {
    marginLeft: 10,
  },
  textbody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  bodyText1: {
    fontSize: 20,
  },
  bodyText2: {
    fontSize: 20,
    marginLeft: 10,
  },
  headerImage: {
    height: 35,
    width: 35,
    tintColor: 'black',
  },
  headerImage1: {
    height: 25,
    width: 25,
    tintColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F1F1F1',
    fontSize: 18,
  },
  menuItem: {
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListOfAccount;
