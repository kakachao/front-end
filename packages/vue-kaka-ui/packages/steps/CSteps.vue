<template>
  <div class="c-steps-area" :style="`width: ${totalWidth};`">
    <div class="c-steps">
      <div :class="['c-steps-item',
        {
          'finish': currentStep > index + 1,
          'process': currentStep === index + 1,
          'wait': currentStep < index + 1
        }
      ]" v-for="(step, index) in steps" :key="index">
        <div class="c-info-wrap" @click="onChange(index + 1)">
          <div class="c-steps-icon">
            <span class="c-num" v-if="currentStep <= index + 1">{{ index }}</span>
            <svg class="c-icon" v-else viewBox="64 64 896 896" aria-hidden="true" focusable="false">
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z">
              </path>
            </svg>
          </div>
          <div class="c-steps-content">
            <div class="c-steps-title">{{ step.title }}</div>
            <!-- <div class="c-steps-description" v-show="step.description" :style="`max-width: ${descMaxWidth}px;`">{{
              step.description }}</div> -->
          </div>
        </div>
      </div>
      <div class="c-steps-item">
        <div class="c-info-wrap finish" @click="onChange(totalSteps + 1)">
          <div class="c-steps-icon">
            <span v-if="currentStep < totalSteps + 1" class="c-num">{{ totalSteps }}</span>
            <svg class="c-icon" v-else viewBox="64 64 896 896" aria-hidden="true" focusable="false">
              <path
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z">
              </path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CSteps'
}
</script>
<script setup lang="ts">
import { computed } from 'vue'
interface Step {
  title?: string // 标题
  description?: string // 描述
}
interface CStepsProps {
  steps?: Array<Step>;
  current?: number;
  width?: string | number;
  descMaxWidth?: number
}
const props = withDefaults(defineProps<CStepsProps>(), {
  steps: () => [],
  current: 1,
  width: '100%',
  descMaxWidth: 140
})
const emit = defineEmits(['update:current', 'change'])

const totalWidth = computed(() => {
  if (typeof props.width === 'number') {
    return props.width + 'px'
  } else {
    return props.width
  }
})
const totalSteps = computed(() => { // 步骤总数
  return props.steps.length
})
const currentStep = computed(() => {
  if (props.current < 1) {
    return 1
  } else if (props.current > totalSteps.value + 1) {
    return totalSteps.value + 1
  } else {
    return props.current
  }
})

function onChange(index: number) { // 点击切换选择步骤
  if (currentStep.value !== index) {
    emit('update:current', index)
    emit('change', index)
  }
}
</script>

<style scoped lang="scss">
.c-steps-area {
  margin: 0px auto;

  .c-steps {
    display: flex;

    .c-steps-item {
      display: inline-block;
      overflow: hidden;
      font-size: 16px;
      line-height: 32px;

      &:not(:last-child) {
        margin-right: 16px;
        flex: 1; // 弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容

        // .c-steps-title {
        //   &:after {
        //     background: #e8e8e8;
        //     position: absolute;
        //     top: 16px;
        //     left: 100%;
        //     display: block;
        //     width: 3000px;
        //     height: 1px;
        //     content: "";
        //     cursor: auto;
        //     transition: all .3s;
        //   }
        // }
      }

      &:last-child {
        .c-steps-content {
          border-top: none !important;
        }
      }

      .c-info-wrap {
        display: flex;

        .c-steps-icon {
          // display: inline-block;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          line-height: 36px;
          text-align: center;
          background: #fff;
          border: 1px solid rgba(0, 0, 0, .25);
          transition: all .3s;

          .c-num {
            display: inline-block;
            font-size: 16px;
            color: #666666;
            transition: all .3s;
          }

          .c-icon {
            fill: #ccc;
            width: 16px;
            height: 16px;
          }
        }

        .c-steps-content {
          display: inline-block;
          vertical-align: top;
          flex: 1;
          text-align: center;
          // margin-top: 12px;
          border-top: 1px solid #F0F0F0;
          margin: 0 30px;
          margin-top: 12px;
          // position: relative;

          .c-steps-title {
            position: relative;
            display: inline-block;
            // padding-right: 16px;
            color: #666666;
            font-size: 15px;
            transition: all .3s;
            white-space: nowrap;
          }

          .c-steps-description {
            font-size: 14px;
            color: rgba(0, 0, 0, .45);
            word-wrap: break-word;
            transition: all .3s;
          }
        }
      }
    }

    .finish {
      .c-info-wrap {
        cursor: pointer;

        .c-steps-icon {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, .25);
          border-color: #ccc;
        }

        .c-steps-content {
          border-top-color: #ccc;

          .c-steps-title {
            // color: rgba(0, 0, 0, .85);
            color: #ccc;

            &:after {
              background: #ccc;
            }
          }

          .c-steps-description {
            color: rgba(0, 0, 0, .45);
          }
        }

        &:hover {
          .c-steps-content {
            .c-steps-title {
              color: #ccc;
            }

            .c-steps-description {
              color: #ccc;
            }
          }
        }
      }
    }

    .process {
      .c-info-wrap {
        .c-steps-icon {
          background: #ccc;
          border: 1px solid rgba(0, 0, 0, .25);
          border-color: #ccc;

          .c-num {
            color: #fff;
          }
        }

        .c-steps-content {
          border-top-color: #ccc;

          .c-steps-title {
            font-weight: 500;
            // color: rgba(0, 0, 0, .85);
            color: #ccc;
          }

          .c-steps-description {
            color: rgba(0, 0, 0, .85);
          }
        }
      }
    }

    .wait {
      .c-info-wrap {
        cursor: pointer;

        &:hover {
          .c-steps-icon {
            border-color: #ccc;

            .c-num {
              color: #ccc;
            }
          }

          .c-steps-content {
            .c-steps-title {
              color: #ccc;
            }

            .c-steps-description {
              color: #ccc;
            }
          }
        }
      }
    }
  }
}
</style>