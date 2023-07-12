
<template>
  <BaseFormFieldVue :title="title" :error="error">
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :placeholder="placeholder"
    ></textarea>
  </BaseFormFieldVue>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [formFieldMixin]
})
</script>