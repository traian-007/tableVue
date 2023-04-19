export const columns = [
    { prop: "feature", text: "", type: "text" },
    {
        prop: "basic",
        text: "Basic",
        type: "text",
        filter: false,
        filterType: "select",
    },
    { prop: "standard", text: "Standard", type: "text", filter: false },
    { prop: "premium", text: "Premium", type: "text", filter: false },
    {
        prop: "action",
        text: "",
        type: "slot",
        sort: false,
        align: "right",
        width: "160px",
    },
  ]