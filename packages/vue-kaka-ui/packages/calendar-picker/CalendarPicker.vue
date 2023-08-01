<template>
  <div class="date-range-container">
    <div v-if="label" class="c-input-label">
      <svg-icon class="require-icon" icon="require" v-if="state.required"></svg-icon>
      <span class="c-input-label-txt">{{ label }}: </span>
    </div>
    <div class="date-range-picker">
      <div class="date-input" @click.stop="showPicker = true">
        <input type="text" class="start-date" :value="startDate" placeholder="开始日期" />
        <span class="separator">~</span>
        <input type="text" class="end-date" :value="endDate" placeholder="结束日期" />
        <span style="font-size: 0;" class="calendar-icon">
          <svg t="1683597753230" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="3254" width="16" height="16">
            <path
              d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z"
              fill="#999999" p-id="3255">
            </path>
          </svg>
        </span>
        <span style="font-size: 0;" class="cancel-icon" @click.stop="handleCancel">
          <svg t="1683610896580" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="4238" width="16" height="16">
            <path
              d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384 384-172.8 384-384S723.2 128 512 128zM672 627.2c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L512 556.8l-115.2 115.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L467.2 512 352 396.8C339.2 384 339.2 364.8 352 352s32-12.8 44.8 0L512 467.2l115.2-115.2c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L556.8 512 672 627.2z"
              p-id="4239" fill="#e6e6e6"></path>
          </svg>
        </span>
      </div>
      <span v-if="state.error" class="c-input-error">{{ state.message }}</span>
    </div>
    <div class="date-wrapper" v-if="showPicker">
      <!-- <div class="date-header">
        <div class="date-title">{{ title }}</div>
        <button class="btn-cancel" @click="handleCancel()">取消</button>
        <button class="btn-confirm" @click="handleConfirm()">确定</button>
      </div> -->
      <div class="date-body">
        <div class="calendar">
          <div class="calendar-header">
            <div style="display:flex;">
              <div class="calendar-btn" @click.stop="handlePrevYear()" style="margin-right: 5px;">&lt;&lt;</div>
              <div class="calendar-btn" @click.stop="handlePrevMonth()">&lt;</div>
            </div>
            <div class="calendar-title" style="margin-right: 180px;">{{ year }}年{{ month }}月</div>
            <div class="calendar-title">{{ year }}年{{ month + 1 }}月</div>
            <div style="display:flex;">
              <div class="calendar-btn" @click.stop="handleNextMonth()" style="margin-right: 5px;">&gt;</div>
              <div class="calendar-btn" @click.stop="handleNextYear()">&gt;&gt;</div>
            </div>
          </div>
          <div class="calendar-body">
            <div class="start-calendar">
              <div class="calendar-weekdays">
                <div class="calendar-weekday" v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
              </div>
              <div class="calendar-days">
                <div class="calendar-day" v-for="day in leftDays" :class="{
                  'current-month': day.month === month, 'selected': isInLeftRange(day),
                  'current-select-day': day.date == startDate || day.date == endDate, 'current-day': day.date == formatDate('YYYY-MM-DD')
                }" :key="day.date" @click.stop="handleDayClick(day)">
                  {{ day.day }}
                </div>
              </div>
            </div>
            <div class="end-calendar">
              <div class="calendar-weekdays">
                <div class="calendar-weekday" v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
              </div>
              <div class="calendar-days">
                <div class="calendar-day" v-for="day in rightDays" :class="{
                  'current-month': day.month === month + 1, 'selected': isInRightRange(day),
                  'current-select-day': day.date == startDate || day.date == endDate, 'current-day': day.date == formatDate('YYYY-MM-DD')
                }" :key="day.date" @click.stop="handleDayClick(day)">
                  {{ day.day }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CalendarPicker'
}
</script>
<script lang="ts" setup>
import { ref, onMounted, watchEffect, onUnmounted, reactive, watch } from 'vue';
import { emitter } from '../utils/eventBus';
import { formatDate } from '../utils/help';
interface DateObject {
  date: string;
  day: number;
  month: number;
  year: number;
}
type RulesProp = RullProp[];

interface RullProp {
  required?: boolean
  message: string
}
interface CalendarPickerProps {
  value?: [string?, string?];
  rules?: RulesProp;
  label?: string
}
const props = defineProps<CalendarPickerProps>();
const emit = defineEmits(['update:value'])

