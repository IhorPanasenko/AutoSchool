import styles from "./myLessons.module.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import { Snackbar, Alert } from "@mui/material"
import axios from "axios"
import { Card, Row, Col, Button } from "react-bootstrap"

const MyLessons = ({ columns }) => {
  //   const location = useLocation()
  //   const path = location.pathname
  //   console.log("path", path)
  console.log("columns", columns)

  const [list, setList] = useState([])
  const [open, setOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("success")

  const { data, deleteData, patchData, getData } = useFetch()
  // `http://localhost:3000/api/lessons/my`
  console.log("data", data)
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  // useEffect(() => {
  //   setList(data.data)
  // }, [data])
  // console.log("list", list)
  function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getData("http://localhost:3000/api/lessons/my")
        let dates = result.data

        const formattedData = dates.map(item => ({
          ...item,
          date: formatDate(item.date)
        }))
        console.log("formattedData", formattedData)
        setList(formattedData)
        console.log(" New data.data ", data.data)
        console.log(" New data.data result", result)
      } catch (err) {
        console.error("Failed to fetch lessons my", err)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async id => {
    try {
      let result = await patchData(
        `http://localhost:3000/api/lessons/${id}/cancel-my-lesson`
      )
      console.log("result delete", result)
      if (result.status == "success") {
        setList(list.filter(item => item._id !== id))
      } else {
        alert(
          "Відмінити урок не вдалося оскільки він вже минув або буде менше ніж за день."
        )
      }
    } catch (err) {
      console.log(err)
      alert("Произошла ошибка при попытке удалить урок.")
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className={styles.cellAction}>
            <div
              className={styles.deleteButton}
              onClick={() => handleDelete(params.row._id)}
            >
              Cansel lesson
            </div>
          </div>
        )
      }
    }
  ]

  const renderContent = () => {
    return (
      <div>
        <DataGrid
          className={styles.datagrid}
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          // checkboxSelection
          getRowId={row => row._id}
        />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
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
