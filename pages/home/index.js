import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Verified, Kucing } from '../../assets'; // Pastikan memberikan path yang benar ke gambar Verified

function HomeScreen({ navigation }) {
  const user = useSelector((state) => state.user);

  const handleTitikClick = () => {
    navigation.navigate('accountScreen');
  };
  
  const kliklist = () => {
    navigation.navigate('ListOfAccount');
  };

  const tambahlist = () => {
    navigation.navigate('ListOfTask');
  };
  const taskklik = () => {
    navigation.navigate('task');
  };
  const Report = () => {
    navigation.navigate('dialog');
  };

  const fetchData = async () => {
    try {
      const body = {
        dataSource: 'Cluster0',
        database: 'izonovel',
        collection: 'anggota',
        filter: {
          email: user.email, // Assuming user.email contains the email of the logged-in user
        },
      };

      const response = await CApi.post('/action/find', body);
      // Handle the response as needed
      console.log('API Response:', response);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('./assets/account.png')}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Hi,</Text>
          <Text style={styles.username}>{user.fullName}</Text>

          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => handleTitikClick()}>
              <Image
                source={require('./assets/lonceng.png')}
                style={styles.headerImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Card Body - First Card */}
      <View style={styles.card}>
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Scraping Management</Text>
          <Text style={styles.textbawahheader}>
            Manage And Setting Your Account To Scrap
          </Text>
        </View>

        {/* Card Body */}
        <View style={styles.cardBody}>
          {/* Menu Items - Row 1 */}
          <View style={styles.menuContainer}>
            {/* Menu Item 1 */}
            <TouchableOpacity style={styles.menuItem} onPress={() => handleTitikClick()}>
              <View style={styles.menuItemBackground}>
                <Image
                  source={require('./assets/add.png')}
                  style={styles.menuIcon}
                />
              </View>
              <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>

            {/* Menu Item 2 */}
            <TouchableOpacity style={styles.menuItem}onPress={() => taskklik()}>
              <View style={styles.menuItemBackground2}>
                <Image
                  source={require('./assets/assignment.png')}
                  style={styles.menuIcon}
                />
              </View>
              <Text style={styles.menuText}>Task</Text>
            </TouchableOpacity>

            {/* Menu Item 3 */}
            <TouchableOpacity style={styles.menuItem} onPress={() =>Report()}>
              <View style={styles.menuItemBackground3}>
                <Image
                  source={require('./assets/equalizer.png')}
                  style={styles.menuIcon}
                />
              </View>
              <Text style={styles.menuText}>Report</Text>
            </TouchableOpacity>

            {/* Menu Item 4 */}
            <TouchableOpacity style={styles.menuItem}onPress={() => kliklist()}>
              <View style={styles.menuItemBackground4}>
                <Image
                  source={require('./assets/verified_user.png')}
                  style={styles.menuIcon}
                />
              </View>
              <Text style={styles.menuText}>List Of</Text>
              <Text style={styles.menuText}>Account</Text>
            </TouchableOpacity>

           {/* Menu Item 5 */}
            <TouchableOpacity style={styles.menuItem}onPress={() => tambahlist()}>
              <View style={styles.menuItemBackground5}>
                <Image source={require('./assets/art.png')} style={styles.menuIcon} />
              </View>
              <Text style={styles.menuText}>List Of</Text>
              <Text style={styles.menuText}>Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Card Body - Second Card */}
      <View style={styles.card2}>
        {/* Card Header */}
        <View style={styles.cardHeader2}>
          <Text style={styles.cardHeaderText2}>Scroping Activity</Text>
          <Text style={styles.textbawahheader2}>
            Monitoring Your Activity Progres
          </Text>
        </View>

        {/* Card Body */}
        <View style={styles.cardBody2}>
          {/* Menu Items - Row 1 for Second Card */}
          <View style={styles.menuContainer2}>
            {/* Menu Item 6 for Second Card */}
            
            <TouchableOpacity style={{ ...styles.menuItem2, flexDirection: 'row', alignItems: 'center'}}>
            
              <Text style={styles.menuText2}>Total Account</Text>
              <View style={styles.angkakanan}>
              <Text style={styles.menuText3}>10</Text>
                </View>
            </TouchableOpacity>
            
            {/* Menu Item 7 for Second Card */}
            <TouchableOpacity style={{ ...styles.menuItem2, flexDirection: 'row', alignItems: 'center'}}>
            
              <Text style={styles.menuText2}>Open Task</Text>
              <View style={styles.angkakanan2}>
              <Text style={styles.menuText3}>5</Text>
                </View>
            </TouchableOpacity>
            {/* Menu Item 8 for Second Card */}
            <TouchableOpacity style={{ ...styles.menuItem2, flexDirection: 'row', alignItems: 'center'}}>
            
              <Text style={styles.menuText2}>In Progress Task</Text>
              <View style={styles.angkakanan3}>
              <Text style={styles.menuText3}>10</Text>
                </View>
            </TouchableOpacity>
            {/* Menu Item  for Second Card */}
            <TouchableOpacity style={{ ...styles.menuItem2, flexDirection: 'row', alignItems: 'center'}}>
            
              <Text style={styles.menuText2}>Closed Task</Text>
              <View style={styles.angkakanan4}>
              <Text style={styles.menuText3}>20</Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    marginTop: 25,
  },
  headerText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  username: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 16,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    shadowOffset: { width: -4, height: -3 },
    marginBottom:20,
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 16,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    shadowOffset: { width: -4, height: -3 },
    
  },
  cardHeader: {
    backgroundColor: 'orange',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 16,
  },
  cardHeader2: {
    backgroundColor: '#0085E5',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 16,
  },
  
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardHeaderText2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textbawahheader: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
  },
  textbawahheader2: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'white',
  },
  cardBody: {
    padding: 16,
    marginLeft:10,
  },
  cardBody2: {
    padding: 16,
    marginLeft:10,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Add this to wrap items to the next line
    justifyContent: 'space-between',
    marginTop: 5,
  },
  menuContainer2: { 
    marginTop: 1,
  },
  menuItem: {
    alignItems: 'center',
    marginBottom: 10,  // Add this to provide space between items
  },
  
  menuItem2: {
    marginBottom: 20,
    flexDirection:'row',
    borderBottomWidth: 1,  // Add this to create a bottom border
    borderBottomColor: '#B0B0B0',  // Add this to set the border color
    paddingBottom: 10, 

  },
  menuItemBackground: {
    backgroundColor: '#1E9E61',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  angkakanan: {
    backgroundColor: '#32cd32',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    width: 80,
    height: 30,
  },
  angkakanan: {
    backgroundColor: '#1E9E61',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    width: 80,
    height: 30,
  },
  angkakanan2: {
    backgroundColor: '#0085E5',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    width: 80,
    height: 30,
  },
  angkakanan3: {
    backgroundColor: '#BE18D9',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    width: 80,
    height: 30,
  },
  angkakanan4: {
    backgroundColor: '#2215B1',
    padding: 6,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 'auto',
    width: 80,
    height: 30,
  },
  menuItemBackground2: {
    backgroundColor: '#F41B0D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  menuItemBackground3: {
    backgroundColor: '#A91163',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuItemBackground4: {
    backgroundColor: '#623FEC',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuItemBackground5: {
    backgroundColor: '#D93DD3',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    
  },
  menuIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuText2: {
    fontSize: 18,
    fontWeight: 'regular',
    flexDirection: 'row',
    color: 'grey',
  },
  menuText3: {
    fontSize: 14,
    fontWeight: 'bold',
    flexDirection: 'row',
    color:'white',
    
  },
  headerImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
};

export default HomeScreen;
