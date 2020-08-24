<template>
  <section class="w-4/5 mx-auto my-6">
    <AuditionUpdateForm />
  </section>
</template>

<script>
import AuditionUpdateForm from '@/components/auditions/AuditionUpdateForm.vue';

export default {
  name: 'CreateAudition',
  components: { AuditionUpdateForm },
};
</script>

<style lang="scss" scoped>

</style>
