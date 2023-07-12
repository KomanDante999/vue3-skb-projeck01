
<template>
  <BaseFormFieldVue :title="title" :error="error">
    <input
      v-model="dataValue"
      class="form__input"
      :type="type"
      :placeholder="placeholder"
    />
  </BaseFormFieldVue>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    type: {
      default: 'text'
    }
  },
  mixins: [formFieldMixin]
})
</script>