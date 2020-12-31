import { defineComponent } from 'vue'

import { FieldPropsDefine } from '../types'
import { useVJSFContext } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    // 获取SchemaForm提供的provide
    const context = useVJSFContext()

    const handleChange = (key: string, v: string) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const currentValue: any = isObject(value) ? value : {}

      const { SchemaItem } = context

      const properties = schema.properties || {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          onChange={(v: any) => handleChange(k, v)}
          key={index}
        />
      ))
    }
  },
})
