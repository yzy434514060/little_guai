<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue'])

const showPicker = ref(false)
const pickerRef = ref(null)

const [hours, minutes] = props.modelValue.split(':')
const selectedHour = ref(parseInt(hours))
const selectedMinute = ref(parseInt(minutes))

const tempHour = ref(selectedHour.value)
const tempMinute = ref(selectedMinute.value)

const hourOptions = Array.from({ length: 24 }, (_, i) => i)
const minuteOptions = Array.from({ length: 60 }, (_, i) => i)

const formattedTime = computed(() => {
  return `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
})

const selectTime = () => {
  selectedHour.value = tempHour.value
  selectedMinute.value = tempMinute.value
  const newTime = `${selectedHour.value.toString().padStart(2, '0')}:${selectedMinute.value.toString().padStart(2, '0')}`
  emit('update:modelValue', newTime)
  showPicker.value = false
}

const handleClickOutside = (event) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target)) {
    showPicker.value = false
  }
}

watch(showPicker, (newVal) => {
  if (newVal) {
    tempHour.value = selectedHour.value
    tempMinute.value = selectedMinute.value
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

watch(() => props.modelValue, (newVal) => {
  const [h, m] = newVal.split(':')
  selectedHour.value = parseInt(h)
  selectedMinute.value = parseInt(m)
})
</script>

<template>
  <div class="relative" ref="pickerRef">
    <button
      @click="showPicker = !showPicker"
      type="button"
      class="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-sm text-left hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
    >
      {{ formattedTime }}
    </button>

    <div
      v-if="showPicker"
      class="absolute top-full mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-3 z-50"
    >
      <div class="flex gap-2">
        <div class="flex flex-col">
          <label class="text-xs text-gray-500 dark:text-gray-400 mb-1">时</label>
          <select
            v-model.number="tempHour"
            size="4"
            class="px-2 py-1 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-sm overflow-y-auto"
          >
            <option v-for="hour in hourOptions" :key="hour" :value="hour">
              {{ hour.toString().padStart(2, '0') }}
            </option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs text-gray-500 dark:text-gray-400 mb-1">分</label>
          <select
            v-model.number="tempMinute"
            size="4"
            class="px-2 py-1 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded text-sm overflow-y-auto"
          >
            <option v-for="minute in minuteOptions" :key="minute" :value="minute">
              {{ minute.toString().padStart(2, '0') }}
            </option>
          </select>
        </div>
      </div>

      <button
        @click.stop="selectTime"
        type="button"
        class="w-full mt-2 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded text-sm font-medium transition-colors"
      >
        确定
      </button>
    </div>
  </div>
</template>
