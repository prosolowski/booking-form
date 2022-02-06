<template>
  <div class="booking-calendar">
    <div class="booking-calendar__header">
      <button @click="getPreviousMonth" type="button" class="btn btn-arrow">
        <IconArrowNavLeft />
      </button>
      <strong>{{ monthName }} {{ year }}</strong>
      <button @click="getNextMonth" type="button" class="btn btn-arrow">
        <IconArrowNavRight />
      </button>
    </div>

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
          'day--not-current': !day.isCurrentMonth,
          'day--today': day.date === today,
          'day--selected': (day.date === dateFrom || day.date === dateTo),
          'day--between': datesBetween(day.date),
        }"
        @click="selectDate(day.date)"
      >
        <span>{{ getDay(day.date) }}</span>
      </li>
    </ol>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

import IconArrowNavLeft from "./IconArrowNavLeft.vue";
import IconArrowNavRight from "./IconArrowNavRight.vue";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default {
  data() {
    return {
      selectedDate: dayjs(),
      dateFrom: "",
      dateTo: "",
    };
  },
  components: {
    IconArrowNavLeft,
    IconArrowNavRight,
  },
  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
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
    monthName() {
      return this.selectedDate.format("MMMM");
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
    previousMonthDays() {
      const firstDayOfMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        "month"
      );
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfMonthWeekday
        ? firstDayOfMonthWeekday
        : 0;
      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
              }`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false,
          };
        }
      );
    },
    nextMonthDays() {
      const lastDayOfMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      );
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      const visibleNumberOfDaysFromNextMonth = lastDayOfMonthWeekday
        ? 6 - lastDayOfMonthWeekday
        : lastDayOfMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false,
        };
      });
    },
  },
  methods: {
    getDay(date) {
      return dayjs(date).format("D");
    },
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    getPreviousMonth() {
      this.selectedDate = dayjs(this.selectedDate).subtract(1, "month");
    },
    getNextMonth() {
      this.selectedDate = dayjs(this.selectedDate).add(1, "month");
    },
    selectDate(date) {
      let formattedDate =
        this.getDay(date) +
        " " +
        dayjs(date).format("MMM") +
        " " +
        dayjs(date).format("YYYY");

      if (!this.dateFrom) {
        this.dateFrom = date;
        this.$emit("selectedDate", formattedDate);
      } else {
        if(!dayjs(date).isBefore(dayjs(this.dateFrom))) {
          this.dateTo = date;
          this.$emit("selectedDate", formattedDate);
        }
      }
    },
    datesBetween(date) {
      return (!dayjs(date).isBefore(dayjs(this.dateFrom)) && dayjs(date).isBefore(dayjs(this.dateTo)));
    }
  },
};
</script>

<style lang="scss" scoped>
.booking-calendar {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 1rem;
    color: #333333;
    height: 3rem;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
    border-radius: 3rem;
    padding: 0 1rem;
    .btn {
      padding: 0;
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
      height: 100%;
      width: 1rem;
    }
  }
  &__weekdays,
  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
    padding-left: 0;
    margin: 0;
    & > * {
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      font-weight: 600;
      font-size: 0.75rem;
      line-height: 1rem;
    }
    .day {
      cursor: pointer;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border: 2px solid #ffffff;
        border-radius: 3rem;
        box-sizing: border-box;
      }
      &--today span {
        border-color: #a6cba2;
        color: #4E9845;
      }
      &:hover span {
        background-color: #edf5ec;
      }
      &--selected {
        span {
          background-color: #4e9845;
          border: none;
          color: #ffffff;
        }
        &.day--between {
          background-color: #EDF5EC;
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
        &:not(.day--between) {
          background-color: #EDF5EC;
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
      }
      &--selected:hover span {
        background-color: #46873e;
      }
      &--between:not(&--selected) {
        background-color: #EDF5EC;
        color: #4E9845;
        span {
          border: none;
        }
      }
      &--not-current span {
        color: #d8d8d8;
      }
    }
  }
  &__weekdays li {
    color: #999999;
  }
}
</style>
