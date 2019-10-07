import Vue from 'vue'
import { mount, shallow } from 'vue-test-utils'
import ProductInfo from '@/content/containers/product-info/product-info'

describe('ProductInfo', () => {
  const wrapper1 = shallow(ProductInfo, {
    propsData: {
      id: 1,
      title: 'title',
      // image: 'abc.png',
      description: 'description',
      types: [
        {type: 'type', price: 22, kcal: 200},
      ],
    }
  })

  // TODO:
  it('has name configured', () => {
    expect(ProductInfo.name).toEqual('product-info')
  })

  it('has rendering correctly', () => {
    expect(wrapper1.contains('.product-info__container')).toBe(true)
  })

  it('rendering title', () => {
    expect(wrapper1.props().title).toBe('title')
  })

  it('rendering description', () => {
    expect(wrapper1.props().description).toBe('description')
  })
})
