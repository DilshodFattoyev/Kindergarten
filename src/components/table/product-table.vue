<template >
   <div>
      <el-table :data="products">
         <el-table-column label="№" type="index" />
         <el-table-column prop="title" label="Mahsulot nomi">
            <template #default="scope">
               <div class="df align-items-center">
                  <el-image class="mr-1" style="width: 50px; height: 50px" :src="`${url}/${scope.row.img[0].response}`"
                     fit="cover" />

                  {{ scope.row.title }}
               </div>
            </template>
         </el-table-column>

         <el-table-column prop="unit" label="Birligi" />
         <el-table-column prop="status" label="Holati">
            <template #default="scope">
               <el-popconfirm title="Qaroringiz qatiymi" @confirm="changeStatus(scope.row._id)">
                  <el-button :type="scope.row.status == 1 ? 'success' : 'danger'">
                     <el-icon>
                        <check v-if="scope.row.status == 1" />
                        <close v-else />
                     </el-icon>
                  </el-button>
               </el-popconfirm>
            </template>
         </el-table-column>

         <el-table-column width="100" align="right">
            <template #default='scope'>
               <el-dropdown>
                  <el-button>
                     <el-icon>
                        <more />
                     </el-icon>
                  </el-button>
                  <template #dropdown>
                     <el-dropdown-menu>
                        <el-dropdown-item @click="editProduct(scope.row._id)">
                           <el-icon>
                              <edit />
                           </el-icon>
                           Tahrirlash
                        </el-dropdown-item>
                        <el-dropdown-item @click="remove(scope.row._id)">
                           <el-icon>
                              <delete />
                           </el-icon>
                           O'chirish
                        </el-dropdown-item>

                     </el-dropdown-menu>
                  </template>
               </el-dropdown>
            </template>
         </el-table-column>

      </el-table>
   </div>
</template>
<script setup>

const emit = defineEmits([
   'edit'
])

import { storeToRefs } from 'pinia';
import { useProductStore } from '../../stores/data/product';
import { useHelperStore } from '../../stores/helpers';
import { useDialogStore } from '../../stores/usefull/dialog';

const store = useProductStore()
const helpers = useHelperStore()
const { url } = helpers
const { products } = storeToRefs(store)
const { status_product, delete_product } = store

const changeStatus = () => {
   status_product(_id)
}

const remove = (_id) => {
   if (confirm('Qaroringiz qattiymi')) {
      delete_product(_id)
   }
}

const dialog = useDialogStore()

const editProduct = (_id) => {
   emit('edit', _id)
   dialog.setToggle(true)
   dialog.setEditToggle(true)
}

</script>
<style lang="">
   
</style>