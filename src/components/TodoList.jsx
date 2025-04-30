import React, { useState } from 'react';

const TodoList = ({ todos = [], handleDelete, handleUpdate, handleToggleComplete }) => {
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');


    const startEditing = (todo) => {
        setEditId(todo.id);
        setEditTitle(todo.title)
        setEditContent(todo.content)
    }

    const saveEdit = (id) => {
        if (editTitle.trim() === '' || editContent.trim() === '') {
            alert('Please fill out both title and content.');
            return
        }
        handleUpdate(id, editTitle, editContent)
        setEditId(null)
    }

    if (!todos.length) return null;

    return (
        <div className='output-box'>
            <ul className='todo-grid'>
                {todos.map((todo) => (
                    <li className='output-list' key={todo.id}>
                        <div className="output-content-wrapper">

                            {editId === todo.id ? (
                                <>
                                    <input className='output-title' type="" name="" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                    <hr className='line' />
                                    <textarea className='output-content' rows='3' cols='30' value={editContent} onChange={(e) => setEditContent(e.target.value)} ></textarea>
                                </>
                            ) : (
                                <>

                                    <h4 className={`output-title ${todo.completed ? 'completed' : ''}`} onClick={() => handleToggleComplete(todo.id)}>{todo.title}</h4>
                                    <hr className='line' />
                                    <p className='output-content'>{todo.content}</p>
                                </>
                            )}
                        </div>
                        <div className="output-footer">
                            <div className="timestamp">
                                <span className="time">{todo.date} </span><br />
                                <span className="date">{todo.time}</span>
                            </div>

                            <div className="output-buttons">
                                {editId === todo.id ? (

                                    <button className="edt-btn" onClick={() => saveEdit(todo.id)}>Save</button>
                                ) : (
                                    <button className="edt-btn" onClick={() => startEditing(todo)}>Edit</button>

                                )}
                                <button className="dlt-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
