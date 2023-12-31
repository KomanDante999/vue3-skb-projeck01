import BaseFormFieldVue from '@/components/BaseFormField.vue';

export default {
  components: {
    BaseFormFieldVue
  },
  props: ['title', 'error', 'placeholder', 'modelValue'],
  computed: {
    dataValue: {
      get() {
        return this.modelValue
      },
      set(modelValue) {
        this.$emit('update:modelValue', modelValue)
      }
    }
  }

}
