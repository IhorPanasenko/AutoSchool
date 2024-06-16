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
