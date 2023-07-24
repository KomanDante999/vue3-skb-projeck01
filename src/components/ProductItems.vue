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
      <a @click.prevent="openQuickView" href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ numberFormat(product.price) }} ₽ </span>

    <BaseColorSelectorVue :colors="product.colors" />
  </li>

  <BaseModalVue v-model:open="isQuickViewOpen">
    Товар добавлен в корзину
  </BaseModalVue>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BaseColorSelectorVue from "@/components/BaseColorSelector.vue";
import { defineComponent } from "vue";
import BaseModalVue from "@/components/BaseModal.vue";

export default defineComponent({
  name: "ProductItem",
  inheritAttrs: false,
  props: ["products"],
  components: { BaseColorSelectorVue, BaseModalVue },
  data() {
    return {
      productElements: [],
      isQuickViewOpen: false,
    };
  },
  methods: {
    numberFormat,
    fillRefs(element) {
      if (element) {
        this.productElements.push(element);
      }
    },
    openQuickView(){
      this.isQuickViewOpen = true
    },
    closeQuickView(){
      this.isQuickViewOpen = false
    }
  },
  // emits: ['MYclick'],
  // mounted(){
  //   this.$emit('MYclick', 'YAYU')
  // },
  beforeUpdate() {
    this.productElements = [];
  },
});
</script>
