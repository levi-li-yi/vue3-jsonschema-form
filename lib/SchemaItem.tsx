import { defineComponent, PropType, computed } from 'vue'
import { Schema, SchemaTypes } from './types'

// import StringField from './fields/StringField'
import StringField from './fields/StringField.vue'
// import NumberField from './fields/NumberField'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

import { FieldPropsDefine } from './types'
import { retrieveSchema } from './utils'

//
export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,

  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      // 处理schema对象节点
      return retrieveSchema(schema, rootSchema, value)
    })
    return () => {
      const retrievedSchema = retrievedSchemaRef.value

      const { schema } = props
      const type = schema.type
      let Component: any

      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        case SchemaTypes.ARRAY:
          Component = ArrayField
          break
        default:
          console.log('component is not exist')
      }
      return <Component {...props} schema={retrievedSchema} />
    }
  },
})
