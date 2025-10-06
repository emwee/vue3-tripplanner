import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import Select from '@/components/SelectBox.vue'

const DEFAULT_PROPS = {
  options: [{ id: '66746', text: 'Paris' }],
  selectedOption: undefined,
  defaultOption: 'Choose the city',
  disabled: false,
  label: 'City',
  onChange: (cityId: string) => {
    console.log(cityId)
  },
}

describe('SelectBox', () => {
  it('renders properly', () => {
    const wrapper = mount(Select, {
      props: DEFAULT_PROPS,
    })

    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('City')
    expect(wrapper.findAll('option').length).toBe(2) // including the default option
    expect(wrapper.findAll('option')[0].text()).toBe('Choose the city')
    expect(wrapper.findAll('option')[1].text()).toBe('Paris')
  })

  it('renders properly when no label is set', () => {
    const wrapper = mount(Select, {
      props: {
        ...DEFAULT_PROPS,
        label: undefined,
      },
    })
    expect(wrapper.find('label').exists()).toBe(false)
  })

  it('handles selected value properly', () => {
    const wrapper = mount(Select, {
      props: {
        ...DEFAULT_PROPS,
        selectedOption: '66746', // Paris
      },
    })

    expect(wrapper.find('select').element.value).toBe('66746')
  })

  it('handles change properly', async () => {
    // Create a mock callback function
    const handleChange = vi.fn()

    // Create a mock callback function
    const wrapper = mount(Select, {
      props: {
        ...DEFAULT_PROPS,
        onChange: handleChange,
      },
    })

    // Find option by its visible text
    const options = wrapper.findAll('option')
    const targetOption = options.find((opt) => opt.text() === 'Paris')

    const select = wrapper.find('select')
    await select.setValue(targetOption!.element.value)

    // Assert the callback was called
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('66746')
  })
})
