<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex flex-wrap content-center justify-center container text-purple pl-6 py-8 ">
    <div
      v-if="!!posts.length"
      class="w-1/2"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="rounded overflow-hidden shadow-lg w-full max-w-xl mb-5 cursor-pointer"
        @click="$router.push({ name: 'view.news', params: { post }})"
      >
        <div class="w-full h-56 p-4">
          <img
            class="w-full h-full object-cover rounded"
            :src="post.url_media"
            alt="Image"
          >
        </div>
        <div class="px-6 pt-4 pb-8">
          <div class="flex items-center mb-2">
            <p class="font-bold text-xl truncate mr-4">
              {{ post.title }}
            </p>
            <span class="flex-none ml-auto text-sm">
              Posted {{ post.time_ago }}
            </span>
          </div>
          <div
            class="description text-gray-700 text-base"
            v-html="post.body"
          />
        </div>
      </div>
    </div>
    <div v-else>
      No posts.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  async created() {
    try {
      const { data: { data } } = await axios.get('/t/blog/posts');
      this.posts = data;
    } catch (e) {
      this.posts = [];
    }
  },
};
</script>

<style>
@media (min-width: 1280px){
  .container {
    max-width: 1450px;
  }
}
</style>

<style scoped>
.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 21px;
  max-height: 63px;
}
</style>
