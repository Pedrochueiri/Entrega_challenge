import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Bubble from './Bubble';
import TextInputComponent from './TextInputComponent';

function Chat() {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    setMessageList([...messageList, message]);
    setMessage('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <FlatList
          data={messageList}
          renderItem={({ item }) => <Bubble messageIn message={item} />}
          keyExtractor={(_, index) => index.toString()}
        />
      </ScrollView>
      <TextInputComponent
        value={message}
        onChangeText={setMessage}
        onClick={sendMessage}
      />
    </SafeAreaView>
  );
}

export default Chat;
