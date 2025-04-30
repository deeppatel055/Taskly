import React, { useEffect, useState } from 'react'
import TodoList from './TodoList';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTodo, setSearchTodo] = useState('')
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (title.trim() === '' || content.trim() === '') {
            alert('Please enter both title and content.');
            return
        }

        const newTodo = {
            id: uuidv4(),
            title: title.trim(),
            content: content.trim(),
            completed: false,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setTodos([...todos, newTodo])

        setTitle('');
        setContent('');


    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))

    }


    const filteredTodos = todos
        .filter(todo =>
            todo &&
            todo.title &&
            todo.content &&
            (
                todo.title.toLowerCase().includes(searchTodo.toLowerCase()) ||
                todo.content.toLowerCase().includes(searchTodo.toLowerCase())
            )
        )
        .sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });


    const handleUpdate = (id, updatedTitle, updatedContent) => {
        const currentDate = new Date();
        setTodos(todos.map(
            todo => todo.id === id ? { ...todo, title: updatedTitle, content: updatedContent,  timestamp: currentDate.toISOString(),
                date: currentDate.toLocaleDateString(),
                time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            } : todo
        ))
    }

    const handleToggleComplete = (id) => {
        setTodos(
            todos.map(todo => {
                if (!todo || !todo.id) return todo; // skip invalid item
                return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
            })
        );
    };


    return (
        <>
            <Navbar searchTodo={searchTodo} setSearchTodo={setSearchTodo} />

            <div className='input-box'>
                <form onSubmit={handleAddTodo}>
                    <input className='add-title' value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title...' />
                    <textarea className='add-content' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content....' rows='3' cols='40'></textarea>
                    <button className='sub-btn' type="submit">Add</button>
                </form>

            </div>
            <div className='sort'>
            {todos.length >= 2 && 
            <button className="sort-btn" onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
            </button>
            }
            </div>
            <TodoList todos={filteredTodos} handleDelete={handleDelete} handleUpdate={handleUpdate} handleToggleComplete={handleToggleComplete} />
        </>
    )
}

export default AddTodo
