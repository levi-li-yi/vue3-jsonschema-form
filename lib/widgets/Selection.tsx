import { defineComponent, ref, PropType, watch, watchEffect } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true,
    },
  },
  setup(props) {
    const currentValueRef = ref(props.value)

    // 监听currentValue变化，并更新父组件
    watch(currentValueRef, (newv, oldv) => {
      if (newv !== props.value) {
        props.onChange(newv)
      }
    })

    // 监听父组件传入的value,并更新currentValue
    watch(
      () => props.value,
      (v: any) => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      },
    )

    watchEffect(() => {
      console.log(currentValueRef)
    })

    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {options.map((op, index: number) => (
            <option value={op.value} key={index}>
              {op.key}
            </option>
          ))}
        </select>
      )
    }
  },
})
