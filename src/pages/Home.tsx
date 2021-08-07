import React, { useState } from 'react';
import { StyleSheet, View, Alert} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    const newTaskEguals = tasks.find(task => task.title === newTaskTitle );
    if(newTaskEguals){
      return(
        Alert.alert('task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome ')
      );
    }
    setTasks( oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id );

    if(!foundItem)
     return;

     foundItem.done = !foundItem.done;
     setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style:"cancel",
        text: "Não",
      },
      {
        style: "destructive",
        text: "Sim",
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id );

          setTasks(updatedTasks);
        }
      }
    ])
  }

  function handleEditTask({ taskId, taskNewTitle }:EditTaskArgs){

      const updatedTask = tasks.map(task => ({...task}));
      const foundTask = updatedTask.find(task => task.id === taskId);

      if(!foundTask)
      return;

      foundTask.title = taskNewTitle;
      setTasks(updatedTask);
  
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})