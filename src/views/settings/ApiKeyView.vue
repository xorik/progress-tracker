<script setup lang="ts">
import { useApiKeySettings } from '../../composables/use-settings'

const {login, logout, maskUUID, key, showKey, isInvalidKey, isAuthorized} = useApiKeySettings()
</script>

<template>
  <h3>API Key</h3>

  <div class="flex items-start sm:items-center gap-2">
    <input v-if="!isAuthorized" :type="showKey ? 'text' : 'password'" v-model="key" class="input input-bordered w-full" :class="{'input-error': isInvalidKey}">
    <span v-else class="flex-1 break-all select-all">{{ showKey ? key : maskUUID(key) }}</span>

    <span class="btn btn-ghost" @click="showKey = !showKey">
      <i-ph-eye-light class="text-3xl"/>
    </span>

    <span class="btn btn-outline" v-if="!isAuthorized" @click="login()">
      <i-ph-check-light class="text-xl mr-2"/>
      Save
    </span>
    <span class="btn btn-outline btn-error" v-else @click="logout()">
      Logout
      <i-ph-sign-out-light class="text-xl ml-2"/>
    </span>
  </div>
</template>
