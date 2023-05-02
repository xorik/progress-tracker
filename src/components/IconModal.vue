<script setup lang="ts">
import { useIconModal } from '../composables/use-icon-modal'

const {objectsByCategory, capitalize, icons, isOpen, resolve} = useIconModal()

type IconKey = keyof typeof icons
</script>

<template>
<Modal id="icon-modal" v-model="isOpen" extra-class="w-11/12 max-w-4xl">
    <div v-for="(items, c) in objectsByCategory">
      <h3 class="text-2xl font-bold my-4">{{capitalize(c)}}</h3>
      <div class="grid justify-between grid-cols-[repeat(auto-fit,44px)] md:grid-cols-[repeat(auto-fit,51px)]">
        <div v-for="i in items" class="cursor-pointer hover:text-neutral-content hover:bg-neutral p-1 rounded-md" @click="resolve(i)">
          <span class="text-3xl md:text-4xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256" v-html="icons[i as IconKey].body"></svg>
          </span>
        </div>
      </div>
    </div>
</Modal>
</template>
