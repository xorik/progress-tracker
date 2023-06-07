<script setup lang="ts">
import {useNotifications} from "../composables/use-notifications";

const {notifications, clickButton} = useNotifications()
</script>

<template>
  <div class="fixed max-w-3xl inset-x-0 bottom-0 mx-auto mb-20 z-10">
    <TransitionGroup
        enter-from-class="scale-[80%] opacity-0"
        leave-to-class="scale-[80%] opacity-0"
        enter-active-class="transition duration-200 ease-out"
        leave-active-class="transition duration-500 ease-in">

      <div v-for="n in notifications" :key="n.id" class="flex justify-between bg-success text-success-content m-1 p-1 px-3 rounded-xl">
        <div class="flex items-center">
          <Icon :icon="n.icon" class="text-2xl mr-2"/>
          <span class="py-2">{{ n.text }}</span>
        </div>
        <div v-if="n.buttons.length > 0" class="gap-1">
          <span v-for="(b, index) in n.buttons" @click="clickButton(n.id, index)" class="btn btn-ghost">{{ b.text }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>