<script setup lang="ts">
const $route = useRoute();
const $router = useRouter();
const { order } = $route.query;
const newestToOldest = ref(false);

onMounted(() => {
  newestToOldest.value = order === "newestFirst";
});

const handleSorting = () => {
  const sortingOrder = newestToOldest.value ? "newestFirst" : "oldestFirst";
  $router.push({
    query: {
      order: sortingOrder,
    },
  });
  emits("sort", sortingOrder);
};

const emits = defineEmits<{ sort: [sortingOrder: "newestFirst" | "oldestFirst"] }>();
</script>

<template>
  <form action="" class="pb-4">
    <div class="flex gap-4 items-center justify-end">
      <label for="sorting" class="text-sm">Newest to Oldest</label>
      <input
        type="checkbox"
        id="sorting"
        v-model="newestToOldest"
        @change="handleSorting"
      />
    </div>
  </form>
</template>

<style scoped lang="scss"></style>
