import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import SuggestionCard from '../SuggestionCard';

function ChatList() {
  const auth = firebase.auth();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    setShowModal(false);
    await auth.signOut();
    navigation.navigate('Login');
  };

  const handlePeril = async () => {
    setShowModal(false);
    navigation.navigate('Perfil');
  };

  const handleConfig = () => {
    setShowModal(false);
    navigation.navigate('Settings');
  };

  const handleTitle = async () => {
    setShowModal(false);
    navigation.navigate('Chat List');
  };

  const suggestionOptions = [{ label: 'Viajar', value: 'option1' }];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TourMate</Text>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}>
          <MaterialIcons
            name="menu"
            size={24}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Modal
          visible={showModal}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.modalOption} onPress={handlePeril}>
              <Text style={styles.modalOptionText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleConfig}>
              <Text style={styles.modalOptionText}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleTitle}>
              <Text style={styles.modalOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleSignOut}>
              <Text style={styles.modalOptionText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowModal(false)}>
              <MaterialIcons name="menu" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={styles.suggestionCards}>
        {suggestionOptions.map((option) => (
          <SuggestionCard key={option.value} options={[option]} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  icon: {
    alignItems: 'center',
  },
  suggestionCards: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0.625rem',
    marginTop: '0.625rem',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOption: {
    backgroundColor: '#fff',
    padding: '1.25rem',
    borderRadius: '0.625rem',
    marginBottom: '0.625rem',
    width: '80%',
  },
  modalOptionText: {
    fontSize: '1.125rem',
  },
  modalCloseButton: {
    position: 'absolute',
    marginTop: '2.1rem',
    marginLeft: '17.1rem',
    marginBottom: '45.0rem',
  },
   button: {
    marginTop: '0.8rem',
    marginLeft: '17.1rem',
    backgroundColor: '#222222',
    padding: '0.3rem',
    borderRadius: '10.0rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  title: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: '-3.75rem' }, { translateY: '0.813rem' }],
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'orange',
  },
});

export default ChatList;