const state = reactive({
  message: '',
  error: false,
  required: false,
})
const title = ref('');
const showPicker = ref(false);
const startDate = ref('');
const endDate = ref('');
const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
let leftDays = ref<DateObject[]>([])
let rightDays = ref<DateObject[]>([])
let year = ref(new Date().getFullYear());
let month = ref(new Date().getMonth() + 1);
// get the number of days in a month
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};
// get the first day of a month
const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};
const createDaysArray = (year, month) => {
  let days: DateObject[] = []
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const prevMonthDays = getDaysInMonth(year, month - 1);
  for (let i = firstDay; i > 0; i--) {
    // console.log('------')
    const prevMonthDay = prevMonthDays - (i - 1);
    days.push({
      date: `${year}-${fixedZero(month - 1)}-${fixedZero(prevMonthDay)}`,
      day: prevMonthDay,
      month: month - 1,
      year: year
    });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: `${year}-${fixedZero(month)}-${fixedZero(i)}`,
      day: i,
      month: month,
      year: year
    });
  }
  const lastDayOfWeek = days.length % 7;
  // console.log(lastDayOfWeek)
  if (lastDayOfWeek !== 0) {
    for (let i = 1; i <= 7 - lastDayOfWeek; i++) {
      days.push({
        date: `${year}-${fixedZero(month + 1)}-${fixedZero(i)}`,
        day: i,
        month: month + 1,
        year: year
      });
    }
  }
  return days
}
// create the days array for the current month
const createLeftDaysArray = (year, month) => {
  // leftDays.value = [];
  // nextTick(() => {
  leftDays.value = createDaysArray(year, month)
  // })
};
const fixedZero = (num: number): string => {
  return num < 10 ? ('0' + num) : ('' + num)
}
const createRightDaysArray = (year, month) => {
  // rightDays.value = [];
  // nextTick(() => {
  rightDays.value = createDaysArray(year, month)
  // })
};
// update the calendDatear title and days array
const update = () => {
  title.value = `${year.value}年${month.value}月`;
  createLeftDaysArray(year.value, month.value);
  createRightDaysArray(year.value, month.value + 1);
};
// select a day
const handleDayClick = (day: DateObject) => {
  // let tempMonth = parseInt(startDate.value.split('-')[1]) || 0
  // // console.log(day.month, tempMonth)
  // if (day.month - tempMonth > 1) {
  //   handleNextMonth()
  // }
  //开始时间和结束时间都为空时
  if (!startDate.value && !endDate.value) {
    startDate.value = day.date
  }//开始时间有了
  else if (startDate.value && compareDate(day.date, startDate.value)) {
    endDate.value = day.date
  }
};
const compareDate = (date1, date2) => {
  let oData1 = new Date(date1).getTime()
  let oData2 = new Date(date2).getTime()
  if (oData1 > oData2) {
    return true
  } else {
    return false
  }
};

