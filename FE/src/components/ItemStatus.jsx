import {Fragment, useEffect, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {makeAuthRequest} from "../utils/api.jsx";
import {TrashIcon} from "@heroicons/react/24/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ItemStatus({statusFn, status}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        makeAuthRequest('/api/status', {
            method: 'GET'
        })
            .then(res => setData(res.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div className="flex">
                <div>
                    <Menu.Button
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {status}
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                    </Menu.Button>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        {data !== null ? (
                            data.map((item, i) => (
                                <Menu.Item key={i} style={{backgroundColor: item.color}}>
                                    {({active}) => (
                                        <a
                                            onClick={() => statusFn({status: item.status, id: item.id})}
                                            className={classNames(
                                                active ? 'bg-white text-gray-50' : 'text-white',
                                                'block px-4 py-2 text-sm cursor-pointer'
                                            )}
                                        >
                                            {item.status}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))
                        ) : null}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
