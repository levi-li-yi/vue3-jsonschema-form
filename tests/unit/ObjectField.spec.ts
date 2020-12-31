import { mount } from '@vue/test-utils'

import SchemaForm, { NumberField, StringField } from '../../lib'

describe('ObjectField.tsx', () => {
  let schema: any = undefined
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        age: {
          type: 'number',
        },
      },
    }
  })
  it('should render properties to correct fileds', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        value: {},
        onChange: (v: any) => {},
      },
    })
    // 测试StringField、NumberField组件可以被渲染
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })

  //测试handleChange函数
  it('should change value web sub field on change', async () => {
    let value: any = {}
    const wrapper = mount(SchemaForm, {
      props: {
        schema: schema,
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    await strField.props('onChange')('1')
    expect(value.name).toBe('1')
    await numField.props('onChange')(1)
    expect(value.age).toBe(1)
  })

  //测试value change
  it('should change value web sub value on change', async () => {
    let value: any = {
      name: '123',
    }
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
          },
        },
        value: value,
        onChange: (v: any) => {
          value = v
        },
      },
    })
    const strField = wrapper.findComponent(StringField)
    // const numField = wrapper.findComponent(NumberField)
    await strField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
    // await numField.props('onChange')(1)
    // expect(value.age).toBe(1)
  })
})
