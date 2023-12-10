import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

function Dropdown({ navigation }) {
  const handleBackClick = () => navigation.navigate('Home');

  const handleMenuClick = (menu) => {
    // Add logic for displaying menu in label1
    navigation.navigate('accountScreen', { selectedMenu: menu });
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
        <Text style={styles.headerText}>Select Account Type</Text>
      </View>

      {/* Your dropdown content goes here */}
      <TouchableOpacity onPress={() => handleMenuClick('Jobstreet.com')} style={[styles.body, styles.underline]}>

        <Image
          source={require('./assets/domain.png')}
          style={styles.bodyImage}
        />
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyText}>Jobstreet.com</Text>
          {/* Remove the reference to selectedMenu here */}
          
        </View>
        <Image
          source={require('./assets/redo.png')}
          style={styles.bodyImage}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleMenuClick('Facebook')} style={[styles.body, styles.underline]}>
        <Image
          source={require('./assets/like.png')}
          style={styles.bodyImage}
        />
        <View style={styles.bodyTextContainer}>
          <Text style={styles.bodyText}>Facebook</Text>
          {/* Remove the reference to selectedMenu here */}
         
        </View>
        <Image
          source={require('./assets/redo.png')}
          style={styles.bodyImage}
        />
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
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding:15,
  },
  bodyImage: {
    height: 35,
    width: 35,
    tintColor: 'black',
  },
  bodyTextContainer: {
    flex: 1,  // Make the container take up available space
    marginLeft: 10,
  },
  bodyText: {
    fontSize: 18,
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 5,
    width: '100%', // Make the underline fill the entire width
  },
  selectedUnderline: {
    borderBottomWidth: 2, // Increase the width to highlight the selected menu
    borderBottomColor: 'blue', // Change the color for selected menu
    marginTop: 5,
    width: '100%', // Make the underline fill the entire width
  },
});

export default Dropdown;
