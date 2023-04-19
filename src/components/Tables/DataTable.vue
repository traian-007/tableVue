<script>
export default {
  name: "DataTable",
}
</script>

<script setup>
import { ref, toRef } from "vue";
import useTable from "../Composables/useTable";
import useFilter from "../Composables/useFilter";
import useSort from "../Composables/useSort";
import usePaginate from "../Composables/usePaginate";
import PaginationBox from "./PaginationBox.vue";
import { entries } from "../../constants/entries";
import { columns } from "../../constants/columns";

const props = defineProps({
  columns: Array,
  filterBy: String,
  filterDelay: Number,
  sortBy: Array,
  entries: Array,
  footers: Array,
  placeholder: String,
});

const emit = defineEmits(["checklist", "filter", "sort"]);
const limitPerPage = ref(10);
const currentPage = ref(1);
const ellipsis = ref(2);
const search = ref("");
const filter = ref({});
const sort = ref({
  col: props?.sortBy?.[0] || props.columns?.[0]?.prop || '',
  by: props?.sortBy?.[1] || 'desc'
})
const { getColumnProperties, getColumnData } = useTable(toRef(props, 'columns'), toRef(props, 'entries'))
const { filteredEntries } = useFilter(toRef(props, 'entries'), search, filter)
const { sortedEntries } = useSort(filteredEntries, sort)
const { getOffset, getPages, paginatedEntries, getPagination, getPageInfo } = usePaginate(sortedEntries, limitPerPage, currentPage, ellipsis)
const checkedAll = ref(null)
const checkedRefs = ref([])
const setCheckedRef = (el) => {
  if (el) {
    checkedRefs.value.push(el)
  }
}
const checks = ref([])
const checkedRows = (e, colProp) => {
  if (e.target.checked === true) {
    //@ts-ignore
    checks.value = paginatedEntries.value.map((mi) => mi[colProp])
  } else {
    checks.value = []
  }
  emit('checklist', checks.value)
}
const removeChecked = (item) => {
  //@ts-ignore
  const getIndex = checks.value.findIndex((fi) => fi === item)
  checks.value.splice(getIndex, 1)
}
const singleCheck = (e, entryProp) => {
  if (e.target.checked === true && !checks.value.includes(entryProp)) {
    checks.value.push(entryProp)
  } else {
    removeChecked(entryProp)
  }
  emit('checklist', checks.value)
}
const filterColumns = (columns) => {
  filter.value = columns
  emit('filter', filter.value)
}
const sortColumns = (value) => {
  sort.value = value
  emit('sort', sort.value)
}
const searchBy = ref('')
const searchRef = ref(null)
const searchTimer = ref(undefined)
const searchHandler = () => {
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(() => {
    search.value = ''
    filter.value = {}
    if (searchRef.value?.value) {
      if (searchBy.value !== '') {
        filter.value[searchBy.value] = searchRef.value.value
      } else {
        search.value = searchRef.value.value
      }
      resetPage()
    }
  }, (props?.filterDelay || 500))
}
const resetPage = (val) => {
  if (val) currentPage.value = val;
  if (currentPage.value >= getPages.value) {
    currentPage.value = getPages.value
  }
}
const filterByInput = ref({})
const filterTimer = ref(undefined)
const filterHandler = (propVal) => {
  clearTimeout(filterTimer.value)
  filterTimer.value = setTimeout(() => {
    filter.value[propVal] = ''
    if (filterByInput.value?.[propVal] && filterByInput.value?.[propVal] !== '') {
      filter.value[propVal] = filterByInput.value[propVal]
    }
    emit('filter', filter.value)
    resetPage()
  }, (props?.filterDelay || 1000))
}
</script>

