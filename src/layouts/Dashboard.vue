<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col flex-1">
      <nav-bar />
      <div class="h-full w-full overflow-y-auto">
        <router-view />
      </div>
    </div>
  </div>
</template>
