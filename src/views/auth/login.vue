<template>
   <div>
    <div class="reg">
      <div class="title">Tizimga kirish</div>
       <el-form
          ref="regForm"
          :model="user"
          :rules="rules"
          label-position="top"
          @submit.prevent="toLogin(regForm)"
   >
 
    <el-form-item label="Loginni kiriting" prop="login">
       <el-input 
       v-model="user.login" 
       @keypress.enter="toLogin(regForm)" />
    </el-form-item>
 
    <el-form-item label="Parolni kiriting" prop="password">
       <el-input 
       v-model="user.password" 
       type="password" show-password  
       @keypress.enter="toLogin(regForm)" />
    </el-form-item>
    <router-link to="/reg"> Akkauntingiz yoqmi?</router-link>
    <el-button type="success" @click="toLogin(regForm)">Kirish</el-button>
   </el-form>
    </div>
   </div>
 </template>

<script setup>
   import {ref} from 'vue'
   import {useAuthStore} from '@/stores/user/auth'


   const user = ref({})
   const regForm = ref()
   const authStore = useAuthStore()

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


   const toLogin = async (regForm)=>{
      console.log(regForm);
         if (!regForm) return
               await regForm.validate((valid, fields) => {
         if (valid) {
            authStore.login({
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