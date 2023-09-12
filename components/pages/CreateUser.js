import React, { useState, useEffect } from 'react';
import {Text,StyleSheet,SafeAreaView,TextInput,Button,View,Modal,TouchableOpacity,CheckBox,} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';


function CriarUsuario({ navigation }) {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    climaFrio: false,
    climaQuente: false,
    Turismo: false,
    Negócios: false,
    Lazer: false,
    Romantico: false,
  });

  const auth = firebase.auth();
  const database = firebase.database();

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber;
  }, [auth]);

  useEffect(() => {
    if (user) {
      navigation.navigate('Chat List');
    }
  }, [user, navigation]);

const handleSignUp = () => {
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          database.ref(`usuario/${userCredential.user.uid}`).set({
            email,
            nome,
            sobrenome,
            climaFrio: preferences.climaFrio,
            climaQuente: preferences.climaQuente,
            Turismo: preferences.Turismo,
            Negócios: preferences.Negócios,
            Lazer: preferences.Lazer,
            Romantico: preferences.Romantico,
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Erro falta de informações');
        });
    } else {
      alert('As senhas não coincidem');
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handlePreferences = (key, value) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.container2}>
        <TextInput
          style={style.input}
          placeholder="Nome"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <TextInput
          style={style.input}
          placeholder="Sobrenome"
          onChangeText={(text) => setSobrenome(text)}
          value={sobrenome}
        />
        <TextInput
          style={style.input}
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={style.input}
          placeholder="Senha"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={style.input}
          placeholder="Confirme sua senha"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={style.btn} onPress={handleShowModal}>
          <Text style={style.btnText}>Escolher preferências</Text>
        </TouchableOpacity>
      </View>
      <View style={style.container3}>
        <Modal visible={showModal} animationType="slide">
            <View style={style.modalContainer}>
              <View style={style.modalContent}>
                <Text style={style.modalTitle}>Escolha suas preferências</Text>
                <Text style={style.modalTitle}>Clima</Text>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.climaFrio}
                    onValueChange={(newValue) =>
                      handlePreferences('climaFrio', newValue)
                    }
                  />
                  <Text style={style.label}>Clima frio</Text>
                </View>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.climaQuente}
                    onValueChange={(newValue) =>
                      handlePreferences('climaQuente', newValue)
                    }
                  />
                  <Text style={style.label}>Clima quente</Text>
                </View>
                <Text style={style.modalTitle}>Tipo de viajem</Text>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.Turismo}
                    onValueChange={(newValue) =>
                      handlePreferences('Turismo', newValue)
                    }
                  />
                  <Text style={style.label}>Turismo</Text>
                </View>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.Negócios}
                    onValueChange={(newValue) =>
                      handlePreferences('Negócios', newValue)
                    }
                  />
                  <Text style={style.label}>Negócios</Text>
                </View>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.Lazer}
                    onValueChange={(newValue) =>
                      handlePreferences('Lazer', newValue)
                    }
                  />
                  <Text style={style.label}>Lazer</Text>
                </View>
                <View style={style.checkboxContainer}>
                  <CheckBox
                    value={preferences.Romantico}
                    onValueChange={(newValue) =>
                      handlePreferences('Romantico', newValue)
                    }
                  />
                  <Text style={style.label}>Romantico</Text>
                </View>
                <TouchableOpacity
                  style={style.modalBtn}
                  onPress={() => setShowModal(false)}>
                  <Text style={style.modalBtnText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
        <Button title="Criar conta" onPress={handleSignUp} />
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
  },
  container2: {
    marginTop: '7.5rem',
    paddingHorizontal: '1.25rem',
    paddingVertical: '1.0rem'
  },
  container3: {
    marginTop: '1.875rem',
    paddingHorizontal: '1.25rem',
    borderRadius: '0.938rem'
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
    paddingLeft: '1rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#50C878', 
    paddingVertical: '0.658rem',
    borderRadius: '0.613rem',
    alignItems: 'center',
    marginTop: '0.938rem',
  },
  btnText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF', 
    padding: '1.25rem',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#333333', 
    padding: '1.0rem',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '0.625rem',
  },
  label: {
    marginLeft: '0.625rem',
    fontSize: '1rem',
    color: '#333333', 
  },
  modalBtn: {
    backgroundColor: '#50C878', 
    paddingVertical: '0.938rem',
    borderRadius: '0.313rem',
    alignItems: 'center',
    marginTop: '1.25rem',
  },
  modalBtnText: {
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: '1rem',
  },
});

export default CriarUsuario;
