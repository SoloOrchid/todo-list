import ItemStatus from "./ItemStatus.jsx";
import {useState} from "react";
import {makeAuthRequest} from "../utils/api.jsx";
import {PencilSquareIcon, PlusCircleIcon, TrashIcon} from '@heroicons/react/24/outline'

export const TodoListCard = ({data, showDone, handleDeleteList, handleChangeList}) => {
    const {title, description} = data;
    const [status, setStatus] = useState(data.status);
    const [items, setItems] = useState(data.items);
    const [showAddItem, setShowAddItem] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState('');

    const handleStatusChange = (newStatus = null, newDescription = null, newTitle = null) => {
        console.log('changed the status to ', newStatus);

        makeAuthRequest(`/api/list/${data.id}`, {
            method: 'PUT', data: {
                title: newTitle ?? data.title,
                description: newDescription ?? data.description,
                status: newStatus.id ?? data.status,
            }
        })
            .then(res => {
                setStatus(newStatus.status)
            })
            .catch(err => console.error(err))
    };

    const handleCheckboxChange = (itemIndex, id) => {
        const updatedItems = [...items];
        updatedItems[itemIndex].check = !updatedItems[itemIndex].check;

        makeAuthRequest(`/api/item/${data.id}/${id}`, {
            method: 'PUT', data: {
                title: items[itemIndex].title, check: items[itemIndex].check
            }
        })
            .then(res => {
                setItems(updatedItems);
            })
            .catch(err => console.error(err))
    };

    const toggleAddNew = (e) => {
        e.preventDefault();
        setShowAddItem(true)
    }

    const handleSendAddItem = (e) => {
        e.preventDefault();

        makeAuthRequest(`/api/item/${data.id}`, {
            method: 'POST', data: {
                title: newItemTitle, check: false
            }
        })
            .then(res => {
                setItems(prevItems => [...prevItems, res.data.data]);
            })

        setShowAddItem(false)
        setNewItemTitle('')
    }

    const handleDeleteItem = (item) => {
        makeAuthRequest(`/api/item/${data.id}/${item}`, {
            method: 'DELETE',
        })
            .then(res => {
                setItems(prevItems => [...prevItems.filter(i => i.id !== item)])
            })
            .catch(err => console.log(err))

    }

    return (<>
        {status === 'done' && showDone === false ? (<></>) : (
            <div className="sm:mt-5 md:mt-5 lg:mt-5 pb-5 bg-white rounded-md">
                <h1 className="text-center text-2xl pt-2">{title}</h1>
                <div className="flex flex-row justify-between align-middle px-5 mb-3 mt-3">
                    <p className="text-left flex-1">{description}</p>

                    {/*there should be a drop down to change the status*/}
                    <ItemStatus statusFn={handleStatusChange} status={status} data={data}/>
                    <button
                        onClick={(e) => handleChangeList(e, data, )}
                        className="h-fit inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                        <span className="text-black">Edit List</span>
                        <PencilSquareIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </button>
                    <button
                        onClick={() => handleDeleteList(data.id)}
                        className="h-fit inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                        <span className="text-red-700 hover:text-red-800">Delete List</span>
                        <TrashIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </button>
                </div>

                <hr/>

                {items.map((item, i) => (<div key={item.id} className="flex flex-row px-5 pt-2">
                    <button className="flex flex-1"
                            onClick={() => handleCheckboxChange(i, item.id)}
                    >
                        <input
                            className="mt-auto mb-auto"
                            type="checkbox"
                            checked={item.check}
                        />
                        <h4 className="px-3">{item.title}</h4>
                    </button>
                    <TrashIcon className="w-6 h-6 text-right cursor-pointer"
                               onClick={() => handleDeleteItem(item.id)}/>
                </div>))}
                {showAddItem && (<form onSubmit={handleSendAddItem} className="flex">
                    <input type="text" onChange={(e) => {
                        setNewItemTitle(e.target.value)
                    }}
                           value={newItemTitle}
                           placeholder="item title..." size={56}
                           className="m-auto mb-1 ring-gray-300 ring-[1.5px] rounded-md"/>
                </form>)}
                <PlusCircleIcon onClick={toggleAddNew} className="w-8 h-8 cursor-pointer m-auto"/>

            </div>)}
    </>);
};

export default TodoListCard;
