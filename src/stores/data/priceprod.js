import {
   defineStore
} from "pinia";
import {
   ref
} from "vue";
import {
   useApiStore
} from '../helpers/api'
import {
   ElMessage
} from "element-plus";



export const usePriceprodStore = defineStore('priceprod', () => {
   const priceprods = ref([])
   const priceprodsCount = ref(0)

   const api = useApiStore()

   //barcha mahsulotlarni olish
   const get_all_priceprods = async () => {
      let res = await api.getAxios({
         url: 'priceprod'
      })
      if (res.status == 200) {
         console.log(res.data);
         priceprods.value = [...res.data.priceProducts]
         priceprodsCount.value = res.data.count
      }
   }


   //yangi mahsulot
   const new_priceprod = async (data) => {
      await api.postAxios({
         url: 'priceprod',
         data
      }).then(res => {
         priceprods.value = [res.data, ...priceprods.value]
         priceprodsCount.value += 1
         ElMessage({
            type: 'success',
            message: 'Yangi mahsulot narhi qoshildi'
         })
      })
   }


   //bitta mahsulot olish
   const get_priceprod = async (_id) => {
      return await api.getAxios({
         url: `priceprod/${_id}`
      })
   }


   //mahsulotni yangilash
   const save_priceprod = async (data) => {
      await api.putAxios({
            url: 'priceprod',
            data
         })
         .then(res => {
            priceprods.value = priceprods.value.map(priceprod => {
               if (priceprod._id === res.data._id) return res.data
               return priceprod
            })
            Elmessage({
               type: 'success',
               message: 'Mahsulot narhi yangilandi'
            })
         })
   }


   //mahsulotni ochirish
   const delete_priceprod = async (_id) => {
      await api.deleteAxios({
            url: `priceprod/${_id}`
         })
         .then(() => {
            priceprods.value = priceprods.value.filter(priceprod => {
               if (priceprod._id == _id) return false
               return priceprod
            })
            priceprodsCount.value -= 1
            Elmessage({
               type: 'warning',
               message: 'Mahsulot narhi ochirildi'
            })
         })
   }


   //mahsulot holatini ozgartirish
   const status_priceprod = async (_id) => {
      await api.getAxios({
            url: `priceprod/change/${_id}`
         })
         .then(() => {
            priceprods.value = priceprods.value.map(priceprod => {
               if (priceprod._id == _id) return {
                  ...priceprod,
                  status: priceprod.status == 0 ? 1 : 0
               }
               return priceprod
            })
            Elmessage({
               type: 'success',
               message: 'Mahsulot narhi holati yangilandi'
            })

         })
   }


   return {
      priceprods,
      priceprodsCount,
      new_priceprod,
      status_priceprod,
      delete_priceprod,
      save_priceprod,
      get_all_priceprods,
      get_priceprod
   }

})