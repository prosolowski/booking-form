<template>
  <div class="booking-calendar">
    <div class="booking-calendar__header">February 2022</div>

    <ol class="booking-calendar__weekdays">
      <li v-for="day in weekdays" :key="day">
        {{ day }}
      </li>
    </ol>

    <ol class="booking-calendar__days">
      <li
        class="day"
        v-for="day in days"
        :key="day.date"
        :class="{
          'day--not-current': !isCurrentMonth,
          'day--today': day.date === today,
        }"
      >
        <span>{{ getDay(day.date) }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  data() {
    return {
      selectedDate: dayjs(),
    };
  },
  computed: {
    days() {
      return [...this.currentMonthDays];
    },
    weekdays() {
      return WEEKDAYS;
    },
    today() {
      return dayjs().format("YYYY-MM-DD");
    },
    month() {
      return Number(this.selectedDate.format("M"));
    },
    year() {
      return Number(this.selectedDate.format("YYYY"));
    },
    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },
    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: true,
        };
      });
    },
  },
  methods: {
    getDay(date) {
      return dayjs(date).format("D");
    },
  },
};
</script>

<style lang="scss" scoped>
.booking-calendar {
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #333333;
    height: 3rem;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 3rem;
  }
  &__weekdays,
  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
    padding-left: 0;
    margin: 0;
    & > * {
      width: 2rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.75rem;
      line-height: 1rem;
    }
    .day {
      &--today span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: 2px solid #A6CBA2;
        border-radius: 3rem;
        box-sizing: border-box;
      }
    }
  }
  &__weekdays li {
    color: #999999;
  }
}
</style>
