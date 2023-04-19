<script>
export default {
  name: "DataTable2",
}
</script>

<script setup>
import { ref, toRef } from "vue";
import useFilter from "../Composables/useFilter";
import useSort from "../Composables/useSort";
import usePaginate from "../Composables/usePaginate";
import { entries } from "../../constants/entries3";
import { columns } from "../../constants/columns3";

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
const { filteredEntries } = useFilter(toRef(props, 'entries'), search, filter)
const { sortedEntries } = useSort(filteredEntries, sort)
const { getOffset, getPages, paginatedEntries, getPagination, getPageInfo } = usePaginate(sortedEntries, limitPerPage, currentPage, ellipsis)

</script>

<template>
  <div class="card cardBody dataTable">
    <slot name="header"></slot>
    <div class="dataTableHeader">
      <div class="group">
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
                </div>
              </template>
            </th>
          </tr>

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
              <template v-else>
                <span :style="{
                  fontWeight:
                    (paginatedEntries?.length == index + 1
                      ? 700
                      : 300
                    )
                }">{{ entry[col.prop] }}</span></template>
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
  align-items: center;
  justify-content: center;
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
  border-right: 1px solid #d9d9d9;
}

.bold {
  font-weight: 900;
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
