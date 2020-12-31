import { mount } from '@vue/test-utils'

import SchemaFrom, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render', async () => {
    let value = ''
    const wrapper = mount(SchemaFrom, {
      props: {
        schema: {
          type: 'number',
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })

    // 找到NumberField节点
    const numberField = wrapper.findComponent(NumberField)
    // 预测numberField是可以被渲染的
    expect(numberField.exists()).toBeTruthy()

    // 测试外部组件库时
    // await numberField.props('onChange')('123')
    // expect(value).toBe('123')

    // 测试自定义组件时，同时要测试自定义组件NumberField.vue
    // 找到NumberField中的input节点
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe('123')
  })
})