const isInLeftRange = (day: DateObject): boolean => {
  if (!startDate.value || !endDate.value) {
    return false;
  }

  return compareDate(day.date, startDate.value) && compareDate(endDate.value, day.date) && day.month == month.value
};
const isInRightRange = (day: DateObject): boolean => {
  if (!startDate.value || !endDate.value) {
    return false;
  }

  return compareDate(day.date, startDate.value) && compareDate(endDate.value, day.date) && day.month == month.value + 1
};
// handle cancel button click
const handleCancel = () => {
  if (startDate.value || endDate.value) {
    startDate.value = '';
    endDate.value = '';
    year.value = new Date().getFullYear()
    month.value = new Date().getMonth() + 1
    if (!showPicker.value) {
      emit('update:value', [startDate.value, endDate.value])
    }
    showPicker.value = false;
  }
};
// handle previous year button click
const handlePrevYear = () => {
  year.value--;
};
// handle next year button click
const handleNextYear = () => {
  year.value++;
};
// handle previous month button click
const handlePrevMonth = () => {
  if (month.value === 1) {
    year.value--;
    month.value = 12;
  } else {
    month.value--;
  }
};
// handle next month button click
const handleNextMonth = () => {
  if (month.value === 12) {
    year.value++;
    month.value = 1;
  } else {
    month.value++;
  }
}
const closePicker = () => {
  showPicker.value = false
}
const validateInput = (): boolean => {
  // 接收从父组件传递过来的验证规则（数组类型）
  if (props.rules) {
    // 调用数组的 every 方法，判断是否符合定义的表单验证规则
    const allPassed = props.rules.every(rule => {
      // 表单是否通过验证的标志
      let passed = true
      // 先将规则的提示信息赋值，如果表单验证失败，则会直接获得该message信息
      // 因为 every 只要有一个错误 就会返回错误，且其他数组不会再进行判断
      state.message = rule.message
      if (rule.required) {
        if (props.value) {
          if (props.value[0] || props.value[1]) {
            passed = true
          } else {
            passed = false
          }
        } else {
          passed = false
        }

        // console.log(props.value)
      }
      // console.log(passed)
      return passed
    })
    // 如果表单验证失败，则 allPassed 状态为 false 但是 state 对象中的 error应为 true
    // 所以 allPassed 取反赋值
    state.error = !allPassed
    // validateInput 方法的返回结果
    return allPassed
  }
  // 如果没有 props.rules 的表单规则 则返回 true
  return true
};
watchEffect(() => {
  if (props.value) {
    startDate.value = props.value[0] || ''
    endDate.value = props.value[1] || ''
    if (props.value[0]) {
      year.value = new Date(props.value[0]).getFullYear()
      month.value = new Date(props.value[0]).getMonth() + 1
    } else {
      year.value = new Date().getFullYear()
      month.value = new Date().getMonth() + 1
    }
  }
})
watchEffect(() => {
  update()
})
watch(showPicker, () => {
  if (!showPicker.value) {
    emit('update:value', [startDate.value, endDate.value])
  }
})
onMounted(() => {
  window.addEventListener('click', closePicker)
  update()
  props.rules?.every(rule => {
    if (rule.required) {
      state.required = true
    }
  })
  emitter.emit("formItemCreated", validateInput)
})
onUnmounted(() => {
  window.removeEventListener('click', closePicker)
})
</script>
<style scoped lang="scss">
.date-range-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;

  .c-input-label {
    position: relative;
    min-width: 84px;
    text-align: right;
    margin-right: 12px;
    font-size: 15px;
    white-space: nowrap;

    .c-input-label-txt {
      position: relative;
    }
  }
}

.date-range-picker {
  width: 256px;
  height: 100%;
  display: flex;
  position: relative;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: #1890ff;

    .calendar-icon {
      display: none;
    }

    .cancel-icon {
      display: block;
    }
  }
}

.calendar-icon {
  display: block;
}

.cancel-icon {
  display: none;
}

.date-input {
  display: flex;
  align-items: center;
  padding: 0 8px;
  width: 240px;

}

.c-input-error {
  position: absolute;
  color: #ff4d4f;
  font-size: 12px;
  top: 36px;
  left: 0;
}

.separator {
  margin: 0 8px;
  font-weight: bold;
}

.date-wrapper {
  width: 600px;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
}

.date-title {
  font-size: 16px;
  font-weight: bold;
}

.btn-cancel,
.btn-confirm {
  border: none;
  background-color: transparent;
  color: #666;
  font-size: 14px;
}

.btn-confirm {
  color: #007aff;
}

.btn-confirm:hover {
  text-decoration: underline;
  cursor: pointer;
}

.calendar {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
}

.calendar-btn {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  transition: background-color 0.2s;
  color: #999;
}

.calendar-btn:hover {
  background-color: #ccc;
}

.calendar-title {
  font-size: 16px;
  font-weight: bold;
}

.calendar-body {
  display: flex;
  font-size: 14px;
}

.start-calendar,
.end-calendar {
  flex: 1;
}

.start-calendar {
  margin-right: 30px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 4px;
  border-bottom: 1px solid #ccc;
}

.calendar-weekday {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  // gap: 4px;
  padding: 4px;
}

.calendar-day {
  // width: 24px;
  // height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  // border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #00000040;
  padding: 3px 0;
}

.current-month {
  color: #666;
}

.selected {
  background: #e6f7ff;
  // color: #fff;
}

.current-select-day {
  background: #1890ff;
  color: #fff;
}

.current-day {
  border: 1px solid #1890ff;
}

.start-date,
.end-date {
  width: 45%;
  // height: 32px;
  // line-height: 36px;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid #E2E2E2;
  align-items: center;
  outline: none;
  font-size: 14px;
  color: #000;
  border: none;
  text-align: center;

  &::placeholder {
    color: #999999;
    font-size: 12px;
    line-height: 36px;
  }
}
</style>