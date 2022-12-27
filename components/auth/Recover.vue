<template>
  <a
    @click="back()"
    class="mb-6 text-left text-xs text-dark-500 cursor-pointer font-lato-regular"
  >
  <ArrowNarrowLeft class="inline mr-2" /> Back
    to SignIn</a
  >

  <div v-if="step === 'Recover'">
    <h4 class="text-left text-dark-500 font-bold text-xl mb-5 font-nunito-bold">
      Recover your account
    </h4>
    <div class="form-group mb-10 text-left">
      <label>
        <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
          >Enter your recover code <span class="text-green-500">*</span></span
        >
      </label>
      <input
        type="text"
        class="font-lato-regular mt-1 block w-full rounded-md border border-dark-400 text-dark-500 py-3 px-4 focus:outline-none"
        :class="{ 'border-state-alert': error_message }"
        placeholder="e.g. 234546"
        v-model="recovery_code"
      />
      <span v-if="error_message" class="text-state-alert text-sm">{{
        error_message
      }}</span>
    </div>
    <button
      class="font-lato-semibold w-full px-6 py-4 border-b-2 border-green-800 text-base font-semibold rounded-md text-white text-center"
      @click="BeforeRecoveryStep2"
      :class="{
        ' bg-dark-300 cursor-default ': !green_button,
        ' border-green-800 bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out cursor-pointer ': green_button,
      }"
      :disabled="!green_button"
    >
      Verify Recovery Code
    </button>
  </div>

  <!-- Step #2 -->
  <div v-if="step === 'RecoverStep2'">
    <h4
      class="text-left text-dark-700 font-bold text-xl mb-5 font-lato-semibold"
    >
      Recover your account
    </h4>
    <div class="form-group mb-3 text-left">
      <input
        type="email"
        class="font-lato-regular mt-1 block w-full rounded-md border border-dark-300 py-3 px-4 focus:outline-none"
        placeholder="peppynoah@gmail.com"
        v-model="email"
        :class="{
          'border border-state-alert': error_old_email,
          'border-primary': true,
        }"
      />
      <span
        v-if="isOledEmailError"
        class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
        >{{ error_old_email }}</span
      >

      <label>
        <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
          >Old email address <span class="text-green-500">*</span></span
        >
      </label>
    </div>
    <div class="form-group mb-10 text-left">
      <input
        type="email"
        class="font-lato-regular mt-1 block w-full rounded-md border border-dark-300 py-3 px-4"
        placeholder="peppynoah@gmail.com"
        v-model="new_email"
        :class="{
          'border border-state-alert': error_new_email,
          'border-primary': true,
        }"
      />
      <span
        v-if="isNewEmailError"
        class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
        >{{ error_new_email }}</span
      >
      <label>
        <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
          >New email address <span class="text-green-500">*</span></span
        >
      </label>
    </div>
    <button
      class="font-lato-semibold w-full px-6 py-4 border-b-2 border-green-800 text-base font-semibold rounded-md text-white text-center"
      @click="SubmitQuery"
      :class="{
        ' bg-dark-300 cursor-default ': !green_button,
        ' border-green-800 bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out ': green_button,
      }"
      :disabled="!green_button"
      v-if="!showCode"
    >
      Get confirmation code on new mail
    </button>

    <div v-if="showCode">
      <hr class="mb-6 border-dark-300" />
      <p class="text-sm text-dark-800 mb-4 text-left font-lato-regular">
        We sent a 6 digit code to your new email address. Please enter the code
        in order to recover your account.
      </p>

      <VerificationCode
        v-on:otp="OtpUpdate"
        :error="otp_error"
        :prop_error_message="otp_error_message"
        ref="OTP_Field"
      />

      <p
        v-if="showResendCode === true"
        class="my-4 text-sm font-lato leading-normal text-left text-dark-400"
      >
        Didn’t receive a code?
        <span
          @click="ResendCode"
          class="text-sm font-lato leading-normal text-center font-semibold text-blue-500 cursor-pointer"
          >Resend Code</span
        >
      </p>

      <button
        class="font-lato-semibold w-full px-6 py-4 border-b-2 border-green-800 text-base font-semibold rounded-md text-white text-center"
        :class="{
          ' bg-dark-300 cursor-default ': !green_button,
          ' border-green-800 bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out': green_button,
        }"
        :disabled="!green_button"
        @click="OTPVerify"
      >
        Recover Account
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch} from 'vue';
import {useStore } from 'vuex';
import VerificationCode from './Verification-code.vue';
import ArrowNarrowLeft from "@/components/icons/ArrowNarrowLeft.vue";
interface ButtonStates {
  showEmail: boolean;
  showNewEmail: boolean;
  showOTP: boolean;
}
interface SubmitPayload {
  recovery_code: string;
  email: string;
  new_email: string;
}
let step:string = 'Recover';
let showCode:boolean = false;
let recovery_code:string ="";
let email:string = "";
let new_email:string = "";
let otp_error:boolean = false;
let otp_error_message:string = "";
let otp:string|undefined = undefined;
const array_item:string[] = [];
const buttonStates:ButtonStates = {
  showEmail: false,
  showNewEmail: false,
  showOTP: false,
};
let error_message:string = "";
let error_new_email:string = "";
let error_old_email:string = "";
let green_button:boolean = false;
let showResendCode:boolean = false;
let Resendvariabledelayed:any = undefined;
let user_input_error:boolean = false;
const OTPSize = computed(() => 6);
const $store = useStore();
const emit = defineEmits(['back', 'closeModal']);
const $timestampLog:any = inject('$timestampLog');
const isOledEmailError = computed(() => error_old_email.length > 0);
const isNewEmailError = computed(() => error_new_email.length > 0);
const back =  () =>{
  emit('back', true);
};
const ShowResendCodeTick = () => {
  Resendvariabledelayed.value = setTimeout(
    function () {
      showResendCode = true;
    }.bind(this),
    5000
  );
};
const ResendCode = () => {
  if (new_email !== undefined) {
    $store.dispatch('ReSendCode', { email: new_email });
    showResendCode = false;
    ShowResendCodeTick();
  }
};
const ButtonCheck = () => {
  if (Object.keys(buttonStates).length >= 2) {
    green_button = true;
  } else {
    green_button = false;
  }
};
const BeforeRecoveryStep2 =  async () => {
  if (recovery_code !== undefined && recovery_code.length >= 5) {
    green_button = false;
    let res = await $store.dispatch('CheckRecoveryCode', {
      recovery_code: parseInt(recovery_code),
    });
    if (res.status === 200) {
      step = 'RecoverStep2';
      green_button = false;
    } else {
      error_message =
        'Invalid Recovery Code, Please Check your email and try again';
    }
  } else {
    error_message =
      'Invalid Recovery Code, Please Check your email and try again';
  }
};
const OtpUpdate = (value:string[]) => {
  array_item.splice(0).push(...value) ;
  otp_error = false;
  otp_error_message = "";
  $timestampLog('OTP - Array Received---', value);
  var counter = 0;
  for (var item in value) {
    if (!Number.isInteger(value[item])) {
      counter++;
    }
  }
  if (counter === 0 && Object.keys(value).length === OTPSize.value) {
    green_button = true;
  } else {
    green_button = false;
  }
};
const OTPVerify = async () => {
  otp_error = false;
  green_button = false;
  for (var j in array_item) {
    if (!Number.isInteger(array_item[j])) {
      otp_error = true;
    }
  }
  if (otp_error === false) {
    error_message = "";
    let payload = {
      email: email,
      new_email: new_email,
      otp: array_item.join(''),
    };
    const res = await $store.dispatch('UserOTPVerification', payload);
    if (res.status === 200) {
      $timestampLog('Sign-Inned');
      emit('closeModal', {});
    } else {
      otp_error = true;
      otp_error_message = 'In valid OTP';
    }
  } else {
    otp_error = true;
    otp_error_message =
      'Ensure No Alphabets or white spaces have been entered*';
  }
};
const ValidateEmail = (email:string) => {
  if (email.length > 0) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email) || false;
  } else {
    return false;
  }
};
const SubmitQuery = async () => {
  var payload:SubmitPayload = {
    recovery_code: '',
    email: '',
    new_email: '',
  };
  error_new_email = "";
  error_old_email = "";
  error_message = "";
  green_button = false;
  if (
    new_email !== email &&
    ValidateEmail(new_email) &&
    new_email !== undefined &&
    email !== undefined &&
    new_email !== ' ' &&
    email !== ' ' &&
    ValidateEmail(email)
  ) {
    if (
      recovery_code !== undefined &&
      recovery_code !== '' &&
      recovery_code !== ' '
    ) {
      payload.recovery_code = recovery_code;
      payload.email = email;
      payload.new_email = new_email;
      let res = await $store.dispatch('UserSignIn', payload);
      $timestampLog('response from server', res);
      if (res !== undefined && res !== false && res.status === 200) {
        showCode = true;
        showResendCode = true;
      } else {
        error_old_email = 'Email Id Invalid';
        error_new_email = 'Email Id Invalid';
        error_message = 'Email Id Invalid';
        showResendCode = true;
      }
    }
  } else {
    if (ValidateEmail(email) === false) {
      error_old_email = 'Email Id Invalid';
    }
    if (ValidateEmail(new_email) === false) {
      error_new_email = 'Email Id Invalid';
    }
    error_message = 'Email Id Invalid';
  }
};
const isValidEmail = (email:string) => {
  return email !== undefined &&
      email.length >= 2 &&
      ValidateEmail(email)
};
watch(
  () => recovery_code,
  (value) => {
    if (value.length >= 5) {
      green_button = true;
    } else {
      green_button = false;
      error_message = "";
    }
  }
);
watch(
  () => new_email,
  value => {
    buttonStates.showNewEmail = isValidEmail(value);
    ButtonCheck();
  }
);
watch(
  () => email,
  value => {
    buttonStates.showEmail = isValidEmail(value);
    ButtonCheck();
  }
);
</script>

