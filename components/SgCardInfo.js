import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SgCardInfo({ title, description, price, image }) {
  const navigation = useNavigation();

  const handlePricePress = () => {
    navigation.navigate('Paymant');
  };


  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          {image && <Image style={styles.image} source={image} />}
        </View>
        <View style={styles.infoWrapper}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.priceWrapper}>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={handlePricePress}>
              <Text style={styles.priceText}>{price}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#F4F4F4", 
    borderRadius: '0.313rem',
    flexDirection: 'row',
    margin: '0.625rem',
    overflow: 'hidden',
    maxWidth: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: '0.188rem',
      height: '0.188rem',
    },
    shadowOpacity: '0.013rem',
    shadowRadius: '0.125rem',
    elevation: '0.188rem',
    flex: 1,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  image: {
    height: '8.125rem',
    width: '6.25rem',
    borderRadius: '0.625rem',
  },
  infoWrapper: {
    flexDirection: 'column',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    flex: 1,
  },
  titleWrapper: {
    marginBottom: '0.313rem',
    paddingLeft: '1.25rem',
  },
  title: {
    color: "#333333",
    fontSize: '1.125rem',
    fontWeight: 'bold',
  },
  descriptionWrapper: {
    marginBottom: '0.313rem',
  },
  description: {
    color: "#666666", 
    fontSize: '0.875rem',
    textAlign: 'justify',
  },
 priceWrapper: {
  alignSelf: 'flex-end',
  position: 'absolute',
  bottom: '0rem',
  right: '0rem',
},
  priceButton: {
    backgroundColor: "#008000", 
    borderRadius: '0.313rem',
    paddingVertical: '0.313rem',
    paddingHorizontal: '0.625rem',
  },
  priceText: {
    color: "#FFFFFF",
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});
