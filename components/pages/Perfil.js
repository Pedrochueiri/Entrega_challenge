import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import { ImagePicker } from 'expo';

function Perfil({ onClose, onSave }) {
  const auth = firebase.auth();
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [showEditView2, setShowEditView2] = useState(false);
  const database = firebase.database();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const nomeCompleto = `${nome} ${sobrenome}`.trim().toLowerCase();
  const allendereco = `${endereco} ${cidade} ${estado} ${cep}`.trim().toLowerCase();
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  useEffect(() => {
    const getUsuario = async () => {
      try {
        const snapshot = await database
          .ref(`usuario/${auth.currentUser.uid}`)
          .once('value');
        const dados = snapshot.val();
        setEmail(dados?.email || '');
        setNome(dados?.nome || '');
        setSobrenome(dados?.sobrenome || '');
        setSenha(auth.currentUser?.providerData[0]?.providerId || '');
       
        setEndereco(dados?.endereco?.rua || '');
        setCidade(dados?.endereco?.cidade || '');
        setEstado(dados?.endereco?.estado || '');
        setCep(dados?.endereco?.cep || '');
      } catch (error) {
        console.error(error);
      }
    };

    getUsuario();
  }, [database, auth]);

  const handleSavePerfil = async () => {
    try {
      const response = await fetch(
        `https://bigfiap-default-rtdb.firebaseio.com/usuario/${auth.currentUser.uid}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endereco: {
              rua: endereco,
              cidade: cidade,
              estado: estado,
              cep: cep,
            },
            nome: nome,
            sobrenome: sobrenome,
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Update the state variables with the new data received from the database
      setNome(data?.nome || '');
      setSobrenome(data?.sobrenome || '');
      setEmail(data?.email || '');
      setEndereco(data?.endereco?.rua || '');
      setCidade(data?.endereco?.cidade || '');
      setEstado(data?.endereco?.estado || '');
      setCep(data?.endereco?.cep || '');
    } catch (error) {
      console.error(error);
    }
    onSave();
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Perfil</Text>
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
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={() => alert('Alterar foto')}>
            <Image
              source={require('../../assets/TourMate2.png')}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{nomeCompleto}</Text>
          <TouchableOpacity onPress={() => alert('Alterar senha')}>
            <Text style={styles.profileEmail}>{auth.currentUser.email}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => { setShowEditView(false); setShowEditView2(true);}}>
          <MaterialIcons name="location-on" size={24} color="#000" />
          <Text style={styles.menuItemText}>Meus endereços</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => { setShowEditView(true); setShowEditView2(false);}}>
          <MaterialIcons name="person" size={24} color="#000" />
          <Text style={styles.menuItemText}>Alterar minhas informações</Text>
        </TouchableOpacity>
      </View>
      {showEditView && (
        <View style={styles.editContainer}>
          <TextInput style={styles.input} placeholder="New Name" onChangeText={setNome}/>
          <TextInput style={styles.input} placeholder="New LestName" onChangeText={setSobrenome}/>
          <TextInput style={styles.input} placeholder="New E-mail" onChangeText={setEmail}/>
          <TextInput style={styles.input} placeholder="New Senha" onChangeText={setSenha} secureTextEntry/>
          <TouchableOpacity style={styles.button} onPress={handleSavePerfil}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
      {showEditView2 && (
        <View style={styles.editContainer}>
          <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco}/>
          <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade}/>
          <TextInput style={styles.input} placeholder="Estado" value={estado} onChangeText={setEstado}/>
          <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep}/>
          <TouchableOpacity style={styles.button} onPress={handleSavePerfil}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: '-3.75rem' }, { translateY: '0.813rem' }],
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    marginLeft: 'auto',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '1.25rem',
  },
  profilePictureContainer: {
    marginRight: '1.25rem',
  },
  profilePicture: {
    width: '6.875rem',
    height: '6.875rem',
    borderRadius: '3.125rem',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: '1.438rem',
    fontWeight: 'bold',
    color: '#fff'
  },
  profileEmail: {
    fontSize: '1rem',
    color: 'black',
  },
  menuContainer: {
    padding: '1.25rem',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '0.625rem',
    paddingHorizontal: '1.25rem',
    marginBottom: '0.625rem',
    backgroundColor: 'orange',
  },
  menuItemText: {
    fontSize: '1rem',
    marginLeft: '0.625rem',
    color: '#fff',
  },
  input: {
    marginBottom: '1.225rem',
    padding: '0.625rem',
    borderRadius: '1.0rem',
    borderBottomWidth: '0.173rem',
    borderBottomColor: 'orange',
    backgroundColor: '#FFFFFF',
    color: 'black',
    width: '90%',
    paddingLeft: '1.0rem',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '0.5rem',
    marginLeft: '1.0rem',
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: '0.25rem',
    paddingVertical: '0.625rem',
    alignItems: 'center',
    width: '60%',
    marginTop: '1.5rem',
    marginLeft: '4.5rem',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
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
});

export default Perfil;
