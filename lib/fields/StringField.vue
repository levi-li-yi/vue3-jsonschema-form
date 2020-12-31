<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import { FieldPropsDefine, Schema } from '../types'

// export default {
//   props: FieldPropsDefine,
// }

// declare const props: {
//   value: any
//   onChange: (v: any) => void
//   schema: Schema
// }
const props = defineProps({ ...FieldPropsDefine })
console.log(props)

const handleChange = (e: any) => {
  console.log(e)
  props.onChange(e.target.value)
}
</script>
<style></style>
