import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

function Login({ navigation }) {
  const auth = firebase.auth();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const saveUserEmailToStorage = useCallback(async () => {
    await AsyncStorage.setItem('userEmail', email);
  }, [email]);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    const getEmailFromStorage = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      if (storedEmail !== null) {
        setEmail(storedEmail);
      }
    };
    getEmailFromStorage();

    return () => subscriber();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Chat List');
    }
  }, [user, navigation]);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      alert('Preencha o email e a senha');
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setUser(auth.currentUser);
      saveUserEmailToStorage();
      setPassword('');
      setEmail('');
    } catch (error) {
      alert('Falha ao logar');
    }
  }, [auth, email, password, saveUserEmailToStorage]);

  return (
    <SafeAreaView style={style.container}>
      <KeyboardAvoidingView behavior="padding" style={style.container}>
        <Image
          source={require('../../assets/TourMate2.png')}
          style={style.image}
        />
        <TextInput
          style={style.input}
          placeholder="Email"
          onChangeText={setEmail}
          onBlur={saveUserEmailToStorage}
          value={email}
        />
          <TextInput
          style={style.input}
            secureTextEntry={!showPassword}
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity  style={style.icon} onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <MaterialIcons name="visibility-off" size={23} color="white" />
            ) : (
              <MaterialIcons name="visibility" size={23} color="white" />
            )}
          </TouchableOpacity>
        
        <TouchableOpacity
          style={style.button2}
          onPress={() => navigation.navigate('Criar Usuário')}>
          <Text style={style.button2}>Cadastre-se!</Text>
        </TouchableOpacity>
        <View style={style.button}>
          <Button title="Login" onPress={handleLogin} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  input: {
    borderWidth: '0.0625rem',
    borderColor: '#FFFFFF',
    borderRadius: '0.25rem',
    padding: '0.1875rem',
    paddingLeft: '1.0rem',
    marginVertical: '0.1875rem',
    minWidth: '80%',
    height: '1.6rem',
    color: '#FFFFFF',
  },
  button: {
    padding: '0.5rem',
    marginTop: '0.625rem',
    minWidth: '12.5rem',
  },
  button2: {
    padding: '0.125rem',
    alignItems: 'center',
    height: '1.875rem',
    color: '#FFFFFF',
  },
  image: {
    marginTop: '4.6875rem',
    width: '20.3125rem',
    height: '20.3125rem',
  },
icon: {
    position: 'absolute',
    marginTop: '27.25rem',
    marginLeft: '14.3rem',
    marginBottom: '2.0rem'
},
  
});

export default Login;
