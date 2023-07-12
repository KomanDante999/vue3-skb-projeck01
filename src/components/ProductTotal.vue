
<template>
  <span class="content__info">
    {{
      totalProduct +
      " " +
      pluralRules(totalProduct, ["товар", "товара", "товаров"])
    }}
  </span>
</template>

<script>
import pluralRules from "@/helpers/pluralRules";
import { defineComponent } from "vue";

export default defineComponent({
  props: ['totalProduct'],
  methods: {
    pluralRules
  }
});
</script>