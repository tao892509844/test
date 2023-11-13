<!--
 * @Description: 
 * @Author: 似荆
 * @Date: 2020-10-31 20:39:06
 * @LastEditors: 似荆
 * @LastEditTime: 2023-11-14 01:15:58
 -->
<template>
  <view class="login-container">
    <div class="logo">
      <uv-image src="/static/logo.jpg" width="60rpx" height="60rpx"></uv-image>
      <view class="name">畅用无线路由</view>
    </div>
    <view class="cy-flex-box cy-flex-justify--center cy-mb30">
      <uv-image src="/static/img1.png" width="400rpx" mode="widthFix"></uv-image>
    </view>
    <view class="cy-tc cy-fs-sm">
      畅用无线路由4G/5G无线宽带盒子
    </view>
    <view class="cy-f-sub cy-tc cy-fs-sm cy-mb50">上网、看视频一个就够</view>
    <view class="login-btn">
      <uv-button type="primary" shape="circle" @click="handlerLogin">手机号快捷登录</uv-button>
    </view>
    <cy-dialog ref="dialogRef" title="欢迎您使用畅用无线路由小程序" cancelText="不同意" confirmText="同意并继续">

      <view class="cy-fs-sm">
        请充分阅读
        <navigator class="cy-f-primary cy-inline" to="/pages/agreement/agreement">《用户服务协议》</navigator>
        <navigator class="cy-f-primary cy-inline" to="/pages/agreement/agreement">《畅用无线路由隐私政策》</navigator>
        <navigator class="cy-f-primary cy-inline" to="/pages/agreement/agreement">《小程序用户隐私保护指引》</navigator>
        ，点“同意并继续”代表您已同意前述协议及下列约定：
        <view>为了给您提供服务，我们会申请部分系统权限及个人信息，我司将严格保守您的个人信息，确保信息安全。</view>
        <view>您在点击“同意并继续”前，务必审慎阅读，充分理解协议内容</view>
      </view>
    </cy-dialog>
  </view>
</template>

<script setup>
import { login } from '@/apis/auth'
import { ref, onMounted, nextTick } from 'vue'
import CyDialog from '@/components/cyDialog.vue'
const dialogRef = ref()
onMounted(() => {
  nextTick(() => {
    try {
      dialogRef.value.open()
    } catch (error) {
      uni.navigateBack()
    }
  })
})
function handlerLogin () {
  login().then(res => {
    uni.navigateBack()
  })
}
</script>

<style lang="scss">
.login-container {
  padding-top: 200rpx;
  min-height: 100vh;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 100rpx;

    .name {
      margin-left: 20rpx;
      font-size: 40rpx;
      font-weight: bold;

    }
  }

  .login-btn {
    width: 300rpx;
    margin: 0 auto;
  }
}
</style>
