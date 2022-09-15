import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { Input } from './components';

export default function App() {

  const [textTask, setTextTask] = useState("")
  const [taskList, setTaskList] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const onHandleChangeText = (text) => setTextTask(text)
  
  const add = () => {
    setTaskList([...taskList, {id: Date.now(), value: textTask}])
  }

  const onHandleModal = (id) => {
    setModalVisible(!modalVisible)
    setSelectedTask(taskList.find((item)=>item.id === id))
  }

  const onHandleDelete = (id) => {
    setTaskList(taskList.filter((item)=> item.id !== selectedTask.id))
    setSelectedTask(null)
    setModalVisible(!modalVisible)
  }

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item} >{item.value}</Text>
      <TouchableOpacity onPress={() => onHandleModal(item.id)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Input item={textTask} onChangeText={onHandleChangeText} placeholder={'New task'} AddItem={add} textButton={'Agregar'} />
      <FlatList
      style= {styles.flatList}
      data= {taskList}
      renderItem= {renderItem}
      keyExtractor= {(item) => item.id.toString()}
      />
      <Modal visible={modalVisible} animationType = 'slide' >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Detalle</Text>
        </View>
        <View style={styles.modalMsjContainter}>
          <Text style={styles.modalMsj}> Estas seguro que quieres eliminar?</Text>
          <Text>{selectedTask?.value}</Text>
        </View>
        <View style={styles.buttonC}>
          <Button title='Eliminar' color='black' onPress={()=> onHandleDelete()}/>
          <Button title='Cancelar' color='black' onPress={()=> setModalVisible(!modalVisible)}/>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '10%',
    marginHorizontal: '5%'
  },
  input: {
    borderBottomColor: '#274C77',
    borderBottomWidth: 1,
    width: '65%'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '4%',
    marginVertical: '3%',
    marginHorizontal: '5%',
    backgroundColor: '#6096BA',
    paddingHorizontal: '3%',
    borderRadius: 10
  },
  flatList: {
    marginTop: '10%',
  },
  item: {
    fontSize: 17
  },
  delete: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  modalTitle: {
    fontSize: 18
  },
  modalMsjContainter:{
    flexDirection:'row',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center'
  },
  modalMsj: {
    fontSize: 16
  },
  buttonC: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around'
  }
});
