<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { FieldPropsDefine } from '../types'

const props = defineProps({ ...FieldPropsDefine })

const handleChange = (v: any) => {
  const value = v.target.value
  const num = Number(value)
  if (Number.isNaN(num)) {
    props.onChange(undefined)
  } else {
    props.onChange(v.target.value)
  }
}
</script>
<style></style>
