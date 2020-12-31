import { mount } from '@vue/test-utils'

import SchemaForm, {
  NumberField,
  StringField,
  ArrayField,
  SelectWidget,
} from '../../lib'

describe('ArrayField', () => {
  // 测试多类型渲染
  it('should render multi type', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: {},
        onChange: (v: any) => {},
      },
    })
    // ArrayField
    const arr = wrapper.findComponent(ArrayField)
    const str = wrapper.findComponent(StringField)
    const num = wrapper.findComponent(NumberField)
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })
  // 测试单选数组
  it('should render single type', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        value: ['1', '2'],
        onChange: (v: any) => {},
      },
    })
    // ArrayField
    const arr = wrapper.findComponent(ArrayField)
    const strs = wrapper.findAllComponents(StringField)
    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })
  // 测试多选数组
  it('should render mutil', () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3'],
          },
        },
        value: [],
        onChange: () => {},
      },
    })
    //
    const str = wrapper.findComponent(StringField)
    const select = wrapper.findComponent(SelectWidget)
    expect(select.exists()).toBeTruthy()
  })
})
