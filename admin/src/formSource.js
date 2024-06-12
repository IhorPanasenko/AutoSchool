export const userInputs = [
    {
        id: "username",
        label: "username",
        type: "text",
        placeholder: "john_doe"
    },
    {
        id: "email",
        label: "email",
        type: "mail",
        placeholder: "john_doe@gmail.com"
    },
    {
        id: "password",
        label: "password",
        type: "password"
    }
];
export const instructorInputs = [
    {
        id: "name",
        label: "Name ",
        type: "text",
        placeholder: "instructor name"
    },
    {
        id: "surname",
        label: "Surname ",
        type: "text",
        placeholder: "instructor surname"
    },
    {
        id: "email",
        label: "Email ",
        type: "email",
        placeholder: "instructor email"
    },
    {
        id: "password",
        label: "Password ",
        type: "password",
        placeholder: "instructor password"
    },
    {
        id: "model",
        label: "Car Model",
        type: "text",
        placeholder: "Enter car model"
    },
    {
        id: "cityId",
        label: "cityId",
        type: "text",
        placeholder: "Enter cityId"
    },
    {
        id: "year",
        label: "Year",
        type: "number",
        placeholder: "Enter year (1980 - " + new Date().getFullYear() + ")",
        min: 1980,
        max: new Date().getFullYear()
    },
    {
        id: "transmission",
        label: "Transmission",
        type: "select",
        options: [
            { value: "manual", label: "Manual" },
            { value: "automatic", label: "Automatic" }
        ],
        placeholder: "Select transmission type"
    },
    {
        id: "workExperience",
        label: "Work Experience",
        type: "number",
        placeholder: "Enter work experience in years"
    },
    {
        id: "maxNumOfStudents",
        label: "Max Number of Students",
        type: "number",
        placeholder: "Enter maximum number of students"
    },
    {
        id: "instructorPhoto",
        label: "Instructor Photo",
        type: "file",
        accept: "image/*",
        placeholder: "Upload instructor photo"
    },
    {
        id: "carPhoto",
        label: "Car Photo",
        type: "file",
        accept: "image/*",
        placeholder: "Upload car photo"
    }
];

export const warehouseInputs = [
    {
        id: "en.name",
        label: "Name English",
        type: "text",
        placeholder: "Warehouse"
    },
    {
        id: "en.description",
        label: "Description English",
        type: "text",
        placeholder: "Description"
    },
    {
        id: "en.city",
        label: "City English",
        type: "text",
        placeholder: "Kyiv"
    },
    {
        id: "en.adress",
        label: "Adress English",
        type: "text",
        placeholder: "Kyiv"
    },
    {
        id: "en.size",
        label: "Size English",
        type: "text",
        placeholder: "m"
    },
    {
        id: "ukr.name",
        label: "Name Ukrainian",
        type: "text",
        placeholder: "Склад"
    },
    {
        id: "ukr.description",
        label: "Description Ukrainian",
        type: "text",
        placeholder: "Опис"
    },
    {
        id: "ukr.city",
        label: "City Ukrainian",
        type: "text",
        placeholder: "Київ"
    },
    {
        id: "ukr.adress",
        label: "Adress Ukrainian",
        type: "text",
        placeholder: "Київ"
    },
    {
        id: "ukr.size",
        label: "Size Ukrainian",
        type: "text",
        placeholder: "m"
    },
    // {
    //     id: "electricity",
    //     label: "Electricity",
    //     type: "checkbox",
    //     placeholder: "1",
    // },
    // {
    //     id: "plumbing",
    //     label: "Plumbing",
    //     type: "checkbox",
    //     placeholder: "1",
    // },
    // {
    //     id: "protection",
    //     label: "Protection",
    //     type: "checkbox",
    //     placeholder: "1",
    // },
    {
        id: "priceMonth",
        label: "PriceMonth",
        type: "text",
        placeholder: "100"
    },
    {
        id: "priceYear",
        label: "PriceYear",
        type: "text",
        placeholder: "100"
    }
];
