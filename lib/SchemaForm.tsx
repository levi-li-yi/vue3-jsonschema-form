import { defineComponent, provide, reactive } from 'vue'
import type {PropType} from 'vue'

import {Schema, SchemaTypes} from './types'
import SchemaItem from './SchemaItem'
import {SchemaFormContextKay} from './context'

// SchemaForm组件,根据schema定义渲染出表单项
export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    console.log(props.schema);
    
    const handleChange = (v: any) => {
       props.onChange(v)
    }

    const context: any = {
      SchemaItem
    }

    provide(SchemaFormContextKay, context)

    return () => {
      const {schema, value } = props
      return(
        <SchemaItem
         schema={props.schema}
        rootSchema={schema}
        onChange={handleChange}
        value={value}/>
      )
    }
  },
})
