import { inject } from 'vue'
import { SchemaItemDefine } from './types'

export const SchemaFormContextKay = Symbol()

// 获取SchemaForm组件提供的provide
export const useVJSFContext = () => {
  const context: { SchemaItem: SchemaItemDefine } | undefined = inject(
    SchemaFormContextKay,
  )

  if (!context) {
    throw Error('SchemaForm should be used')
  }
  return context
}
