// eslint-disable-next-line no-unused-vars
import React, { useReducer, useRef, useEffect } from 'react';
import './Task.css';

const TaskComponent = () => {
  const inputRef = useRef();
  const backButtonRef = useRef();
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        backButtonRef.current.style.display = 'block';
      } else {
        backButtonRef.current.style.display = 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addNewTask = () => {
    const newTask = inputRef.current.value.trim();
    if (newTask !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      inputRef.current.value = '';
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  };

  const toggleTaskVisibility = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const scrollToInput = () => {
    inputRef.current.focus();
  };

  // eslint-disable-next-line no-unused-vars
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="task-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add task..."
        onKeyPress={handleKeyPress}
        className="task-input"
      />
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-content">
              {task.hidden ? <span>The Content is hidden</span> : <span>{task.text}</span>}
            </div>
            <div>
              <button onClick={() => toggleTaskVisibility(task.id)} className="toggle-button">
                Toggle
              </button>
            </div>
          </div>
        ))}
      </div>
      <button ref={backButtonRef} onClick={scrollToInput} className="back-button">
        Get Back
      </button>
    </div>
  );
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, { id: state.length, text: action.payload, hidden: false }];
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload ? { ...task, hidden: !task.hidden } : task
      );
    default:
      return state;
  }
};

export default TaskComponent;
