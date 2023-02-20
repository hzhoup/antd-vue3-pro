<template>
  <a-form class="p-4 enter-x" @keyup.enter="handleLogin">
    <a-form-item class="enter-x" v-bind="validateInfos.username">
      <a-input v-model:value="formData.username" placeholder="用户名" size="large" />
    </a-form-item>
    <a-form-item class="enter-x" v-bind="validateInfos.password">
      <a-input-password v-model:value="formData.password" placeholder="密码" size="large" />
    </a-form-item>
    <a-form-item class="enter-x">
      <div class="flex-y-center justify-between">
        <a-checkbox v-model:checked="formData.remember" size="small">记住我</a-checkbox>
        <a-button size="small" type="link" @click="toLoginModule('reset-pwd')">忘记密码?</a-button>
      </div>
    </a-form-item>
    <a-form-item class="enter-y">
      <a-button :loading="isFetching" block size="large" type="primary" @click="handleLogin">登录</a-button>
    </a-form-item>
    <div class="flex-y-center justify-between enter-y">
      <a-button block class="flex-1" @click="toLoginModule('code-login')">{{ LoginModuleEnum['code-login'] }}</a-button>
      <div class="w-12px" />
      <a-button block class="flex-1" @click="toLoginModule('register')">{{ LoginModuleEnum.register }}</a-button>
    </div>
    <OtherLogin class="enter-y" />
  </a-form>
</template>

<script lang="ts" setup>
import { usePost } from '@/hooks/request'
import { useRouterPush } from '@/hooks/router'
import { LoginModuleEnum } from '@/setting/pageEnum'
import { useAuthStore } from '@/store/modules/auth'
import { Form } from 'ant-design-vue'
import OtherLogin from './components/OtherLogin.vue'

defineOptions({ name: 'PwdLogin' })
const route = useRoute()
const useForm = Form.useForm
const auth = useAuthStore()
const { toLoginModule } = useRouterPush()
const { routerPush } = useRouterPush()

const formData = reactive({
  username: '',
  password: '',
  remember: false
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
})
const { validate, validateInfos } = useForm(formData, rules)

const { execute, isFetching, data } = usePost('/login', formData)

async function handleLogin() {
  const values = await validate()
  if (!values) return
  await execute()
  if (data.value) {
    auth.token = data.value as string
    const { redirect } = route.query
    await routerPush({ path: redirect as string })
  }
}
</script>
