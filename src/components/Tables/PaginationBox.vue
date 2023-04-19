<script setup>
import { ref, computed, watch } from "vue";
import { pagination } from "../../helpers/paginateArray";
const props = defineProps({
  modelValue: Number,
  currentPage: Number,
  pages: Number,
  items: Array,
  ellipsis: Number,
});
const emit = defineEmits(["update:modelValue", "handler"]);
const currentPage = ref(props?.currentPage || 1);
watch(
  () => props.modelValue,
  () => {
    currentPage.value = props.modelValue;
  }
);
const getPagination = computed(() => {
  let newPagination = [];
  if (props?.items) {
    newPagination = props?.items || [];
  } else {
    const totalPages = props.pages;
    const positionOfEllipsis = props?.ellipsis || 2;
    newPagination = pagination(
      totalPages,
      currentPage.value,
      positionOfEllipsis
    );
  }
  return newPagination;
});
const emitCurrentPage = (page) => {
  currentPage.value = page;
  emit("resetPage", currentPage.value);
};
</script>

<template>
  <nav>
    <ul class="pagination dense">
      <li class="item">
        <span class="link" @click="emitCurrentPage(1)"> &laquo; </span>
      </li>
      <li class="item">
        <span class="link" @click="
          emitCurrentPage(
            Number(currentPage) > 1 ? Number(currentPage) - 1 : 1
          )
        ">
          &lsaquo;
        </span>
      </li>
      <li v-for="(item, index) in getPagination" :key="'item-' + index" class="item"
        :class="Number(item) === Number(currentPage) ? 'active' : ''">
        <span v-if="Number(item) === Number(currentPage)" class="link">{{
          item
        }}</span>
        <span v-else-if="item === '...'" class="link">{{ item }}</span>
        <span v-else @click="emitCurrentPage(Number(item))" class="link">{{
          item
        }}</span>
      </li>
      <li class="item">
        <span class="link" @click="
          emitCurrentPage(
            Number(currentPage) < Number(pages)
              ? Number(currentPage) + 1
              : Number(pages)
          )
        ">
          &rsaquo;
        </span>
      </li>
      <li class="item">
        <span class="link" @click="emitCurrentPage(Number(pages))">
          &raquo;
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  padding-left: 0;
  margin: 0;
  list-style: none;
}

.pagination.dense .item:first-child .link {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.pagination.dense .item .link {
  border-style: solid;
  border-color: #cbcbcb;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-right-width: 0px;
  border-left-width: 1px;
  min-width: 10px;
  text-align: center;
}

.pagination .item .link {
  display: block;
  /* padding: 0.5rem 1rem; */
  color: currentColor;
  text-decoration: none;
  cursor: pointer;
}
</style>
