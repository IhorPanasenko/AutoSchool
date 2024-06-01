import styles from "./myLessons.module.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import axios from "axios"
import { Card, Row, Col, Button } from "react-bootstrap"

const MyLessons = ({ columns }) => {
  //   const location = useLocation()
  //   const path = location.pathname
  //   console.log("path", path)
  console.log("columns", columns)

  const [list, setList] = useState([])
  const { data, deleteData, patchData } = useFetch(
    `http://localhost:3000/api/lessons/my`
  )
  console.log("data", data)

  useEffect(() => {
    setList(data.data)
  }, [data])
  console.log("list", list)

  const handleDelete = async id => {
    try {
      await patchData(
        `http://localhost:3000/api/lessons/${id}/cancel-my-lesson`
      )
      setList(list.filter(item => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }
  //   const handleAccept = async id => {
  //     try {
  //       await patchData(`http://localhost:3000/api/students/${id}/accept-request`)
  //       setList(list.filter(item => item._id !== id))
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   const handleReject = async id => {
  //     try {
  //       await patchData(
  //         `http://localhost:3000/api/lessons/${id}/cancel-my-lesson`
  //       )
  //       setList(list.filter(item => item._id !== id))
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className={styles.cellAction}>
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      }
    }
  ]
  //   const actionColumnForRequests = [
  //     {
  //       field: "action",
  //       headerName: "Action",
  //       width: 200,
  //       renderCell: params => {
  //         return (
  //           <div className={styles.cellAction}>
  //             {/* <Link to="/users/test" style={{ textDecoration: "none" }}>
  //               <div className="viewButton">View</div>
  //             </Link> */}
  //             {/* <div
  //               className="viewButton"
  //               onClick={() => handleAccept(params.row._id)}
  //             >
  //               Accept
  //             </div> */}
  //             <div
  //               className={styles.deleteButton}
  //               onClick={() => handleReject(params.row._id)}
  //             >
  //               Reject
  //             </div>
  //           </div>
  //         )
  //       }
  //     }
  //   ]

  const renderContent = () => {
    return (
      <div>
        {/* <div className="datatableTitle">
              {path}
              <Link to={`/${path}/new`} className="link">
                Add New
              </Link>
            </div> */}
        <DataGrid
          className={styles.datagrid}
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={row => row._id}
        />
      </div>
    )
    // Add more cases for other paths if needed
    //   case "/instructors":
    //     return (
    //       <>
    //         <div className="datatableTitle">
    //           {path}
    //           <Link to={`/${path}/new`} className="link">
    //             Add New
    //           </Link>
    //         </div>
    //         <DataGrid
    //           className="datagrid"
    //           rows={list}
    //           columns={columns.concat(actionColumn)}
    //           pageSize={9}
    //           rowsPerPageOptions={[9]}
    //           checkboxSelection
    //           getRowId={row => row._id}
    //         />
    //       </>
    //     )
    //   default:
    //     return (
    //       <>
    //         {/* <div className="datatableTitle">
    //           {path}
    //           <Link to={`/${path}/new`} className="link">
    //             Add New
    //           </Link>
    //         </div> */}
    //         <DataGrid
    //           className="datagrid"
    //           rows={list}
    //           columns={columns}
    //           pageSize={9}
    //           rowsPerPageOptions={[9]}
    //           checkboxSelection
    //           getRowId={row => row._id}
    //         />
    //       </>
    //     )
    // }
  }

  return (
    <div className={styles.datatable}>
      {!list || list.length === 0 ? "loading" : renderContent()}
    </div>
  )
}

export default MyLessons
