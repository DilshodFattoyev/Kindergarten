<template >
   <div>
     <headpage :title="title" />
     <priceprod-table @edit="edit" />
     <priceprod-dialog :title="title" :id="id"></priceprod-dialog>
   </div>
 </template>
 <script setup>
 import headpage from '../../components/usefull/headpage.vue';
 import priceprodDialog from '../../components/dialog/priceprod-dialog.vue';
 import { ref, onMounted } from 'vue';
 import { usePriceprodStore } from '../../stores/data/priceprod';
 import priceprodTable from '../../components/table/priceprod-table.vue';
 import {useProductStore} from '../../stores/data/product'

 const productStore = useProductStore()
 const {get_all_products} = productStore
 const store = usePriceprodStore()
 
 const title = ref('Narh')
 const id = ref('')
 
 onMounted(() => {
   store.get_all_priceprods()
   get_all_products()
 })
 
 const edit = (val) => {
   id.value = val
 }
 
 </script>
 <style ></style>