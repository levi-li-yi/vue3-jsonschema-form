import { shallowMount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const HelloWorld = defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

beforeEach(() => {
  console.log('beforeEach')
})

afterEach(() => {
  console.log('afterEach')
})

beforeAll(() => {
  console.log('beforeAll')
})

afterAll(() => {
  console.log('afterAll')
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', (done) => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    // expect(wrapper.text()).toMatch(msg)

    setTimeout(() => {
      expect(wrapper.text()).toMatch(msg)
      // 异步测试方法1
      done()
    }, 100)
  })

  it('work', () => {
    // expect(1 + 1).toBe(2)
    // 异步测试方法2
    return new Promise((resolve) => {
      expect(1 + 1).toBe(2)
      resolve()
    })
  })

  // 异步测试方法3
  it('async test', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    await wrapper.setProps({
      msg: '123',
    })
    expect(wrapper.text()).toMatch('123')
  })
})
