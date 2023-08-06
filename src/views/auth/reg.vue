
<template>
  <div>
   <div class="reg">
      <div class="title">Ro'yhatdan o'tish</div>
      <el-form
         ref="regForm"
         :model="user"
         :rules="rules"
         label-position="top"
         @submit.prevent="regis(regForm)"
  >

   <el-form-item label="Loginni kiriting" prop="login">
      <el-input 
      v-model="user.login" 
      @keypress.enter="regis(regForm)" 
      @blur="loginCheck"
      />
      
   </el-form-item>

   <el-form-item label="Parolni kiriting" prop="password">
      <el-input 
      v-model="user.password" 
      type="password" show-password  
      @keypress.enter="regis(regForm)" />
   </el-form-item>
   <router-link to="/login">Tizimga kiring</router-link>
   <el-button 
         :disabled="status" 
         type="success" 
         @click="regis(regForm)">
         Kirish
   </el-button>
  </el-form>
   </div>
  </div>
</template>

<script setup>
   import {ref} from 'vue'
   import {useAuthStore} from '@/stores/user/auth'
   import { ElMessage } from "element-plus";


   const user = ref({})
   const regForm = ref()
   const authStore = useAuthStore()

   const status = ref(false)

   const rules= ref({
      login:[
         {
            required:true,
            message:'Loginni kiriting',
            trigger:'blur'
         }
      ],
      password:[
         {
            required:true,
            message:'Parolni kiriting',
            trigger:'blur'
         },
         {
            min:3,
            max:15,
            message:'Eng kami bilan 3 ta simbol kiriting'
         }
      ],
   })

   const loginCheck = async () =>{
       let res = await authStore.checkLogin({
         login:user.value.login
       })
       if(res.status == 200){
         if(res.data == 'yes'){
            status.value = true
            ElMessage({
            type:'warning',
            message:'Bunday foydalanuvchi mavjud'
         })
         }
         if(res.data == 'no'){
            status.value = false
         }
       }
   }

   const regis = async (regForm)=>{
      console.log(regForm);
         if (!regForm) return
               await regForm.validate((valid, fields) => {
         if (valid) {
            authStore.registration({
               login:user.value.login,
               password:user.value.password
            })
         } else {
            console.log('error submit!', fields)
         }
      })
   }

    
</script>

<style>

</style>