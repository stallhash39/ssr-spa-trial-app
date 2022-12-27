<template>
  <div class="mb-10 block">
      <div class="flex" v-bind:class="{ '-mx-1': isDeleteComponent }">
          <input v-for="(i, index) in input_length" :key="index"
            class="font-lato-semibold w-12 h-12 text-xl font-semibold mr-1 border-dark-300 text-dark-500 lg:mr-1 lg:ml-1 rounded-md border border-primary text-center focus:outline-none active:text-dark-500"
            :class="{'border-state-alert': error }"
            type="tel"
            maxlength=1
            pattern="[0-9]{1}"
            autocomplete="off"
            @paste="handlePaste($event)"
            @input="ChangeToNextInput(($event.target as HTMLInputElement)), updateValue(index, ($event.target as HTMLInputElement).value)"
            @keydown.backspace="($event.target as HTMLInputElement).value || handleBackspace(($event.target as HTMLInputElement), index)"
            @keydown.right="handleRight(($event.target as HTMLInputElement), index)"
            @keydown.left="handleLeft(($event.target as HTMLInputElement), index)"
            @focus="handleFocus(($event.target as HTMLInputElement))"
            :placeholder="`${index}`"
            :name="`${index}`"
            :ref="`${index}`"
          >
      </div>
      <span v-if="prop_error_message" class="block md:ml-2 text-sm text-state-alert">{{prop_error_message}}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, inject, watch, nextTick, ref, Ref } from 'vue';
export interface Props {
    isDeleteComponent?: boolean,
    error?: boolean,
    prop_error_message?: string
  };
  const props = withDefaults(defineProps<Props>(), {
    prop_error_message: ""
  });
const $timestampLog:any = inject('$timestampLog');
const inputs:Ref<HTMLInputElement[]> = ref<HTMLInputElement[]>([]);
const emit = defineEmits(['otp']);
const input_length:number = 6;
let array_item:Array<number|undefined> = [];
watch(() => array_item, (value) => {
  if (value === undefined) {
    array_item = Array<number|undefined>(input_length);
  }
});
watch(() => props.error, (value) => {
  if (value) {
    HighLightBorderWithError();
  } else {
    HighLightBorderClear();
  }
  $timestampLog('Error with OTP ----- Value Of "error" Updated ', value);
});
onMounted(() => {
  $timestampLog('Verification Code mounted', inputs.value['0'].value);
  (document.querySelector(`[name="0"]`) as HTMLInputElement).focus();
  nextTick(() => {
    (document.querySelector(`[name="0"]`) as HTMLInputElement).select();
  });
});
const updateValue = (index:number, val:string) => {
  const e = parseInt(val);
  if (Number.isInteger(e))
    {
      array_item[index] = e;
    }
  else {
    inputs.value[index].value = '';
  }
  emit('otp', array_item);
  $timestampLog('updateValue ', e);
};
const ChangeToNextInput = (target:HTMLInputElement) => {
  if (target.nextElementSibling && target.value) {
    (target.nextElementSibling as HTMLInputElement).focus();
    (target.nextElementSibling as HTMLInputElement).select();
    emit('otp', array_item);
  }
  $timestampLog('ChangeToNextInput ', target.value);
};
const handlePaste = (e:ClipboardEvent) => {
  const paste = (e.clipboardData as DataTransfer).getData("text");
  $timestampLog('ClipBoard', paste);
  array_item = Array<number|undefined>(input_length);
  $timestampLog('Refs: ', inputs);
  for (var i = 0; i < input_length; i++) {
    const num:number = parseInt(paste[i]);
    if(Number.isInteger(num)) {
      array_item[i] = num;
      inputs.value[i].value = `${num}`;
      (document.querySelector(`[name="${i}"]`) as HTMLInputElement).value = `${num}`;
      $timestampLog('num: ', i, num, 'ref: ', inputs.value[i].value);
    }
  }
  emit('otp', array_item);
  $timestampLog('Pasted ', paste, array_item);
};
const handleBackspace = (target:HTMLInputElement, index:number) => {
  if (index > 0) {
    (target.previousElementSibling as HTMLInputElement).focus();
    array_item[index] = undefined;
    emit('otp', array_item);
    $timestampLog('handleBackspace ', target);
  }
};
const handleLeft = (target:HTMLInputElement, index:number) => {
  if (index > 0) {
    (target.previousElementSibling as HTMLInputElement).focus();
  }
};
const handleRight = (target:HTMLInputElement, index:number) => {
  if (index < (input_length - 1)) {
    (target.nextElementSibling as HTMLInputElement).focus();
  }
};
const handleFocus = (target:HTMLInputElement) => {
  target.select();
};
const HighLightError = () => {
  $timestampLog('Error with OTP-----');
  for(var i in array_item){
    if(props.error) {
      inputs.value[i].classList.add('border-state-alert');
    } else {
      inputs.value[i].classList.remove('border-state-alert');
    }
  }
};
const HighLightBorderWithError = () => {
  for(var i in array_item) {
    inputs.value[i].classList.add('border-red');
  }
};
const HighLightBorderClear = () => {
  for(var i in array_item){
    inputs.value[i].classList.remove('border-red');
  }
};
</script>
<style scoped>
  input:focus {
    border:1px solid #3d9f95;
  }
  .border-red{
    border: 1px solid red;
  }
</style>
