<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <aside class="filter">
        <ProductFilter
          v-model:prise-from="filterPriseFrom"
          v-model:prise-to="filterPriseTo"
          v-model:category-id="filterCategoryId"
          v-model:color-id="filterColorId"
          class="filter-test"
        />
        <!-- <Teleport to="#teleport-target">Телепортация ура!!!</Teleport> -->
      </aside>
      <section class="catalog">
        <div class="catalog__error-block">
          <BasePrelosderVue :trigger="productsLoading" />
          <BaseErrorMesageVue :trigger="productsLoadingFailed" />
          <BaseResetButtonVue
            :trigger="productsLoadingFailed"
            @callback="loadProducts"
          />
        </div>

        <ProductList v-if="productsData" :products="products" />
        <BasePagination
          v-model="page"
          :count="productsCountTotal"
          :per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<style>
.catalog__error-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>

<script>
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";
import ProductList from "@/components/ProductList.vue";
import BasePagination from "@/components/BasePagination.vue";
import ProductFilter from "@/components/ProductFilter.vue";
import BaseErrorMesageVue from "@/components/BaseErrorMesage.vue";
import BaseResetButtonVue from "@/components/BaseResetButton.vue";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
    BasePrelosderVue,
    BaseErrorMesageVue,
    BaseResetButtonVue,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriseFrom: 0,
      filterPriseTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items : [];
    },
    productsCountTotal() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriseFrom,
              maxPrice: this.filterPriseTo,
            },
          })
          .then((response) => (this.productsData = response.data))
          .catch(() => (this.productsLoadingFailed = true))
          .then(() => (this.productsLoading = false));
      }, TIMEOUT);
    },
  },
  created() {
    this.loadProducts();
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterPriseFrom() {
      this.loadProducts();
    },
    filterPriseTo() {
      this.loadProducts();
    },
  },
});
</script>
