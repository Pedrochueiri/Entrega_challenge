import { View, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default props => {
  return (
    <View style={style.container}>
    <TextInput style={style.inputText} onChangeText={message => props.onTextChanged(message) } />
    <TouchableOpacity style={style.sendButton} onPress={ () => props.onClick() }>
    </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: '0.313rem',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  inputText: {
    backgroundColor: '#f2f2f2',
    maxHeight: '9.375rem',
    borderRadius: '1.563rem',
    flex: 1,
    paddingHorizontal: '0.625rem'
  },
  sendButton: {
    width: '3.125rem',
    height: '3.125rem',
    borderRadius: '1.563rem',
    marginStart: '0.625rem',
    backgroundColor: '#006600',
    justifyContent: 'center',
    alignItems: 'center'
  },
})