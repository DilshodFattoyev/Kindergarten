<template >
   <div>
      <el-table :data="priceprods">
         <el-table-column label="№" type="index" />
         <el-table-column prop="title" label="Mahsulot nomi"/>
         <el-table-column prop="price" label="Narxi" />
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
                        <el-dropdown-item @click="editPriceprod(scope.row._id)">
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
import { usePriceprodStore } from '../../stores/data/priceprod';
import { useDialogStore } from '../../stores/usefull/dialog';

const store = usePriceprodStore()

const { priceprods } = storeToRefs(store)
const { status_priceprod, delete_priceprod } = store

const changeStatus = () => {
   status_priceprod(_id)
}

const remove = (_id) => {
   if (confirm('Qaroringiz qattiymi')) {
      delete_priceprod(_id)
   }
}

const dialog = useDialogStore()

const editPriceprod = (_id) => {
   emit('edit', _id)
   dialog.setToggle(true)
   dialog.setEditToggle(true)
}

</script>
<style lang="">
   
</style>