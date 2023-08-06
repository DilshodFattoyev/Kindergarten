<template >
  <div>
    <headpage :title="title" />
    <product-table @edit="edit" />
    <product-dialog :title="title" :id="id"></product-dialog>
  </div>
</template>
<script setup>
import headpage from '../../components/usefull/headpage.vue';
import productDialog from '../../components/dialog/product-dialog.vue';
import { ref, onMounted } from 'vue';
import { useProductStore } from '../../stores/data/product';
import productTable from '../../components/table/product-table.vue';


const store = useProductStore()

const title = ref('Mahsulot')
const id = ref('')

onMounted(() => {
  store.get_all_products()
})

const edit = (val) => {
  id.value = val
}

</script>
<style ></style>