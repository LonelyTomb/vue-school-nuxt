<script setup lang="ts">
import type { PostWithUser } from "~/types";

withDefaults(
  defineProps<{
    post: PostWithUser;
  }>(),
  {}
);
</script>

<template>
  <article class="post-card">
    <div class="post-card__header">
      <p class="text-sm">Article</p>
      <p class="post-card__publish_date">
        Published At: {{ new Date(post.publishedAt as number).toDateString() }}
      </p>
    </div>
    <div class="post-card__body">
      <NuxtImg :src="post.image" class="post-card__image" loading="lazy" :alt="post.title" />
      <section>
        <h2 class="post-card__title">{{ post.title }}</h2>
        <p class="post-card__excerpt">{{ post.excerpt }}</p>
      </section>
    </div>
    <div class="post-card__footer">
      <div class="post-card__user">
        <nuxt-img
          :src="post.user.avatar"
          class="post-card__avatar"
          loading="lazy"
          sizes="16px"
          :alt="`avatar of ${post.user.firstName}`"
        />
        <p>{{ post.user.firstName }} {{ post.user.lastName }}</p>
      </div>
      <NuxtLink :to="`/posts/${post.id}`" class="post-card__link"
        >View Post</NuxtLink
      >
    </div>
  </article>
</template>

<style scoped lang="scss">
.prose :where(*):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
  margin: 0;
}
.post-card {
  @apply w-full shadow p-4 rounded hover:shadow-lg flex flex-col gap-4;
  &__header {
    @apply flex justify-between text-black/50;
  }
  &__footer {
    @apply flex justify-between items-center;
  }
  &__publish_date {
    @apply text-xs;
  }
  &__image {
    @apply rounded-lg;
  }
  &__title {
    @apply my-2 text-black/90;
  }
  &__excerpt {
    @apply text-black/75 text-sm;
  }
  &__user {
    @apply flex items-center gap-2;
  }
  &__avatar {
    @apply h-4 w-4 rounded-full;
  }
  &__link {
    @apply text-xs hover:text-black/50;
  }
}
</style>
