
<template>
  <ul class="catalog__list">
    <ProductItems
      :products="products"
      class="catalog__item"
      @click="test"
      :aria-disabled="null"
    />
  </ul>
</template>

<script>
import ProductItems from "@/components/ProductItems.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductList",
  components: { ProductItems },
  data() {
    return {
      product: {},
    };
  },
  props: ["products"],
  methods: {
    test(){
      console.log(...arguments);
    }
  }
});
</script>
