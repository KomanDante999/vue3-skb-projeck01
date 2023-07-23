<template>
  <li
    v-bind="$attrs"
    v-for="product in products"
    :key="product.id"
    :ref="fillRefs"
  >
    <router-link
      class="catalog__pic"
      :to="{ name: 'product', params: { id: product.id } }"
    >
      <img :src="product.image.file.url" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ numberFormat(product.price) }} ₽ </span>

    <BaseColorSelectorVue
      :colors="product.colors"
    />
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BaseColorSelectorVue from "@/components/BaseColorSelector.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductItem",
  inheritAttrs: false,
  props: ["products"],
  components: { BaseColorSelectorVue },
  data() {
    return {
      productElements: [],
    };
  },
  methods: {
    numberFormat,
    fillRefs(element) {
      if (element) {
        this.productElements.push(element);
      }
    },
  },
  // emits: ['MYclick'],
  // mounted(){
  //   this.$emit('MYclick', 'YAYU')
  // },
  beforeUpdate(){
    this.productElements = []
  },
});
</script>
