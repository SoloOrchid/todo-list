import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import {useEffect, useState} from "react";
import {makeAuthRequest, makeRequest} from "../../utils/api.jsx";
import TodoListCard from "../../components/TodoListCard.jsx";
import {EyeIcon, EyeSlashIcon, PlusIcon, NoSymbolIcon} from '@heroicons/react/24/outline';

export const Dashboard = () => {
    const [data, setData] = useState(null);
    const [showDone, setShowDone] = useState(false);
    const [showCreateNewList, setShowCreateNewList] = useState(false);
    const [makeEdit, setMakeEdit] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        makeRequest('/api/list', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Bearer')}`
            }
        })
            .then(res => {
                setData(res.data.data)
            })
            .catch(err => console.error(err))
    }, [])

    const handleSeeDone = () => {
        if (showDone) {
            setShowDone(false)
        } else {
            makeAuthRequest('/api/list?done=true', {
                method: 'GET',
            })
                .then(res => {
                    setData(res.data.data);
                })
                .catch(err => console.log(err))

            setShowDone(true)
        }

    }

    const handleDeleteList = (listId) => {
        console.log(listId)
        makeAuthRequest(`/api/list/${listId}`, {
            method: 'DELETE',
        })
            .then(res => {
                console.log(res)
                setData(data.filter(item => item.id !== listId))
            })
            .catch(err => console.error(err))
    }

    const toggleCreateNewList = () => {
        setMakeEdit(false)
        setShowCreateNewList(showCreateNewList => !showCreateNewList)
    }

    const handleCreateNewList = (e) => {
        e.preventDefault();

        if(makeEdit) {
            makeAuthRequest(`/api/list/${formData.id}`, {
                method: 'PUT',
                data: {
                    title: formData.title,
                    description: formData.description
                }
            })
                .then(res => {
                    setData(prevData => {
                        const newData = [...prevData]
                        const index = prevData.findIndex(item => item.id === formData.id)
                        newData[index] = res.data.data
                        return newData
                    })

                    setShowCreateNewList(false)
                    setFormData({title: '', description: ''})
                })
                .catch(err => console.log(err))
        }else {
            makeAuthRequest('/api/list', {
                method: 'POST',
                data: {
                    title: formData.title,
                    description: formData.description
                }
            })
                .then(res => {
                    setData(prevData => [res.data.data, ...prevData])
                    setShowCreateNewList(false)
                    setFormData({title: '', description: ''})
                })
                .catch(err => console.log(err))
        }
    }

    const handleChangeList = (e, data) => {
        e.preventDefault();

        setShowCreateNewList(true)
        setMakeEdit(true)
        setFormData({title: data.title, description: data.description, id: data.id})
    }

    return (
        <AuthLayout>
            <div className="flex justify-between mt-3">
                <button className="flex flex-row-reverse mt-3" onClick={handleSeeDone}>
                    {showDone ?
                        (
                            <>
                                <span className="text-lg mt-0.5">hide done</span>
                                <EyeSlashIcon className="h-8 w-8 mx-3"/>
                            </>
                        )
                        : (
                            <>
                                <span className="text-lg mt-0.5">show done</span>
                                <EyeIcon className="h-8 w-8 mx-3"/>
                            </>
                        )
                    }
                </button>
                <button className="flex flex-row-reverse mt-3 mr-2" onClick={toggleCreateNewList}>
                    {
                        showCreateNewList ?
                            (
                                <>
                                    <NoSymbolIcon className="h-8 w-8 mx-3"/>
                                    <span className="text-lg mt-0.5">I dont want one</span>
                                </>
                            )
                            : (
                                <>
                                    <PlusIcon className="h-8 w-8 mx-3"/>
                                    <span className="text-lg mt-0.5">Create a new list</span>
                                </>)

                    }

                </button>
            </div>
            {
                showCreateNewList && (
                    <div className="sm:mt-5 md:mt-5 lg:mt-5 pb-5 bg-white rounded-md">
                        <form className="flex flex-col p-3" onSubmit={handleCreateNewList}>
                            <div className="mt-2">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Name
                                </label>
                                <input
                                    placeholder="a title for the list"
                                    id="name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    placeholder="i will feed my cat..."
                                    id="description"
                                    name="description"
                                    autoComplete="none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <button className="mt-5 bg-indigo-600 text-white rounded-md px-3 py-1.5">Create new list
                            </button>
                        </form>
                    </div>
                )
            }
            {data !== null ? (
                data.map((item, i) => (
                    <TodoListCard key={item.id} handleChangeList={handleChangeList} handleDeleteList={handleDeleteList} showDone={showDone} data={item}/>
                ))
            ) : (
                <p>no data :(</p>
            )}
        </AuthLayout>
    )
}

export default Dashboard