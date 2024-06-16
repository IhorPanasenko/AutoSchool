import "./datatable.scss"
import { DataGrid } from "@mui/x-data-grid"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

const Datatable = ({ columns }) => {
  const location = useLocation()
  const path = location.pathname
  console.log("path", path)
  const [list, setList] = useState([])
  const { data, deleteData, patchData } = useFetch(
    `http://localhost:3000/api${path}?all=true`
  )
  console.log("data", data)

  useEffect(() => {
    setList(data.data)
  }, [data])
  console.log("list", list)

  const handleDelete = async id => {
    try {
      await deleteData(`http://localhost:3000/api${path}/${id}`)
      setList(list.filter(item => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }
  const handleAccept = async id => {
    try {
      await patchData(`http://localhost:3000/api/students/${id}/accept-request`)
      setList(list.filter(item => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }
  const handleReject = async id => {
    try {
      await patchData(`http://localhost:3000/api/students/${id}/reject-request`)
      setList(list.filter(item => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      }
    }
  ]
  const actionColumnForRequests = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: params => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => handleAccept(params.row._id)}
            >
              Accept
            </div>
            <div
              className="deleteButton"
              onClick={() => handleReject(params.row._id)}
            >
              Reject
            </div>
          </div>
        )
      }
    }
  ]

  const renderContent = () => {
    switch (path) {
      case "/students/requests":
        return (
          <>
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns.concat(actionColumnForRequests)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          </>
        )

      case "/instructors":
        return (
          <>
            <div className="datatableTitle">
              {path}
              <Link to={`http://localhost:3001${path}/new`} className="link">
                Add New
              </Link>
            </div>
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          </>
        )
      default:
        return (
          <>
            <DataGrid
              className="datagrid"
              rows={list}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={row => row._id}
            />
          </>
        )
    }
  }

  return (
    <div className="datatable">
      {!list || list.length === 0 ? "loading" : renderContent()}
    </div>
  )
}

export default Datatable
