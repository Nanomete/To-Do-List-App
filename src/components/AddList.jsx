import React, { useEffect } from 'react'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import './AddList.css'
import { AiOutlineEdit } from 'react-icons/ai';

function AddList() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false)
        const [allTodos, setTodos] = useState([]);
        const [newTitle, setNewTitle] = useState("")
        const [newDescription, setNewDescrpition] = useState("")
        const [completedTodos, setCompletedTodos] = useState([]);
        const [currentEdit, setCurrentEdit] = useState("")
        const [currentEditedItem, setCurrentEditedItem] = useState("")

        const handleAddTodo = () => {
            let newTodoItem = {
                title: newTitle,
                description: newDescription
            }

            let updateTodoArr = [...allTodos]
            updateTodoArr.push(newTodoItem)
            setTodos(updateTodoArr)
            localStorage.setItem('todolist', JSON.stringify(updateTodoArr))
        }

        const handleDeleteTodo = (index) => {
            let reducedTodo = [...allTodos]
            reducedTodo.splice(index,1)

            localStorage.setItem('todolist', JSON.stringify(reducedTodo))
            setTodos(reducedTodo)
        }

        const handleComplete = (index) => {
            let now = new Date()
            let dd = now.getDate()
            let mm = now.getMonth() + 1
            let yyyy = now.getFullYear()
            let h = now.getHours()
            let m = now.getMinutes()
            let s = now.getSeconds()
            let completedOn = dd + '-' + mm + '-' + yyyy + ' at' + h + ':' + m + ':' + s

            let fillteredItem = {
                ...allTodos[index],
                completedOn:completedOn
            }

            let updatedCompletedArr = [...completedTodos]
            updatedCompletedArr.push(fillteredItem)
            setCompletedTodos(updatedCompletedArr)
            handleDeleteTodo(index)
            localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr))
        }

        const handleDeleteCompletedTodo = (index) => {
            let reducedTodo = [...completedTodos]
            reducedTodo.splice(index,1)

            localStorage.setItem('completedTodos', JSON.stringify(reducedTodo))
            setCompletedTodos(reducedTodo)
        }

    useEffect(() => {
        let saveTodo = JSON.parse(localStorage.getItem('todolist'))
        let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))
        if (saveTodo) {
            setTodos(saveTodo)
        }

        if (saveCompletedTodo) {
            setCompletedTodos(saveCompletedTodo)
        }
    }, [])

    const handleEdit = (index, item) => {
        setCurrentEdit(index)
        setCurrentEditedItem(item)
    }

    const handleUpdateTitle = (value) => {
        setCurrentEditedItem((prev) => {
            return {...prev, title:value}
        })
    }
    const handleUpdateDiscripts = (value) => {
        setCurrentEditedItem((prev) => {
            return {...prev, description:value}
        })
    }

    const handleUpdatedTodo = () => {
        let newTodo = [...allTodos]
        newTodo[currentEdit] = currentEditedItem
        setTodos(newTodo)
        setCurrentEdit("")
    }

  return (
    <div className='todo-wrapper'>
        <div className="todo-input">
            <div className='todo-input-item'>
                <label htmlFor="#">Title</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} name="" placeholder="What's the task title?" />
            </div>
            <div className='todo-input-item'>
                <label htmlFor="#">Description</label>
                <input type="text" value={newDescription} onChange={(e) => setNewDescrpition(e.target.value)} name="" placeholder="What's the task Description?" />
            </div>
            <div className='todo-input-item'>
                <button type='submit' onClick={handleAddTodo} className='primaryBtn'>Add</button>
            </div>
        </div>

        <div>
                <div className='btn-area'>
                    <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
                    <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen(true)}>Complete</button>
                </div>
                <div className='todo-list'>
                    {isCompleteScreen == false && allTodos.map((item, index) => {
                        if (currentEdit === index) {
                            return (
                                <div className='edit_wrapper' key={index}>
                                <input 
                                    type="text" 
                                    placeholder='Title' 
                                    onChange={(e) => handleUpdateTitle(e.target.value)} 
                                    value={currentEditedItem.title}
                                />
                                <textarea 
                                    type="text" 
                                    rows={4}
                                    placeholder='Discription' 
                                    onChange={(e) => handleUpdateDiscripts(e.target.value)} 
                                    value={currentEditedItem.description}
                                />
                                <button type='submit' onClick={handleUpdatedTodo} className='primaryBtn'>Updated</button>
                            </div>
                            )
                        } else {
                        return (
                            <div className='todo-list-item' key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <AiOutlineEdit className='edit-icon' onClick={() => handleEdit(index, item)} title="Edit?"/>
                        </div>
                        <div>
                            <IoMdClose className='icon' onClick={() => handleDeleteTodo(index)} title="Delete?"/>
                            <FaCheck className='check-icon' onClick={() => handleComplete(index)} title="Complete?"/>
                        </div>
                    </div>
                        )
                    }})}
                    
                    {isCompleteScreen == true && completedTodos.map((item, index) => {
                        return (
                            <div className='todo-list-item' key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <p>
                                <small>
                                    {item.completedOn}
                                </small>
                            </p>
                        </div>
                        <div>
                            <IoMdClose 
                                className='icon' 
                                onClick={() => handleDeleteCompletedTodo(index)} 
                                title="Delete?"/>
                        </div>
                    </div>
                        )
                    })}
                </div>
            </div>
    </div>
  )
}

export default AddList