import React, { useEffect, useState } from 'react'
import './Pagination.scss';
import { BiSolidChevronsLeft, BiSolidChevronLeft, BiSolidChevronsRight, BiSolidChevronRight } from 'react-icons/bi'

const Pagination = ({ users, pageNo, setPageNo }) => {

  const [noOfPages, setNoOfPages] = useState([]);

  useEffect(() => {
    let pages = Math.ceil(users.length / 10);
    let pagesArr = [];

    for (let i = 0; i < pages; i++) {
      pagesArr.push(i);
    }

    setNoOfPages(pagesArr);

  }, [users, pageNo])

  const setPageToFirst = () => {
    if (pageNo === 0) return
    setPageNo(0)
  }

  const setPageToLast = () => {
    if (pageNo === noOfPages[noOfPages.length - 1]) return
    setPageNo(noOfPages[noOfPages.length - 1])
  }

  const setPageToNext = () => {
    if (pageNo === noOfPages[noOfPages.length - 1]) return
    setPageNo((pageNo) => (pageNo + 1))
  }

  const setPageToPrev = () => {
    if (pageNo === 0) return
    setPageNo((pageNo) => (pageNo - 1))
  }

  const changeRandomPage = (page) => {
    setPageNo(page)
  }


  return (
    <div className='pagination'>

      <div className={`pagination__page ${pageNo === 0 ? 'pagination__page--disabled' : ''}`}
        onClick={setPageToFirst}
      >
        <BiSolidChevronsLeft />
      </div>

      <div className={`pagination__page ${pageNo === 0 ? 'pagination__page--disabled' : ''}`}
        onClick={setPageToPrev}
      >
        <BiSolidChevronLeft />
      </div>


      {
        noOfPages?.map((page, index) => {
          return <div key={index} className={`pagination__page ${pageNo === index ? 'pagination__page--active' : ''}`}
          onClick={() => changeRandomPage(page)}
          >{page + 1}</div>
        })
      }

      <div
        className={`pagination__page ${pageNo === noOfPages[noOfPages.length - 1] ? 'pagination__page--disabled' : ''}`}
        onClick={setPageToNext}
      >
        <BiSolidChevronRight />
      </div>

      <div className={`pagination__page ${pageNo === noOfPages[noOfPages.length - 1] ? 'pagination__page--disabled' : ''}`}
        onClick={setPageToLast}
      >
        <BiSolidChevronsRight />
      </div>

    </div>
  )
}

export default Pagination