<template>
  <div class="catalog__error-block">
    <BasePrelosderVue :trigger="productLoading" />
    <BaseErrorMesageVue :trigger="productLoadingFailed" />
    <BaseResetButtonVue
      :trigger="productLoadingFailed"
      @callback="loadProduct"
    />
  </div>

  <main class="content container" v-if="productData">
    <div class="content__top">
      <BaseBreadcrumbsVue :breadcrumbs="breadcrumbs" />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image.file.url"
            :alt="product.title"
          />
        </div>
        <!-- <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                src="img/phone-square-1.jpg"
                srcset="img/phone-square-1@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-2.jpg"
                srcset="img/phone-square-2@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img
                width="98"
                height="98"
                src="img/phone-square-3.jpg"
                srcset="img/phone-square-3@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
          <li class="pics__item">
            <a class="pics__link" href="#">
              <img
                width="98"
                height="98"
                src="img/phone-square-4.jpg"
                srcset="img/phone-square-4@2x.jpg 2x"
                alt="Название товара"
              />
            </a>
          </li>
        </ul> -->
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form pos-rel">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="doAddToCart"
          >
            <b class="item__price"> {{ numberFormat(product.price) }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>

              <BaseColorSelectorVue
                :colors="product.colors"
                :selectedColorId="selectedColorId"
              />
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="32"
                    />
                    <span class="sizes__value"> 32gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="64"
                    />
                    <span class="sizes__value"> 64gb </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      value="128"
                      checked=""
                    />
                    <span class="sizes__value"> 128gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <BaseCounterVue :count="productAmount" :minValue="1" />
              <button
                class="button button--primery"
                type="submit"
                :disabled="productAddSending"
              >
                В корзину
              </button>
              <BaseModalVue v-model:open="isShowAddedMessage">
                Товар добавлен в корзину
              </BaseModalVue>
            </div>
            <BasePrelosderVue
              class="form__add-snipper"
              :trigger="productAddSending"
            />

            <div class="form__add-message" v-show="productAdded">
              <h4>Товар добавлен в корзину</h4>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально
            эффективными. Wahoo ELEMNT BOLT GPS синхронизируется с датчиками
            по ANT+, объединяя полученную с них информацию. Данные отображаются
            на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и
            различные приложения сторонних разработчиков. Велокомпьютер точно
            отслеживает местоположение, принимая сигнал с целого комплекса
            спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства
            составляют всего 74,6 x 47,3 x 22,1 мм. что не превышает габариты
            смартфона. Корпус гаджета выполнен из черного пластика.
            На обращенной к пользователю стороне расположен дисплей диагональю
            56 мм. На дисплей выводятся координаты и скорость, а также
            полученная со смартфона и синхронизированных датчиков информация:
            интенсивность, скорость вращения педалей, пульс и т.д. (датчики не
            входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а
            также выдерживает кратковременное (до 30 минут) погружение в воду на
            глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style>
.catalog__error-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
}
.pos-rel {
  position: relative;
}
.form__add-snipper {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 100px;
  height: 100px;
}
.form__add-message {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>

<script>
import { mapActions, useStore } from "vuex";
import axios from "axios";
import { API_BASE_URL, TIMEOUT } from "@/config";
import BaseCounterVue from "@/components/BaseCounter.vue";
import numberFormat from "@/helpers/numberFormat";
import BaseColorSelectorVue from "@/components/BaseColorSelector.vue";
import BasePrelosderVue from "@/components/BasePrelosder.vue";
import BaseErrorMesageVue from "@/components/BaseErrorMesage.vue";
import BaseResetButtonVue from "@/components/BaseResetButton.vue";
import BaseBreadcrumbsVue from "@/components/BaseBreadcrumbs.vue";
import BaseModalVue from "@/components/BaseModal.vue";

import { computed, defineComponent, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const composition = defineComponent({
  setup() {
    const $route = useRoute();
    const $store = useStore()

    const productAmount = ref(1);
    const productData = ref(null);
    const productLoading = ref(false);
    const productLoadingFailed = ref(false);
    const productAdded = ref(false);
    const productAddSending = ref(false);
    const selectedColorId = ref(null);
    const isShowAddedMessage = ref(false);

    const product = computed(() => {
      return this.productData.value;
    });
    const catigory = computed(() => {
      return this.productData.category;
    });
    const breadcrumbs = computed(() => {
      return [
        {
          titlePage: "Каталог",
          routerName: "main",
        },
        {
          titlePage: this.catigory.title,
          routerName: "main",
        },
        {
          titlePage: this.product.title,
          routerName: "",
          cursorNone: true,
        },
      ];
    });
    const doAddToCart = () => {
      productAdded.value = false;
      productAddSending.value = true;

      $store.dispatch('addProductToCard', {
        productId: product.id,
        amount: productAmount.value,
      }).then(() => {
        productAdded.value = true;
        productAddSending.value = false;
        isShowAddedMessage.value = true;
      });
    };

    const doLoadProduct = () => {
      productLoading.value = true;
      productLoadingFailed.value = false;
      clearTimeout(loadProductTimer);
      loadProductTimer.value = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products/` + $route.params.id, {})
          .then((response) => (productData.value = response.data))
          .then(() => (selectedColorId.value = product.colors[0].id))
          .catch(() => (productLoadingFailed.value = true))
          .then(() => (productLoading.value = false));
      }, TIMEOUT);
    };

    doLoadProduct();
    onBeforeRouteUpdate(() => {
      doLoadProduct()
    })

    return {
      productAmount,
      productData,
      productLoading,
      productLoadingFailed,
      productAdded,
      productAddSending,
      selectedColorId,
      isShowAddedMessage,
      product,
      catigory,
      breadcrumbs,
      doAddToCart,
      doLoadProduct,
    }
  },
});

export default {
  components: {
    BaseCounterVue,
    BaseColorSelectorVue,
    BasePrelosderVue,
    BaseErrorMesageVue,
    BaseResetButtonVue,
    BaseBreadcrumbsVue,
    BaseModalVue,
  },
  data() {
    return {
      productAmount: 1,
      productData: null,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      selectedColorId: null,
      isShowAddedMessage: false,
    };
  },
  computed: {
    product() {
      return this.productData;
    },
    catigory() {
      return this.productData.category;
    },
    breadcrumbs() {
      return [
        {
          titlePage: "Каталог",
          routerName: "main",
        },
        {
          titlePage: this.catigory.title,
          routerName: "main",
        },
        {
          titlePage: this.product.title,
          routerName: "",
          cursorNone: true,
        },
      ];
    },
  },
  methods: {
    ...mapActions(["addProductToCard"]),

    doAddToCart() {
      this.productAdded = false;
      this.productAddSending = true;

      this.addProductToCard({
        productId: this.product.id,
        amount: this.productAmount,
      }).then(() => {
        this.productAdded = true;
        this.productAddSending = false;
        this.isShowAddedMessage = true;
      });
    },

    loadProduct() {
      this.productLoading = true;
      this.productLoadingFailed = false;
      clearTimeout(this.loadProductTimer);
      this.loadProductTimer = setTimeout(() => {
        axios
          .get(API_BASE_URL + `/api/products/` + this.$route.params.id, {})
          .then((response) => (this.productData = response.data))
          .then(() => (this.selectedColorId = this.product.colors[0].id))
          .catch(() => (this.productLoadingFailed = true))
          .then(() => (this.productLoading = false));
      }, TIMEOUT);
    },
    numberFormat,
  },
  created() {
    this.loadProduct();
  },
  beforeRouteUpdate() {
    this.loadProduct();
  },
};
</script>
