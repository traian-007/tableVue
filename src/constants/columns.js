export const columns2 = [
    { prop: "id", text: "ID", type: "checkbox" },
    { prop: "name", text: "Name", type: "text", filter: true },
    {
        prop: "position",
        text: "Position",
        type: "text",
        filter: true,
        filterType: "select",
    },
    { prop: "office", text: "Office", type: "text", filter: true },
    { prop: "extension", text: "Exten.", type: "text", filter: true },
    { prop: "startdate", text: "Start Date", type: "text", filter: true },
    { prop: "salary", text: "Salary", type: "text", filter: true },
    {
        prop: "action",
        text: "Action",
        type: "slot",
        sort: false,
        align: "right",
        width: "160px",
    },
]

export const columns = [
    { prop: "id", text: "ID", type: "checkbox" },
    { prop: "name", text: "Name", type: "text", filter: true },
    {
        prop: "email",
        text: "Email",
        type: "text",
        filter: true,
        filterType: "select",
    },
    { prop: "phone", text: "Phone", type: "text", filter: true },
    { prop: "package", text: "Package", type: "text", filter: true },
    { prop: "status", text: "Status", type: "text", filter: true },
    { prop: "expiredDate", text: "Expired", type: "text", filter: true },
    {
        prop: "action",
        text: "Action",
        type: "slot",
        sort: false,
        align: "right",
        width: "160px",
    },
  ]