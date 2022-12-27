<template>
  <div v-if="step === 'Login'">
    <div class="form-group block mb-6 text-left">
      <input
        type="text"
        v-model="user_email"
        @keyup.enter="Submit"
        class="font-lato-regular mt-1 block w-full rounded-md border border-dark-300 py-3 px-4 focus:outline-none text-dark-500"
        placeholder="abc@xyz.com"
        :class="{ 'border-state-alert': isError, 'border-primary': true }"
      />
      <span
        v-if="isError"
        class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
        >{{ error_message }}</span
      >

      <label>
        <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
          >Email address</span
        >
      </label>
    </div>
    <label class="block mb-10 text-right">
      <span
        class="font-lato-regular text-green-500 text-sm underline cursor-pointer"
        @click="step = 'Recover'"
        >Recover account</span
      >
    </label>
    <button
      @click="Submit"
      class="font-lato-semibold w-full px-6 py-4 border-b-2 border-green-800 text-base font-semibold rounded-md text-white text-center"
      :class="{
        ' bg-dark-300 cursor-default ': !green_button,
        ' bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out cursor-pointer ': green_button,
      }"
      :disabled="!green_button"
    >
      Continue
    </button>
  </div>

  <div v-if="step === 'LoginStep2'">
    <a
      @click="goBackToStep1"
      class="mb-6 block text-left text-xs text-dark-500 cursor-pointer font-lato-regular"
    >
    <ArrowNarrowLeft class="inline mr-2" />
      Back to email address</a
    >
    <h4 class="text-left text-dark-500 font-bold text-xl mb-2 font-nunito-bold">
      Enter the Sign In code
    </h4>
    <div>
      <p class="text-sm text-dark-500 mb-10 text-left font-lato-regular">
        We sent a 6 digit code to your email address. Please enter the code in
        order sign in.
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
        ' border-green-800 bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out cursor-pointer ': green_button,
        }"
        @click="OTPVerify"
        :disabled="!green_button"
      >
        Sign In
      </button>
    </div>
  </div>

  <Recover
    v-if="step === 'Recover'"
    @back="back"
    v-on:closeModal="closeModalEmit"
  />
</template>

<script setup lang="ts">
import { watch, inject, computed, ref } from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import Recover from './Recover.vue';
import VerificationCode from './Verification-code.vue';
import ArrowNarrowLeft from "@/components/icons/ArrowNarrowLeft.vue";
const $store = useStore();
// const router = useRouter();
const emit = defineEmits(['closeModal']);
const $timestampLog:any = inject('$timestampLog');
let step:string = 'Login';
let showCode = false;
let otp_error:any = undefined;
let otp = undefined;
let otp_error_message:string|undefined = undefined;
let user_email:string = "";
let array_item:string[] = [];
let showResendCode = false;
let green_button = false;
let Resendvariabledelayed = undefined;
const OTPSize = 6;
let error_message:string = "";
let user_input_error = false;
const isError = computed(() => error_message.length === 0);
const OTP_Field = ref(null);
const back = () => {
  step = 'Login';
};
const closeModalEmit = () => {
  emit('closeModal');
  $timestampLog('FRom Iframe check --', localStorage.refresh_token);
};
const ResendCode = () => {
  if (user_email !== undefined) {
    $store.dispatch('ReSendCode', { email: user_email });
    showResendCode = false;
    ShowResendCodeTick();
  }
};
const ShowResendCodeTick = () => {
  Resendvariabledelayed = setTimeout(
    function () {
      showResendCode = true;
    }.bind(this),
    5000
  );
};
const ValidateEmail = (email:string) => {
  if (email.length > 0) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email) || false;
  } else {
    return false;
  }
};
const goBackToStep1 = () => {
  step = 'Login';
  showCode = false;
  green_button = ValidateEmail(user_email);
};
const Submit = async () => {
  if (user_email && ValidateEmail(user_email)) {
    const payload = { email: user_email };
    green_button = false;

    const res = await $store.dispatch('UserSignIn', payload);
    $timestampLog(
      'Submit for the SignIn',
      res,
      user_input_error,
      res.status
    );

    if (res.status === 200) {
      if (user_input_error === false) {
        green_button = false;
        step = 'LoginStep2';
        showResendCode = true;

        $timestampLog('LoginStep2---', step);
      } else {
        error_message =
          'Looks like you’ve not signed up yet. Tap Sign Up to join DAOStreet';
      }
    } else if (res.status === 422) {
      error_message =
        'Looks like you’ve not signed up yet. Tap Sign Up to join DAOStreet';
    }
  } else {
    error_message = 'Enter a Valid Email-Id';
  }
};
const OtpUpdate = (value:string[]) => {
  array_item = value;
  otp_error = false;
  otp_error_message = undefined;
  $timestampLog('OTP - Array Received---', value);

  var counter = 0;
  for (var item in value) {
    if (!Number.isInteger(value[item])) {
      counter++;
    }
  }
  if (counter === 0 && Object.keys(value).length === OTPSize) {
    green_button = true;
  } else {
    green_button = false;
  }
};
const OTPVerify = async () => {
  otp_error = false;
  $timestampLog('OTP_Field --- ', OTP_Field.value);
  var counter = 0;
  for (var j in array_item) {
    if (!Number.isInteger(array_item[j])) {
      otp_error = true;
      counter++;
      $timestampLog('Caught array_item[j] -- ', array_item[j]);
      $timestampLog('Empty', array_item[j] === '');
      $timestampLog('Space', array_item[j] === ' ');
      $timestampLog('Undefined', array_item[j] === undefined);
    }
  }
  $timestampLog('Counter -- ', counter, array_item);
  if (otp_error === false && counter === 0) {
    error_message = "";
    let payload = {
      email: user_email,
      otp: parseInt(array_item.join('')),
    };
    green_button = false;
    const res = await $store.dispatch('UserOTPVerification', payload);
    $timestampLog('Response from Server Login COmponent --', res);
    if (res.status === 200) {
      $timestampLog('Signed In successfully');
      emit('closeModal', {});
      // router.push({name: 'My DAOs', path:'/daos/my-daos'})
    } else {
      $timestampLog('Erro with OTP-----');
      otp_error = true;
      otp_error_message = 'Incorrect code entered, please try again.';
      green_button = false;
      showResendCode = true;
    }
  } else {
    otp_error = true;
    otp_error_message =
      'Ensure No Alphabets or white spaces have been entered.';
    green_button = false;
  }
};
watch(
  () => user_email,
  (value) => {
    if (value?.length >= 5 && ValidateEmail(value)) {
      green_button = true;
    } else {
      green_button = false;
    }
    error_message = "";
  }
);
watch(
  () => otp_error,
  (value) => {
    $timestampLog('Current OTP_error -- ', value);
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
