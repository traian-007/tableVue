<template>
  <DataTable2Vue :columns="columns" :entries="entries" filterBy="column" :sortBy="['id', 'asc']" @checklist="checks">
    <template #default>
      <div class="d-flex gap-5px">
        <button type="button" @click="pressButton(['add new'])"
          class="button primary-light bdColor-darken(primary,20) hover:primary-dark-20">
          Add New Feature
        </button>
      </div>
    </template>
    <template v-slot:action="{ entry }">
      <div class="d-flex gap-5px">
        <!-- <button type="button" @click="pressButton(entry)"
          class="button warning-light bdColor-darken(warning,20) hover:warning-dark-20">
          Edit
        </button> -->
        <button type="button" @click="pressButton(entry)"
          class="button danger-light bdColor-darken(danger,20) hover:danger-dark-20">
          Edit
        </button>
      </div>
    </template>
  </DataTable2Vue>
</template>
<script>
// import { SimpleTable, OrderedTable } from "@/components";
import { ref } from "vue";
import DataTable2Vue from "../components/Tables/DataTable2.vue";
import { entries } from "../constants/entries3.js";
import { columns } from "../constants/columns3.js";

const total = ref(1);
const columnData = ref({});
const limit = ref(10);
const offset = ref(0);
const search = ref("");
const filter = ref({
  name: "",
  position: "",
  office: "",
  extension: "",
  startdate: "",
  salary: "",
});
const sort = ref({
  col: "id",
  by: "asc",
});
const allData = ref({
  limit: 10,
  page: 1,
  offset: 0,
  search: "",
  searchBy: "",
  filter: {
    name: "",
    position: "",
    office: "",
    extension: "",
    startdate: "",
    salary: "",
  },
  sort: "id",
  sortBy: "desc",
  total: 1,
  length: 10,
  from: 1,
  to: 10,
});
const getEntries = ref(entries?.slice(0, 10));
// const setEntries = async () => {
//   const response = await fetch(
//     `http://localhost:3000/?limit=${limit.value}&offset=${offset.value}&sort_col=${sort.value.col}&sort_by=${sort.value.by}&search=${search.value}&filter_name=${filter.value.name}&filter_position=${filter.value.position}&filter_office=${filter.value.office}&filter_extension=${filter.value.extension}&filter_startdate=${filter.value.startdate}&filter_salary=${filter.value.salary}`
//   );
//   const json = await response.json();
//   getEntries.value = json.entries || [];
//   columnData.value = json.columns || {};
//   total.value = json.total || 1;
// };
//onMounted(setEntries)
//watch(allData, setEntries)

export default {
  components: {
    DataTable2Vue
  },
  data() {
    return {
      entries,
      columns,
    };
  },
  props: {
  },
  methods: {
    pressButton: (val) => {
      alert(JSON.stringify(val));
    },
    checks: (val) => {
      console.log(val);
    },
    serverHandler: (val) => {
      console.log(val);
    },
  },
};
</script>
<style scoped>
.danger-light {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
  color: #fff !important;
  width: 5rem;
}
</style>
