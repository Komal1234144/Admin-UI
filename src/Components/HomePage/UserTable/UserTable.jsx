import React from 'react'
import './UserTable.scss';
import { LiaEdit } from 'react-icons/lia';
import { AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';
import { TiTick } from 'react-icons/ti'
import { useEffect } from 'react';

const UserTable = ({ users, setUsers, selectedForDelete, setSelectedForDelete, pageNo, allSelected, setAllSelected }) => {

  const [selectedForEdit, setSelectedForEdit] = useState([])
  const [paginatedList, setPaginatedList] = useState([])

  useEffect(() => {

    // console.log(pageNo)
    let list = users.slice(pageNo * 10, (pageNo + 1) * 10)

    setPaginatedList(list)

  }, [users, pageNo])

  const makeRowsEditable = (user) => {

    let dataElems = document.querySelectorAll(`.data-${user.id}`);

    if (selectedForEdit.includes(user?.id)) {
      setSelectedForEdit(selectedForEdit.filter((id) => id !== user?.id))
      dataElems.forEach((elem) => {
        elem.contentEditable = false
        elem.style.border = 'none'
        elem.style.borderBottom = '1px solid lightgray'
      })

    } else {
      setSelectedForEdit([...selectedForEdit, user?.id]);
      dataElems.forEach((elem) => {
        elem.contentEditable = true
        elem.style.border = '1px solid black'
      })
    }

  }

  const deleteRow = (user) => {

    let newUsers = users.filter((item) => item.id !== user.id)
    setUsers(newUsers)

  }

  const selectRows = (user) => {
    setSelectedForDelete([...selectedForDelete, user?.id]);

    let checkbox = document.getElementById(`checkbox-${user?.id}`);
    checkbox.classList.toggle('checkbox--selected');

    let row = document.getElementById(`row-${user?.id}`);
    row.classList.toggle('row--selected');

  }

  const selectOrDeselectAllRows = () => {

    setAllSelected(!allSelected)
    if (allSelected) {
      setSelectedForDelete([])
    } else {
      setSelectedForDelete(paginatedList.map((user) => {
        return user.id
      }))
    }

    paginatedList.map((user) => {
      let row = document.getElementById(`row-${user?.id}`);
      row.classList.toggle('row--selected');
      return user.id
    })

  }

  return (
    <div className='user-table'>

      <table>

        <thead>
          <tr>
            <th>
              <div className={`checkbox ${allSelected ? 'checkbox--selected' : ''}`}
                style={{
                  border: '2px solid white'
                }}
                onClick={() => {
                  selectOrDeselectAllRows()
                }}
              >
                <TiTick className='checkbox__tick' />
              </div>
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {paginatedList?.map((user) => (
            <tr key={user.id} id={`row-${user?.id}`}>
              <td>
                <div className={`checkbox ${allSelected ? 'checkbox--selected' : ''}`}
                  id={`checkbox-${user?.id}`}

                  onClick={() => {
                    if (allSelected) return;
                    selectRows(user)
                  }}

                >
                  <TiTick className='checkbox__tick' />
                </div>
              </td>
              <td className={`data-${user.id}`}>{user.name}</td>
              <td className={`data-${user.id}`}>{user.email}</td>
              <td className={`data-${user.id}`}>{user.role}</td>
              <td className='action-icons'>

                <LiaEdit className='action-icons__icon'
                  onClick={() => {
                    if (allSelected) return;
                    makeRowsEditable(user)

                  }}
                />

                <AiFillDelete className='action-icons__icon'
                  onClick={() => {
                    if (allSelected) return;
                    deleteRow(user)
                  }}
                />

              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default UserTable