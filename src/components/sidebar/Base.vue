<template>
  <section class="flex flex-col items-center h-full w-1/5 text-purple">
    <img
      src="/images/logo-color.png"
      class="h-12"
      alt="Logo"
    >

    <div class="flex-1 w-full mt-6">
      <sidebar-item
        :to="{ name: 'auditions' }"
        text="Auditions"
        icon="auditions"
        :counter="10"
      />
      <sidebar-item
        :to="{ name: 'auditions.create' }"
        text="Create New"
        icon="new"
      />
      <sidebar-item
        :to="{ name: 'talents' }"
        text="Talent Database"
        icon="person"
      />
      <sidebar-item
        :to="{ name: 'news' }"
        text="News & Updates"
        icon="news"
      />
      <sidebar-item
        :to="{ name: 'notifications' }"
        text="Notifications"
        icon="notifications"
      />
      <sidebar-item
        :to="{ name: 'settings' }"
        text="Settings"
        icon="settings"
      />
    </div>

    <sidebar-item
      text="Sign Out"
      icon="sign_out"
    />
  </section>
</template>

<script>
export default {
  props: [],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>
