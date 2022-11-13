import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTaskForm from './components/AddTaskForm';
import ToDoForm from './components/ToDoForm';
import UpdateForm from './components/UpdateForm';

import './App.css';

function App() {

  // Tasks (To Do List) states
  const[toDo, setToDo] = useState([
    {id:1, title: "Task 1", status: false },
    {id:2, title: "Task 2", status: false },
  ]);

  // Create Temporary States:
  const[newTask, setNewTask] = useState('');
  const[updateData, setUpdateData] = useState('');

  // Functions declaration starts here. 

  // Add Task
  const addTask = () => {
    var newId = toDo.length + 1;
    setToDo([...toDo, {id:newId, title:newTask, status:false}]);

    // Clear newTask temporary states.
    setNewTask('');
  }

  // Delete Task
  const deleteTask = (id) => {
      setToDo(toDo.filter(task => task.id !== id));
  }

  // Mark Done. 
  const markDone = (id) => {

    // toggle task status when mark done is clicked.
    setToDo(toDo.map(task => task.id === id ? ({id:task.id, title:task.title, status: !task.status}) : task));
  }

  // Cancel Update
  const cancelUpdate = (id) => {
    setUpdateData('');
  }

  // change task for update 
  const changeHolder = (e) => {

    // this will set the temporary state of data.
    setUpdateData({...updateData, title : e.target.value })
  }

  //Update Task
  const updateTask = () => {
    var filterToDo = toDo.filter(task => task.id !== updateData.id);
    setToDo([...filterToDo, updateData]);
 
    // clear temporary state. 
    setUpdateData('');
  }
  // Functions declaration ends here. 

  return (
    <div className="container App">

    <br /><br />
    <h1>Vitol React Test</h1>
    <h2>To Do List App</h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeHolder={changeHolder}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}

    {toDo && toDo.length ? '' : 'No Tasks...'}

    <ToDoForm
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}
export default App;
