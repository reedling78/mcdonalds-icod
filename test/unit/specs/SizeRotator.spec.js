import Vue from 'vue'
import { mount, shallow } from 'vue-test-utils'
import SizeRotator from '@/content/containers/size-rotator/size-rotator'

describe('SizeRotator', () => {
  const wrapper1 = shallow(SizeRotator, {
    propsData: {
      id: 1,
      title: 'title',
      image: 'abc.png',
      description: 'description',
      types: [
        {
          type: 'type',
        }
      ],
    }
  })

  // TODO:
  it('has name configured', () => {
    expect(SizeRotator.name).toEqual('size-rotator')
  })
})
