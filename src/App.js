import React from 'react';
import './App.css';
import {ReactComponent as Enter} from './enter.svg'

function App() {

  const [tasks,setTasks] = React.useState([]);
  const [input,setInput] = React.useState('');

  const handleRemoveTask = task => {
    const newTasks = tasks.filter(
      t => t.taskID !== task.taskID
    )
    setTasks(newTasks);
    console.log(task)
  }

  const handleInputChange = event => setInput(event.target.value);

  const handleAddTask = event => {
    const newTasks = tasks.concat({
      taskID: Date.now(),
      task: input
    });
    
    setTasks(newTasks);
    setInput('');
    event.preventDefault();
  }

  return (
    <div className="App">
      <h1>What's the Agenda for Today?</h1>
      <AddTask input={input} onInputChange={handleInputChange} onAddItem={handleAddTask} />
      <TaskList list={tasks} onRemoveItem={handleRemoveTask} />
    </div>
  );
}

const AddTask = ({input, onInputChange, onAddItem}) => (
  <>
    <form type='submit' onSubmit={onAddItem}>
      <label className="label">Add Task: </label>
        &nbsp;
        <input type='text' value={input} onChange={onInputChange} className="input"/>
        <button type='submit' disabled={!input} className='submitButton'>
          <Enter width="26px" height="18px" backgroundColor="transparent"/>
        </button>
    </form>
  </>
)

const TaskList = ({list, onRemoveItem}) => 
  list.map(item => (
    <TaskItem
      key={item.taskID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
));

const TaskItem = ({item, onRemoveItem}) => (
    <div className="item">
      <span className="taskName">{item.task}</span>
      <button className="deleteTaskButton" value={item} type="button" onClick={() => onRemoveItem(item)}>
        Delete Task
      </button>
  </div>
);

export default App;
