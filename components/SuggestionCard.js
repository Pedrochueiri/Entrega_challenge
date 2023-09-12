import {StyleSheet,ScrollView,SafeAreaView,} from 'react-native';
import SgCardInfo from './SgCardInfo';


function TourCard() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <SgCardInfo
          title="Amazonas"
          description=" ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 10.000,00"
          image={require('../assets/amazonas.jpg')}
        />
        <SgCardInfo
          title="Bahamas"
          description="Lut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 20.000,00"
          image={require('../assets/bahamas.jpg')}
        />
        <SgCardInfo
          title="Caribe"
          description="ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 30.000,00"
          image={require('../assets/Caribe.jpg')}
        />
        <SgCardInfo
          title="França"
          description=" ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 40.000,00"
          image={require('../assets/Franca.jpg')}
        />
        <SgCardInfo
          title="Amazonas"
          description=" ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 10.000,00"
          image={require('../assets/amazonas.jpg')}
        />
        <SgCardInfo
          title="Bahamas"
          description="Lut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 20.000,00"
          image={require('../assets/bahamas.jpg')}
        />
        <SgCardInfo
          title="Caribe"
          description="ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 30.000,00"
          image={require('../assets/Caribe.jpg')}
        />
        <SgCardInfo
          title="França"
          description=" ut labore et dolore magna aliqua. Ut enim ad minim veniam."
          price="R$ 40.000,00"
          image={require('../assets/Franca.jpg')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#',
  },
});

export default TourCard;
