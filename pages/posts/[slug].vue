<script lang="ts" setup>
const $route = useRoute();
const { slug } = $route.params;

const query = ref({
  include: "user",
  select:
    "id,title,excerpt,publishedAt,image,content,user.firstName,user.lastName,user.avatar,",
});

const { data: post, error } = useFetch(`/api/posts/${slug}`, {
  query: query.value,
});

const publishedDate = computed(() => {
  return new Date(post.value?.publishedAt as number).toDateString();
});

if(error.value){
  throw createError({
      statusCode: 404,
      statusMessage: 'Post Not Found'
    })
}

useHead({
  title: post.value?.title,
});
useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt,
});
</script>
<template>
  <article class="min-h-screen px-4 lg:px-0">
    <div class="max-w-screen-lg mx-auto pt-8 pb-4 prose">
      <section class="post__user">
        <NuxtImg
          :src="post?.user.avatar || '#'"
          class="post__avatar"
          loading="lazy"
          sizes="64px"
          :alt="`avatar of ${post?.user.firstName}`"
        />
        <div>
          <p class="my-0">
            {{ post?.user.firstName }} {{ post?.user.lastName }}
          </p>
          <small>{{ publishedDate }}</small>
        </div>
      </section>
      <section class="">
        <h1 class="">{{ post?.title }}</h1>
        <NuxtImg
          :src="post?.image || '#'"
          class="post__image"
          loading="lazy"
          sizes="100vw"
          :alt="`image describing ${post?.title}`"
        />
        <div v-html="post?.content" class="prose max-w-screen-lg"></div>
      </section>
    </div>
  </article>
</template>

<style lang="scss">
.post {
  &__image {
    @apply rounded-lg object-cover max-h-[40rem] w-full object-center mb-2;
  }

  &__user {
    @apply flex items-center gap-2 mb-4;
  }

  &__avatar {
    @apply h-16 w-16 rounded-full;
  }
}
</style>
