<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="flex justify-center">
    <div
      v-if="post"
      class="flex flex-col w-full max-w-3xl mt-8"
    >
      <p class="text-2xl mb-1">
        {{ post.title }}
      </p>

      <span>
        {{ post.time_ago }}
      </span>

      <img
        :src="post.url_media"
        alt="Image"
        class="mt-4 mb-6 object-cover h-64 rounded-lg"
      >

      <div
        class="text-gray-600 mb-6"
        v-html="post.body"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
    };
  },
  created() {
    if (this.$route.params.post) {
      this.post = this.$route.params.post;
    } else {
      this.$router.replace({ name: 'news-and-updates' });
    }
  },
};
</script>
