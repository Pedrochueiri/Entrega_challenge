import React, { useState } from 'react';
import {View,Text,Switch,StyleSheet,TouchableOpacity,SafeAreaView,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import firebase from 'firebase';

function Settings() {
  const [showModal, setShowModal] = useState(false);
  const [emailSettings, setEmailSettings] = useState(true);
  const [preferenciaViagem, setPreferenciaViagem] = useState('feriados');
  const navigation = useNavigation();
  const auth = firebase.auth();

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

  const handleSignOut = async () => {
    setShowModal(false);
    auth.signOut()
    navigation.navigate('Login');
  };

  const handleEmailSettings = () => {
    setEmailSettings(!emailSettings);
  };

  const handlePreferenciaViagem = (preferencia) => {
    setPreferenciaViagem(preferencia);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => setShowModal(true)}>
          <MaterialIcons name="menu" size={24} color="#fff" style={styles.icon}/>
        </TouchableOpacity>
        <Modal visible={showModal} animationType="fade" transparent={true} onRequestClose={() => setShowModal(false)}>
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
        <View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Email Notification:</Text>
            <Switch value={emailSettings} onValueChange={handleEmailSettings} />
          </View>
          <View style={styles.setting}>
            <Text style={styles.settingText}>Preferência de Viagem:</Text>
            <View style={styles.preferenciaContainer}>
              <TouchableOpacity
                style={
                  preferenciaViagem === 'feriados'
                    ? styles.preferenciaSelected
                    : styles.preferenciaOption
                }
                onPress={() => handlePreferenciaViagem('feriados')}>
                <Text style={styles.preferenciaOptionText}>Feriados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  preferenciaViagem === 'fimDeSemana'
                   ? styles.preferenciaSelected
                    : styles.preferenciaOption
                }
                onPress={() => handlePreferenciaViagem('fimDeSemana')}>
                <Text style={styles.preferenciaOptionText}>Fim de Semana</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  preferenciaViagem === 'qualquerDia'
                    ? styles.preferenciaSelected
                    : styles.preferenciaOption
                }
                onPress={() => handlePreferenciaViagem('qualquerDia')}>
                <Text style={styles.preferenciaOptionText}>Qualquer Dia</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: '#222222',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: 13 }],
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  icon: {
    alignSelf: 'center',
    color: 'white', 
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
    marginTop: '1.9rem',
    marginLeft: '18.0rem',
    marginBottom: '45.0rem',
  },
   button2: {
    marginTop: '0.8rem',
    marginLeft: '18.3rem',
    backgroundColor: '#50C878',
    padding: '0.3rem',
    borderRadius: '10.0rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '1.25rem',
    borderBottomWidth: '0.125rem', 
    paddingRight: '0.938rem',
    padding: '0.625rem'
  },
  settingText: {
    fontSize: '1.25rem', 
    fontWeight: 'bold',
    color: 'black', 
    paddingLeft: '0.625rem',
  },
  preferenciaContainer: {
    flexDirection: 'Collum',
    justifyContent: 'space-between',
    
  },
  preferenciaOption: {
    paddingVertical: '0.313rem',
    paddingHorizontal: '0.313rem',
    borderRadius: '0.313rem',
    backgroundColor: 'orange',
  },
  preferenciaSelected: {
    paddingVertical: '0.313rem', 
    paddingHorizontal: '0.313rem', 
    borderRadius: '0.313rem', 
    backgroundColor: '#008000', 
  },
  preferenciaOptionText: {
    fontSize: '0.938rem', 
    fontWeight: 'bold',
    color: 'white', 
  },
});

export default Settings;
