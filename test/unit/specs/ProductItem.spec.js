import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import ProductItem from '@/content/components/product-item/product-item'

describe('ProductItem', () => {
  const wrapper1 = shallow(ProductItem, {
    propsData: {
      type: 'type',
      price: 69.5,
      kcal: 200,
    }
  })

  const wrapper2 = shallow(ProductItem, {
    propsData: {
      piece: 'piece',
      price: 23,
      kcal: 300,
    }
  })

  it('has name configured', () => {
    expect(ProductItem.name).toEqual('product-item')
  })

  it('has rendering correctly', () => {
    expect(wrapper1.contains('.product-item__container')).toBe(true)
    expect(wrapper1.contains('.price')).toBe(true)
    expect(wrapper1.contains('.cal')).toBe(true)
    expect(wrapper1.contains('.type')).toBe(true)
    expect(wrapper2.contains('.piece')).toBe(true)
  })

  it('has rendering prices correctly to 2 decimal places', () => {
    expect(wrapper1.html()).toContain('69.50')
    expect(wrapper2.html()).toContain('23.00')
  })

  it('has rendering calorie information correctly', () => {
    expect(wrapper1.html()).toContain('200')
    expect(wrapper2.html()).toContain('300')
  })
})
