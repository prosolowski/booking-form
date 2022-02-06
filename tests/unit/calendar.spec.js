import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Calendar from '@/components/Calendar.vue'

describe('Calendar.vue', () => {
  it('calendar has correct dates selected', () => {
    const dateRange = {
      dateFrom: "8 Feb 2022",
      dateTo: "11 Feb 2022",
    };
    const wrapper = shallowMount(Calendar, {
      props: { dateRange }
    });
    expect(wrapper.find('.day--selected.day--between').text()).equal('8');
    expect(wrapper.find('.day--selected:not(.day--between)').text()).equal('11');
  })
})

import StarRating from '@/components/StarRating.vue'

describe('StarRating.vue', () => {
  it('reviews has correct number', () => {
    const wrapper = shallowMount(StarRating, {
      props: { reviews: 99 }
    });
    expect(wrapper.find('.star-rating .reviews').text()).to.equal('99');
  })
})
