import Vue from 'vue'
import { mount, shallow } from 'vue-test-utils'
// import { SizeBadge } from '@/content/components'
// import { SizeBadge } from '@components'
import SizeBadge from '@/content/components/size-badge/size-badge'

describe('SizeBadge', () => {
  const wrapper1 = shallow(SizeBadge, {
    propsData: {
      size: 'l',
      active: false,
    }
  })

  const wrapper2 = shallow(SizeBadge, {
    propsData: {
      size: 'm',
      active: true,
    }
  })

  it('has name configured', () => {
    expect(SizeBadge.name).toEqual('size-badge')
  })

  it('has rendering correctly', () => {
    expect(wrapper1.contains('.size')).toBe(true)
    expect(wrapper1.props().size).toBe('l')
    expect(wrapper2.props().size).toBe('m')
  })

  it('is active', () => {
    expect(wrapper2.contains('.size--active')).toBe(true)
    expect(wrapper2.props().active).toBe(true)
  })

  it('is not active', () => {
    expect(wrapper1.contains('.size--active')).toBe(false)
    expect(wrapper1.props().active).toBe(false)
  })
})
