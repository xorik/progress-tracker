<script setup lang="ts">
import {ConfirmType, useConfirmModal} from "../composables/use-confirm";

const {data, isOpen, buttonText, buttonClass, resolve, reject} = useConfirmModal()
</script>

<template>
  <Modal id="confirm" v-model="isOpen">
      <div class="flex items-center">
        <i-ph-warning-light v-if="data.type === ConfirmType.Delete" class="text-2xl mr-2 text-primary"/>
        <i-ph-question-light v-if="data.type === ConfirmType.Logout" class="text-2xl mr-2 text-primary"/>
        <i-ph-package-light v-if="data.type === ConfirmType.NewVersion" class="text-2xl mr-2 text-primary"/>
        <h3 class="text-xl text-primary">{{data.header}}</h3>
      </div>

      <p class="my-8">{{data.text}}</p>

      <div class="flex mt-12 gap-3 justify-end">
        <span @click="reject()" class="btn btn-outline px-6">Cancel</span>
        <span @click ="resolve(true)" class="btn btn-outline px-6" :class="buttonClass">
            <i-ph-trash-light v-if="data.type === ConfirmType.Delete" class="text-xl mr-2"/>
            <i-ph-arrow-clockwise-light v-if="data.type === ConfirmType.NewVersion" class="text-xl mr-2"/>
            {{ buttonText }}
            <i-ph-sign-out-light v-if="data.type === ConfirmType.Logout" class="text-xl ml-2"/>
        </span>

      </div>
  </Modal>
</template>