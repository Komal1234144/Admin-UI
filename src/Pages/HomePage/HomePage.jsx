import React from 'react'
import './HomePage.scss'
import SearchBar from '../../Components/HomePage/SearchBar/SearchBar';
import Pagination from '../../Components/HomePage/Pagination/Pagination';
import UserTable from '../../Components/HomePage/UserTable/UserTable';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [users, setUsers] = useState([])
    const [pageNo, setPageNo] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [selectedForDelete, setSelectedForDelete] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    const [timerId , setTimerId] = useState(null)


    useEffect(() => {

        // console.log(timerId)

        if (timerId) {
            clearTimeout(timerId);
        }

        let timer = setTimeout(() => {

            axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json',
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {

                        let users = response.data;
                        let filteredUsers = users.filter((user) => {
                            return user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                                user.role.toLowerCase().includes(searchText.toLowerCase())
                        })

                        // console.log(filteredUsers)

                        setUsers(filteredUsers)

                    } else {
                        setUsers([])
                    }
                })

            // console.log('hiiii there')

        }, 1000)

        setTimerId(timer)

        console.log(timerId)

    }, [searchText])

    const deleteManyUsers = () => {
        let newUsers = users.filter((user) => !selectedForDelete.includes(user.id))
        setUsers(newUsers)
        setSelectedForDelete([])
        setAllSelected(false)
    }

    return (
        <div className='home-page'>

            <div className='home-page__title'>
                Admin UI
            </div>

            <div>
                <SearchBar
                    users={users}
                    setUsers={setUsers}
                    searchText={searchText}
                    setSearchText={setSearchText}
                />
            </div>

            <div>
                <UserTable
                    users={users}
                    setUsers={setUsers}
                    pageNo={pageNo}
                    selectedForDelete={selectedForDelete}
                    setSelectedForDelete={setSelectedForDelete}
                    allSelected={allSelected}
                    setAllSelected={setAllSelected}
                />
            </div>

            <div className='home-page__pagination-container'>
                <button className='home-page__btn'
                    onClick={deleteManyUsers}
                >Delete All</button>
                <Pagination
                    users={users}
                    pageNo={pageNo}
                    setPageNo={setPageNo}
                />
            </div>

        </div>
    )
}

export default HomePage;