<template>
  <div class="card cardBody dataTable">
    <slot name="header"></slot>
    <div class="dataTableHeader">
      <div class="group">
        <span class="button groupItem searchLoop">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="pointerEvents-none bi bi-search" viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
        <input type="search" ref="searchRef" @input="searchHandler" @keyup.enter="searchHandler"
          class="input groupItem" />
        <select v-if="filterBy === 'search'" v-model="searchBy" @change="searchHandler"
          class="select groupItem dataTableSearchBy">
          <option value="">All</option>
          <template>
            <table v-for="(col, ind) in columns" :key="new Date() + ind">
              <option v-if="col?.filter" :value="col.prop">
                {{ col.text }}
              </option>
            </table>
          </template>
        </select>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="tableResponsive">
      <table class="table tableList dataTableBody" style="background-color: white;">
        <thead>
          <tr>
            <th v-for="(col, ind) in columns" :key="'col-' + ind" :style="{ 'text-align': 'center', width: col?.width }">
              <div class="check" v-if="col.type === 'checkbox'">
                <!-- <input type="checkbox" ref="checkedAll" class="checkInput" @change="checkedRows($event, col.prop)" /> -->
              </div>
              <template v-else-if="col.sort === false">
                <span>{{ col.text }}</span>
              </template>
              <template v-else>
                <div class="dataTableSort">
                  <span>{{ col.text }}</span>
                  <span v-if="sort.col === col.prop && sort.by === 'asc'"
                    @click="
                      sort.col = col.prop;
                    sort.by = 'desc';
                    emit('sort', sort);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-sort-alpha-down tableEvent" viewBox="0 0 16 16">
                      <path fill-rule="evenodd"
                        d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z" />
                      <path
                        d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                    </svg>
                  </span>
                  <span v-else-if="sort.col === col.prop && sort.by === 'desc'"
                    @click="
                      sort.col = col.prop;
                    sort.by = 'asc';
                    emit('sort', sort);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-sort-alpha-up-alt tableEvent" viewBox="0 0 16 16">
                      <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                      <path fill-rule="evenodd"
                        d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                      <path
                        d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                    </svg>
                  </span>
                  <span v-else
                    @click="
                      sort.col = col.prop;
                    sort.by = 'asc';
                    emit('sort', sort);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-sort-numeric-up tableEvent" viewBox="0 0 16 16">
                      <path
                        d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z">
                      </path>
                      <g transform="translate(7 0)">
                        <path
                          d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z">
                        </path>
                      </g>
                    </svg>
                  </span>
                </div>
              </template>
            </th>
          </tr>
          <template v-if="filterBy === 'column' || filterBy === 'filter'">
            <tr>
              <th v-for="(col, ind) in columns" :key="'filter-' + ind">
                <div v-if="col.filter === true && 'prop' in col">
                  <template v-if="col.filterType === 'select'">
                    <select class="select" v-model="filter[col.prop]"
                      @change="
                        emit('filter', filter);
                      resetPage();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ">
                      <option value="" selected></option>
                      <option v-for="(tkCol, tkInd) in getColumnData(col.prop)" :key="tkInd" :value="tkCol">
                        {{ tkCol }}
                      </option>
                    </select>
                  </template>
                  <template v-else>
                    <!-- <input type="text" v-model="filterByInput[col.prop]" class="input" @input="filterHandler(col.prop)"> -->
                    <input type="text" v-model="filter[col.prop]" class="input">
                  </template>
                </div>
              </th>
            </tr>
          </template>
        </thead>
        <tbody :style="{
          height:
            (paginatedEntries?.length <= 4
              ? 240
              : Number(paginatedEntries?.length) * 60) + 'px',
        }">
          <tr v-if="Number(paginatedEntries?.length) === 0">
            <td :colspan="columns?.length" class="dataTableEmpty">
              {{ placeholder || "The data on this page is not yet available." }}
            </td>
          </tr>
          <tr v-for="(entry, index) in paginatedEntries" :key="'entry-' + index">
            <td v-for="(col, ind) in columns" :key="'col-' + ind"
              :style="{ 'text-align': col?.align, width: col?.width }">
              <template v-if="col.type === 'slot'">
                <slot :name="col.prop" :entry="entry" :index="index"></slot>
              </template>
              <template v-else>{{ ind === 0 ? (index + 1) + ((currentPage - 1) * limitPerPage) : entry[col.prop]
              }}</template>
            </td>
          </tr>
          <template v-if="Number(entries?.length) >= 1 && Number(entries?.length) <= 3">
            <tr v-for="num in 4 - Number(entries?.length)" v-bind:key="num" style="height: 60px">
              <td v-if="num === 1" :rowspan="4 - Number(entries?.length)" :colspan="columns?.length"></td>
            </tr>
          </template>
        </tbody>
        <tfoot v-if="footers && Array.isArray(footers[0])">
          <tr v-for="(footer, index) in footers" :key="'row-' + index">
            <th v-for="(foot, ind) in footer" :key="'foot-' + ind">
              <template v-if="foot.type === 'slot'">
                <slot :value="foot.value" :options="foot.options"></slot>
              </template>
              <template v-else>{{ foot.text }}</template>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="dataTableFooter">
      <div class="dataTableLimit">
        <div class="dataTableSelect">
          <select v-model="limitPerPage" class="select" @change="resetPage()">
            <option :value="5">5</option>
            <option :value="7">7</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>
        <div class="dataTableInfo">
          from {{ getPageInfo.start }} to {{ getPageInfo.end }} of
          {{ getPageInfo?.length }}
        </div>
      </div>
      <PaginationBox :currentPage="currentPage" @resetPage="resetPage" :pages="getPages" :items="getPagination" />
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<style scoped>
.dataTable {
  padding: 10px;
  padding-right: 15px;
}

