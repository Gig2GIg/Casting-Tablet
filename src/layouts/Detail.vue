<template>
  <div class="flex w-full h-screen">
    <sidebar-base />
    <div class="flex flex-col w-4/5">
      <div class="flex-1 ">
        <router-view />
      </div>
    </div>
  </div>
</template>
