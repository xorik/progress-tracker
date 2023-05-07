<script setup lang="ts">
import {useSettings} from "../composables/use-settings";

const {isAuthorized, hasCategories} = useSettings()
</script>

<template>
  <h1>Settings</h1>

  <div class="tabs my-6">
    <RouterLink v-if="isAuthorized" to="/settings/categories" active-class="tab-active text-primary" class="tab tab-bordered"><i-ph-folders class="text-xl mr-2"/> Categories</RouterLink>
    <RouterLink v-if="hasCategories" to="/settings/goals" active-class="tab-active text-primary" class="tab tab-bordered"><i-ph-flag-banner class="text-xl mr-2"/> Goals</RouterLink>
    <RouterLink to="/settings/key" active-class="tab-active text-primary" class="tab tab-bordered"><i-ph-key class="text-xl mr-2"/> API Key</RouterLink>
  </div>

  <RouterView/>

  <CategoryModal/>
  <GoalModal/>
  <IconModal/>
</template>
