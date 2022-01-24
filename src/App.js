import React, { useState } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input
export default function App() {

  const [tasks, setTasks] = useState(
    [
      { id: 1, name: "Sacar la ropa", done: false },
      { id: 2, name: "Hacer la cama", done: true },
      { id: 3, name: "Leer un rato", done: false }
    ],
  );

  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState(false);

  const addTask = (e) => {
    setError(false);
    setNewTask(e.target.value);
    e.target.value = " ";
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(newTask !== ''){
      const optAdd = [...tasks];
      const addNew = {
        id: tasks.length + 1,
        name: newTask,
        done: false,
      }
      optAdd.push(addNew);
      setTasks(optAdd);
      setError(false)
      setNewTask('');
    } else {
      setError(true);
    }    
  }

  const deleteTask = (e) => {
    e.stopPropagation();
    setTasks(tasks.filter(task => task.id !== parseInt(e.target.id, 0)))
  }

  const doneTask = (i) => {
    const auxTask = [...tasks];
    auxTask[i].completed = !auxTask[i].completed;
    setTasks(auxTask);
  }

  return(
    <div>
      <div className="wrapper">
        <div className="list">
          <h3>Tareas:</h3>
          <ul className="todo" >
           {tasks.map((task, index) => <li onClick={() => doneTask(index)} key={task.id} className={ task.completed ? "done" : null }>
             {task.name}
             <a onClick={deleteTask} id={task.id} >      x</a>
           </li>
           )}
          </ul>
          <form onSubmit={submitHandler}>
            <input type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={newTask} onChange={addTask} className={`${error ? "error" : ""}` }/>
          </form>
        </div>
      </div>
    </div>
  )
}
