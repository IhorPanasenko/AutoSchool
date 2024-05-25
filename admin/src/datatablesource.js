export const userColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    // {
    //     field: "user",
    //     headerName: "User",
    //     width: 200,
    //     renderCell: params => {
    //         return (
    //             <div className="cellWithImg">
    //                 {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
    //                 {params.row.username}
    //             </div>
    //         );
    //     }
    // },
    {
        field: "name",
        headerName: "name",
        width: 230
    },
    {
        field: "surname",
        headerName: "surname",
        width: 230
    },
    {
        field: "role",
        headerName: "role",
        width: 230
    }

    // {
    //     field: "photoURL",
    //     headerName: "photoURL",
    //     width: 230
    // },
    // {
    //     field: "password",
    //     headerName: "Password",
    //     width: 270
    // }
];

export const studentsColumns = [
    { field: "_id", headerName: "ID", width: 230 },

    {
        field: "photoURL",
        headerName: "Photo",
        width: 100,
        renderCell: params => (
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img
                    src={params.value}
                    alt="avatar"
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                />
            </div>
        )
    },
    {
        field: "name",
        headerName: "name",
        width: 200
    },
    {
        field: "surname",
        headerName: "surname",
        width: 200
    },
    {
        field: "requestStatus",
        headerName: "requestStatus",
        width: 200
    },
    {
        field: "vehicleCategory",
        headerName: "vehicleCategory",
        width: 150
    }
];
export const instructorsColumns = [
    { field: "_id", headerName: "ID", width: 230 },

    {
        field: "photoURL",
        headerName: "Photo",
        width: 100,
        renderCell: params => (
            <div
                style={{
                    width: "50px",
                    height: "50px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <img
                    src={params.value}
                    alt="avatar"
                    style={{ maxWidth: "100%", maxHeight: "100%", width: "auto", height: "auto" }}
                />
            </div>
        )
    },
    {
        field: "name",
        headerName: "name",
        width: 150
    },
    {
        field: "surname",
        headerName: "surname",
        width: 150
    },
    // {
    //     field: "carModel",
    //     headerName: "car",
    //     width: 190,
    //     valueGetter: params => params.row.car.model
    // },
    {
        field: "currentNumOfStudents",
        headerName: "students number",
        width: 130
    },
    {
        field: "vehicleCategory",
        headerName: "category",
        width: 100
    }
];
export const citiesColumns = [
    { field: "_id", headerName: "ID", width: 290 },
    { field: "nameEN", headerName: "nameEN ", width: 290 },
    { field: "nameUA", headerName: "nameUA", width: 290 }
];
export const studentsWithInstructorRequestColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    { field: "userId", headerName: "userId", width: 230 },
    { field: "name", headerName: "name ", width: 130 },
    { field: "surname", headerName: "surname", width: 130 },
    { field: "requestStatus", headerName: "requestStatus", width: 130 },
    { field: "vehicleCategory", headerName: "category", width: 130 }
];
export const reservationsColumns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
        field: "user",
        headerName: "User Id",
        width: 160
    },
    {
        field: "warehouse",
        headerName: "Warehouse Id",
        width: 160
    },
    {
        field: "startDate",
        headerName: "startDate",
        width: 150
    },
    {
        field: "endDate",
        headerName: "endDate",
        width: 150
    },
    {
        field: "totalPrice",
        headerName: "Total Price",
        width: 150
    }
];
export const warehousesColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "en.name",
        headerName: "Name(English)",
        width: 100
    },
    {
        field: " en ",
        headerName: "Description(English)",
        width: 230
    },
    {
        field: "ukr",
        headerName: "Description",
        width: 200
    },
    {
        field: "electricity",
        headerName: "Electricity",
        width: 100
    },
    {
        field: "plumbing",
        headerName: "Plumbing",
        width: 100
    },
    {
        field: "priceMonth",
        headerName: "PriceMonth",
        width: 100
    },
    {
        field: "priceYear",
        headerName: "PriceYear",
        width: 100
    }
];