<style scoped>
@media screen and (min-width: 992px) {
  .modal__dialog {
    height: initial;
    max-width: 456px;
  }
}
.modal {
  z-index: 9;
  overflow-x: hidden;
  overflow-y: auto;
}

.modal__backdrop {
  right: 0;
  bottom: 0;
  z-index: 1;
}
.modal__dialog {
  z-index: 2;
}

.modal__close {
  width: 30px;
  height: 30px;
}

.modal__body {
  align-items: stretch;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/*Accounts-SignIn-SignUp*/
.custom-checkbox {
  display: block;
  margin-bottom: 15px;
}

.custom-checkbox input {
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
}

.custom-checkbox div {
  position: relative;
  cursor: pointer;
  margin-left: 32px;
}
.custom-checkbox label {
  padding-left: 0px;
  transform: translateX(-32px);
  cursor: pointer;
}

.custom-checkbox div:before {
  content: '';
  -webkit-appearance: none;
  background-color: transparent;
  border: 1px solid #82919c;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 11px;
  display: inline-block;
  position: absolute;
  vertical-align: middle;
  cursor: pointer;
  margin-right: -16px;
  left: -32px;
  border-radius: 4px;
}

.custom-checkbox input:checked + div:after {
  content: '';
  display: block;
  position: absolute;
  top: 4px;
  left: -23px;
  width: 6px;
  height: 14px;
  border: solid #3d9f95;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.custom-checkbox input:checked + div:before {
  content: '';
  border: 1px solid #3d9f95;
}
.border-1 {
  border-width: 1px;
}
.border-b-1 {
  border-bottom-width: 1px;
}
.form-group {
  position: relative;
  padding-top: 1.53rem;
}
.form-group label {
  position: absolute;
  left: 0;
  top: 0;
}
.form-group input:focus + label span {
  color: #3d9f95;
}
.form-group input:focus {
  border-color: #3d9f95;
}
input:focus {
  border: 1px solid #3d9f95;
}
</style>
