
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Tambahkan logo Anda di bawah ini */}
      <Image
        source={require('./assets/Puppet_Logo1.png')} 
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA61A',
  },
  logo: {
    width: 319, // Sesuaikan lebar dan tinggi logo sesuai preferensi Anda
    height: 138,
  },
});

export default SplashScreen;