import React from 'react';
import { View, Text, Alert } from 'react-native';

function dialogscreen({ navigation }) {
  const showAlert = () => {
    Alert.alert(
      'Info',
      'Module ini masih dalam pengembangan',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  // Automatically show the alert when the component renders
  React.useEffect(() => {
    showAlert();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Alert Screen</Text>
    </View>
  );
}

export default dialogscreen;
