<!--
 * @Description: 
 * @Author: 似荆
 * @Date: 2023-11-14 00:09:05
 * @LastEditors: 似荆
 * @LastEditTime: 2023-11-14 01:18:29
-->
<template>
  <uv-modal ref="modalRef" :closeOnClickOverlay="false" @close="manualReject()" v-bind="$attrs" :showCancelButton="false"
    :showConfirmButton="false">
    <template #default>
      <slot></slot>
    </template>

    <template #confirmButton>
      <view class="dialog__footer">
        <view class="cy-flex-cover cy-pr10">
          <uv-button @click="close" shape="circle">{{ cancelText }}</uv-button>
        </view>
        <view class="cy-flex-cover cy-pl10">
          <uv-button @click="confirm" type="primary" shape="circle">{{ confirmText }}</uv-button>
        </view>

      </view>
    </template>
  </uv-modal>
</template>
<script setup>
import { ref, defineProps, defineExpose } from 'vue'
const props = defineProps({
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default: '确认'
  }
})
const modalRef = ref(null)
const manualReject = ref(null)
const manualResolve = ref(null)
function open () {
  return new Promise((resolve, reject) => {
    manualReject.value = reject
    manualResolve.value = resolve
    modalRef.value.open()
  })
}
function confirm () {
  manualResolve.value()
  modalRef.value.close()
}
function close () {
  manualReject.value()
  modalRef.value.close()
}
defineExpose({
  open,
  close
})
</script>
<style lang="scss">
.dialog__footer {
  display: flex;
  align-items: center;
  padding: 10rpx 30rpx 30rpx;
}
</style>
