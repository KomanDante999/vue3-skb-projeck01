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
      <a @click.prevent="openQuickView(product.id)" href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price"> {{ numberFormat(product.price) }} ₽ </span>

    <BaseColorSelectorVue :colors="product.colors" />
  </li>

  <BaseModalVue v-model:open="isQuickViewOpen">
    <ProductQuickViewVue :product-id="currentProductId" />
  </BaseModalVue>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import BaseColorSelectorVue from "@/components/BaseColorSelector.vue";
import { defineAsyncComponent, defineComponent, h } from "vue";
import BaseModalVue from "@/components/BaseModal.vue";

export default defineComponent({
  name: "ProductItem",
  inheritAttrs: false,
  props: ["products"],
  components: {
    BaseColorSelectorVue,
    BaseModalVue,
    ProductQuickViewVue: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'загрузка...')
    }),
  },
  data() {
    return {
      productElements: [],
      currentProductId: null,
    };
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId;
      },
      set(isOpen) {
        if (!isOpen) {
          this.currentProductId = null;
        }
      },
    },
  },
  methods: {
    numberFormat,
    fillRefs(element) {
      if (element) {
        this.productElements.push(element);
      }
    },
    openQuickView(productId) {
      this.currentProductId = productId;
    },
  },
  beforeUpdate() {
    this.productElements = [];
  },
});
</script>
