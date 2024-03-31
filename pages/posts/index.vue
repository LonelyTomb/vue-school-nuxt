<script setup lang="ts">
import PostCard from "~/components/PostCard.vue";
import type { PostWithUser } from "~/types";

const $route = useRoute();
const { order } = $route.query;
const posts = ref<PostWithUser[]>([]);

const query = ref({
  limit: 10,
  offset: 10,
  include: "user",
  order: order || "oldestFirst",
  select:
    "id,title,excerpt,publishedAt,image,user.firstName,user.lastName,user.avatar,",
});

const { data, pending } = await useFetch("/api/posts", {
  query,
});

watch(
  data,
  (val) => {
    posts.value = [...posts.value, ...(val as PostWithUser[])];
  },
  { immediate: true }
);

const fetchMore = () => {
  query.value.offset = query.value.offset + query.value.limit;
};

const handleSorting = (sortingOrder: "newestFirst" | "oldestFirst") => {
  query.value.order = sortingOrder;
  posts.value = [];
};

useSeoMeta({
  title: "Blog Posts",
  description: "Blog posts",
});
</script>

<template>
  <main class="min-h-screen py-4 px-4 max-w-screen-xl mx-auto prose">
    <section class="text-center">
      <h1 class="text-center text-2xl mb-4 page__title">Our Blog Posts </h1>
    </section>
    <SortCheckbox @sort="handleSorting" />
    <section
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center"
      v-if="posts.length"
    >
      <PostCard v-for="post in posts" :key="post.id" :post="post"></PostCard>
    </section>
    <div class="flex justify-center py-6">
      <button class="mx-auto hover:bg-black/75 px-6 py-2 bg-black text-white rounded" @click.prevent="fetchMore" :disabled="pending">
        {{pending  ? 'Loading' : 'Load More' }}
      </button>
    </div>
  </main>
</template>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin: 0;
}
</style>
