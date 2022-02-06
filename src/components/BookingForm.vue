<template>
  <div class="booking-form">
    <div class="booking-form__price">298 zł</div>
    <div class="booking-form__rate">
      <StarRating :rate="3.5" :reviews="123" />
    </div>
    <div class="booking-form__btn">
      <button type="button" class="btn btn-green">Reserve</button>
    </div>
    <div class="booking-form__input">
      <div class="date-range" v-click-outside="hideCalendar">
        <div
          @click="toggleCalendar()"
          class="date-range__from"
          :class="{ active: calendarFlag, selected: selectedDate.dateFrom }"
        >
          <div>
            {{ selectedDate.dateFrom ? selectedDate.dateFrom : 'Date from' }}
            <span
              v-if="selectedDate.dateFrom"
              @click="resetDate(selectedDate.dateFrom)"
              title="Reset date"
              ><IconClose /></span
            >
          </div>
          <input
            type="hidden"
            placeholder="Date from"
            :value="selectedDate.dateFrom"
          />
        </div>
        <IconArrowRight class="divider" />
        <div
          @click="toggleCalendar()"
          class="date-range__to"
          :class="{ active: calendarFlag && selectedDate.dateFrom, selected: selectedDate.dateTo }"
        >
          <div>
            {{ selectedDate.dateTo ? selectedDate.dateTo : 'Date to' }}
            <span
              v-if="selectedDate.dateTo"
              @click="resetDate(selectedDate.dateTo)"
              title="Reset date"
              ><IconClose /></span
            >
          </div>
          <input
            type="hidden"
            placeholder="Date to"
            :value="selectedDate.dateTo"
          />
        </div>

        <div class="calendar-dropdown" v-if="calendarFlag">
          <Calendar @selectedDate="selectDate" :dateRange="selectedDate" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "./StarRating.vue";
import IconArrowRight from "./IconArrowRight.vue";
import Calendar from "./Calendar.vue";
import IconClose from "./IconClose.vue";

export default {
  name: "BookingForm",
  components: {
    StarRating,
    IconArrowRight,
    Calendar,
    IconClose,
  },
  data() {
    return {
      calendarFlag: false,
      selectedDate: {
        dateFrom: "",
        dateTo: "",
      },
    };
  },
  methods: {
    toggleCalendar() {
      this.calendarFlag = !this.calendarFlag;
    },
    hideCalendar() {
      this.calendarFlag = false;
    },
    selectDate(dateSelected) {
      if (!this.selectedDate.dateFrom) {
        this.selectedDate.dateFrom = dateSelected;
      } else {
        this.selectedDate.dateTo = dateSelected;
      }
    },
    resetDate(date) {
      if(this.selectedDate.dateTo === date) {
        this.selectedDate.dateTo = "";
      } else {
        this.selectedDate.dateFrom = "";
        this.selectedDate.dateTo = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500;600;700&display=swap");
.booking-form {
  display: grid;
  width: 20.25rem;
  height: 8.5rem;
  padding: 1.5rem;
  background: #ffffff;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1.5rem 1.5rem 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "leftTop rightTop"
    "leftBottom rightTop"
    "bottom bottom";
  font-family: Montserrat;
  font-style: normal;
  color: #333333;
  &__price {
    grid-area: leftTop;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.5rem;
    display: flex;
    align-items: flex-end;
  }
  &__rate {
    grid-area: leftBottom;
    display: flex;
    align-items: flex-end;
  }
  &__btn {
    grid-area: rightTop;
    display: flex;
    justify-content: flex-end;
    .btn-green {
      font-family: Montserrat;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.375rem;
      color: #ffffff;
      background-color: #4e9845;
      min-width: 6.375rem;
      height: 3rem;
      border: none;
      border-radius: 3rem;
      cursor: pointer;
      &:hover {
        background-color: #46873e;
      }
    }
  }
  &__input {
    grid-area: bottom;
    display: flex;
    align-items: center;
    .date-range {
      width: 100%;
      height: 3rem;
      border: 1px solid #a6cba2;
      box-sizing: border-box;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .divider {
        display: flex;
        flex: 1;
        justify-content: center;
      }
      &__from, &__to {
        font-family: Montserrat;
        cursor: pointer;
        width: 100%;
        border: none;
        border-radius: 3rem;
        padding: 8px;
        margin: 8px;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.25rem;
        color: #999999;
        &:hover {
          background: #edf5ec;
          color: #4e9845;
        }
        &.active {
          background: #edf5ec;
          outline-color: #edf5ec;
          caret-color: transparent;
          color: #4e9845;
        }
        &.selected {
          background: transparent;
          outline-color: transparent;
          font-weight: 600;
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: #333333;
        }
        & > div > span {
          padding-left: 0.5rem;
        }
      }
      &__to.active.selected {
        background: #edf5ec;
        color: #4e9845;
      }
      .calendar-dropdown {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 3.5rem;
        width: auto;
        height: auto;
        background: #ffffff;
        box-shadow: 0px 10px 40px rgba(51, 47, 47, 0.15);
        border-radius: 1.25rem;
        padding: 1.5rem;
      }
    }
  }
}
</style>
