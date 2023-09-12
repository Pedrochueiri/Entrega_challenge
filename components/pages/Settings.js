import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
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
    auth.signOut();
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
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <TouchableOpacity style={styles.button2} onPress={() => setShowModal(true)}>
            <MaterialIcons name="menu" size={24} color="#fff" style={styles.icon} />
          </TouchableOpacity>
        </View>
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
            <TouchableOpacity style={styles.modalOption} onPress={handleSignOut}>
              <Text style={styles.modalOptionText}>Sair</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowModal(false)}>
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
                style={preferenciaViagem === 'feriados' ? styles.preferenciaSelected : styles.preferenciaOption}
                onPress={() => handlePreferenciaViagem('feriados')}>
                <Text style={styles.preferenciaOptionText}>Feriados</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={preferenciaViagem === 'fimDeSemana' ? styles.preferenciaSelected : styles.preferenciaOption}
                onPress={() => handlePreferenciaViagem('fimDeSemana')}>
                <Text style={styles.preferenciaOptionText}>Fim de Semana</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={preferenciaViagem === 'qualquerDia' ? styles.preferenciaSelected : styles.preferenciaOption}
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
    backgroundColor: '#222222',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  title: {
    fontSize: 24,
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
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
  },
  modalOptionText: {
    fontSize: 18,
  },
  modalCloseButton: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 180,
    marginBottom: 450,
  },
  button2: {
    marginTop: 8,
    marginLeft: 183,
    backgroundColor: '#222222',
    padding: 3,
    borderRadius: 10,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 2,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  settingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
    paddingLeft: 10,
  },
  preferenciaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  preferenciaOption: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  preferenciaSelected: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#008000',
  },
  preferenciaOptionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Settings;