.dataTable .dataTableHeader,
.dataTable .dataTableFooter {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.group {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: stretch;
}

.group:not(.groupList) .groupItem:not(:last-child) {
  border-right-color: transparent;
}



.group .groupItem {
  flex: 1 1 auto;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.group:not(.groupList) .groupItem:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.gap-5px {
  gap: 5px !important;
}

.bdColor-darken\(primary\,20\) {
  border-color: #4caf50 !important;
}

.primary-dark-20 {
  background-color: #18ec1f;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
  appearance: none;
  border: none;
  background-color: transparent;
}

.primary-light {
  background-color: #4caf50 !important;
  border-color: #4caf50 !important;
  color: #fff !important;
}

.d-flex {
  display: flex !important;
}

.button {
  display: inline-block;
  font-weight: 400;
  color: #283541;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  background-color: #fff;
  border: 1px solid #d6d6d6;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.dataTableLimit {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dataTableLimit .dataTableSelect {
  width: 80px;
}

.dataTableInfo {
  flex-grow: 1;
}

select.select:not([multiple]) {
  padding: 0.5rem;
}

.select:not([multiple]) {
  background-image: url(../../assets/img/arrowDown.svg);
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
}

.input,
.select {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: #fff;
  background-clip: padding-box;
  appearance: none;
  color: inherit;
  border: 1px solid #d9d9d9;
  border-radius: 0.375rem;
  outline: 0;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.dataTable .dataTableBody {
  border-left: none;
  border-right: none;
}

.tableList {
  border: 1px solid #d9d9d9;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.tableList thead {
  border-bottom: 1px solid #d9d9d9;
}

.tableList tr {
  border-bottom: 1px solid #d9d9d9;
}

.table tr th,
.table tr td {
  text-align: left;
  vertical-align: middle;
  padding: 0.75rem;
}

.check {
  display: inline-flex;
  align-items: center;
}

.check .checkInput[type="checkbox"] {
  border-radius: 0.25rem;
}

.check .checkInput {
  width: 1.5em;
  height: 1.5em;
  appearance: none;
  background-color: #fff;
  border: 1px solid #d9d9d9;
}

button,
input,
optgroup,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

.dataTableSort {
  display: flex;
  justify-content: space-between;
}

.tableList tr:last-child {
  border-bottom-width: 0px;
}

.tableList tr {
  border-bottom: 1px solid #d9d9d9;
}

.check .checkInput[type="checkbox"] {
  border-radius: 0.25rem;
}

.check .checkInput {
  width: 1.5em;
  height: 1.5em;
  appearance: none;
  background-color: #fff;
  border: 1px solid #d9d9d9;
}

.bdColor-darken\(warning\,20\) {
  border-color: #ebad00 !important;
}

.warning-light {
  background-color: #ffc107 !important;
  border-color: #ffc107 !important;
  color: #fff !important;
}

.bdColor-darken\(danger\,20\) {
  border-color: #c82131 !important;
}

.danger-light {
  background-color: #dc3545 !important;
  border-color: #dc3545 !important;
  color: #fff !important;
}

.searchLoop {
  padding-top: 11px;
}

/* @use card;
@use form;
@use table;
@use dataTable; */
</style>
