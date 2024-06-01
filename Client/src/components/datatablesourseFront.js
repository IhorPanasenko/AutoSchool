import { format } from "date-fns";
export const myLessonsColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    // { field: "carModel", headerName: "car", width: 190, valueGetter: params => params.row.car.model },
    { field: "date", headerName: "date", width: 230 },
    // {
    //     field: "date",
    //     headerName: "date",
    //     width: 230,
    //     valueGetter: params => {
    //         return format(new Date(params.row.date), "MM/dd/yyyy"); // You can customize the format string as needed
    //     }
    // },
    { field: "fromHour", headerName: "from", width: 130 },
    { field: "toHour", headerName: "to", width: 130 },
    { field: "price", headerName: "price", width: 130 }
];
