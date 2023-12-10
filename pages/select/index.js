import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet,Image } from 'react-native';
import CApi from '../../lib/CApi';

function SelectScreen({ navigation }) {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBackClick = () => navigation.goBack('');

  const handleMenuClick = (selectedAccount) => {
    // Add logic for displaying menu in label1
    navigation.navigate('TaskScreen', {
      selectedAccount: selectedAccount,
    });
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
        collection: 'account', // Change collection name to match your tasks collection
      });

      // Assuming the API response contains an array of tasks
      setTaskList(response.data.documents || []);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackClick}>
        <Image
            source={require('./assets/back.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Account</Text>
      </View>

      {/* Display tasks fetched from the API */}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        taskList.map((task) => (
            <TouchableOpacity
            key={task._id} // Assuming there's a unique identifier like _id
            onPress={() => handleMenuClick(task)}
            style={[styles.body, styles.underline]}
          >
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyText}>Account Name: {task.accountName}</Text>
              <Text style={styles.bodyEmail}>Email: {task.email}</Text>
              {task.account_id && ( // Check if account_id is available
                <Text style={styles.bodyID}>Account ID: {task.account_id}</Text>
              )}
            </View>
            {/* Add right arrow icon */}
            <Text style={styles.rightArrow}>&#8594;</Text>
          </TouchableOpacity>
        ))
      )}
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
  backButton: {
    fontSize: 18,
    color: 'blue',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  
  body: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    justifyContent: 'space-between', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  bodyTextContainer: {
    flex: 1, // Take up available space
  },
  bodyText: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  bodyEmail: {
    fontSize: 18,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 5,
  },
  rightArrow: {
    fontSize: 24,
    color: 'black',
  },
});

export default SelectScreen;
