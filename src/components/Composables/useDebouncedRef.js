import { customRef } from "vue";

export default function useDebouncedRef(value, delay) {
  let timeout = null;
  return (
    customRef <
    string >
    ((track, trigger) => {
      return {
        get() {
          track();
          return value;
        },
        set(newValue) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            value = newValue;
            trigger();
          }, delay);
        },
      };
    })
  );
}
