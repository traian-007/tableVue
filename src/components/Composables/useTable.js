import { ref, computed, Ref } from "vue";

export default function useTable(getColumns, getRows) {
  const getColumnProperties = computed(() => {
    return getColumns.value.map((item) => {
      if ((typeof item === "object" && "prop" in item) || "property" in item) {
        return item.prop || item.property;
      }
    });
  });

  const getColumnData = (prop) => {
    const takeColumn = getRows.value.map((item) => {
      return item[prop];
    });
    return Array.from(new Set(takeColumn));
  };

  return {
    getColumnProperties,
    getColumnData,
  };
}
