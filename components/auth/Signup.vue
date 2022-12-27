<template>
  <a
    @click="step = 'Signup'"
    v-if="step !== 'Signup'"
    class="mb-6 text-xs text-dark-500 text-left cursor-pointer font-lato-regular"
    ><ArrowNarrowLeft class="inline mr-2" /> Back
    to Details</a
  >
  <div v-if="step === 'Signup'">
    <div class="flex">
      <div class="form-group mb-4 mr-3 text-left w-6/12">
        <input
          type="text"
          class="font-lato-regular mt-1 block w-full rounded-md border text-dark-500 border-dark-300 py-3 px-4 focus:outline-none"
          placeholder="Peppy"
          v-model="first_name"
          :class="{
            'focus:outline-none border-state-alert': error_message,
            'border-primary': true,
          }"
        />
        <span
          v-if="hasErrorMessage && hasEmailErrorMessage"
          class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
          >{{ error_message }}</span
        >
        <label>
          <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
            >First Name <span class="text-green-500">*</span></span
          >
        </label>
      </div>
      <div class="form-group mb-4 ml-3 text-left w-6/12">
        <input
          type="text"
          class="font-lato-regular mt-1 block w-full rounded-md border border-dark-300 py-3 px-4 text-500 focus:outline-none"
          placeholder="Noah"
          v-model="last_name"
          :class="{
            'focus:outline-none border-state-alert': error_message,
            'border-primary': true,
          }"
        />
        <span
          v-if="hasErrorMessage && hasEmailErrorMessage"
          class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
          >{{ error_message }}</span
        >
        <label>
          <span class="text-dark-600 text-xs font-semibold font-lato-semibold"
            >Last Name <span class="text-green-500">*</span></span
          >
        </label>
      </div>
    </div>

    <div class="form-group block mb-7 text-left w-full">
      <label>
        <span
          class="text-dark-700 text-xs font-semibold text-left block font-lato-semibold"
          >Email address <span class="text-green-500">*</span></span
        >
      </label>
      <input
        type="text"
        class="font-lato-regular mt-1 block w-full rounded-md border border-dark-300 text-dark-500 py-3 px-4 focus:outline-none"
        placeholder="peppynoah@somemail.com"
        v-model="user_email"
        @keyup.enter="Submit"
        :class="{
          'focus:outline-none border-state-alert': error_message,
          'border-primary': true,
        }"
      />
      <span
        v-if="hasErrorMessage"
        class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
        >{{ error_message }}</span
      >
      <span
        v-else
        class="text-state-alert text-xs font-semibold text-left block font-lato-semibold"
        >{{ email_error_message }}</span
      >
    </div>

    <div class="space-y-5">
      <div class="text-left flex items-center space-x-2">
        <SingleCheckBox
          key="optionKey-1"
          label="I am 13 years old or older"
          class="text-dark-700 text-sm font-lato-regular"
          v-on:check_box="AgeCheckboxTick()"
          :id=1
          ref="agecheckbox"
        />
        <label
          v-if="error_message"
          class="text-state-alert text-sm font-lato-regular"
        >
          *</label
        >
      </div>

      <div class="text-left flex flex-col justify-center">
        <SingleCheckBox
          key="optionKey-2"
          label="I have read, understand and agree to DAOStreet"
          class="text-dark-700 text-sm font-lato-regular mt-0"
          v-on:check_box="TermsCheckboxTick()"
          :id=2
          ref="termscheckbox"
        />
        <div class="ml-8 sm:ml-0">
          <span class="text-dark-700 text-xs font-lato-regular flex space-x-1"
            ><p
              @click="Article('https://daostreet.io/blog/privacy')"
              class="text-green-500 underline cursor-pointer"
            >
              Privacy Policy
            </p>
            <p>and</p>
            <p
              @click="Article('https://daostreet.io/blog/terms')"
              class="text-green-500 underline cursor-pointer"
            >
              Terms
            </p></span
          >
          <label
            v-if="error_message"
            class="text-state-alert text-sm font-lato-regular"
          >
            *</label
          >
        </div>
      </div>
    </div>
    <!-- Checkboxes -->

    <button
      @click="Submit"
      class="mt-8 font-lato-semibold block w-full px-6 py-4 border-b-2 border-green-800 text-base font-semibold rounded-md text-white text-center"
      :class="{
        ' bg-dark-300 cursor-default ': !green_button,
        ' border-green-800 bg-green-500 hover:bg-green-800 transition duration-150 ease-in-out cursor-pointer ': green_button,
      }"
      :disabled="!green_button"
    >
      Continue
    </button>

  </div>
  <div v-if="step === 'Step2'">
    <h4 class="text-left text-dark-500 font-bold text-xl mb-5 font-nunito-bold">
      One last step!
    </h4>
    <div>
      <p class="text-sm text-dark-500 text-left mb-8 font-lato-regular">
        We sent a 6 digit code to your email address. Please enter the code in
        order to verify your email.
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
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, inject, Ref } from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import VerificationCode from './Verification-code.vue';
import SingleCheckBox from '@/components/ui/form_elements/SingleCheckBox.vue';
import ArrowNarrowLeft from "@/components/icons/ArrowNarrowLeft.vue";

interface ButtonStates {
  showUserEmail: boolean;
  showFirstName: boolean;
  showLastName: boolean;
  showOTP: boolean;
  checkboxSelected: boolean;
  checkbox1Selected: boolean;
}
const $store = useStore();
// const router = useRouter();
const hasErrorMessage = computed(() => error_message.length > 0);
const hasEmailErrorMessage = computed(() => email_error_message.length > 0);
let step: string = 'Signup';
let showCode: boolean = true;
let first_name:string = "";
let last_name:string = "";
let otp_error: boolean = false;
let otp:string = "";
let otp_error_message:string = "";
let user_email:string = "";
let array_item: Array<string> = [];
let error_message:string = "";
let email_error_message:string = "";
let buttonStates: ButtonStates = reactive({
  showUserEmail: false,
  showFirstName: false,
  showLastName: false,
  showOTP: false,
  checkboxSelected: false,
  checkbox1Selected: false,
});
let green_button: boolean = false;
let checkbox: boolean = false;
let checkbox1: boolean = false;
let showResendCode: boolean = false;
let Resendvariabledelayed: any = undefined;
let user_input_error:boolean = false;
const emit = defineEmits(['closeModal']);
const $timestampLog:any = inject('$timestampLog');
const OTPSize = computed(() => 6);
const back = () => {
  step = 'Login';
};
const ButtonCheck = () =>{
  if (Object.keys(buttonStates).length >= 5) {
    green_button = true;
  } else {
    green_button = false;
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
const ResendCode = () => {
  if (user_email !== '') {
    $store.dispatch('ReSendCode', { email: user_email });
    showResendCode = false;
    ShowResendCodeTick();
  }
};
const agecheckbox:Ref<HTMLInputElement|null> = ref(null);
const termscheckbox:Ref<HTMLInputElement|null> = ref(null);
const AgeCheckboxTick = () => {
  checkbox = !checkbox;
  if (agecheckbox.value !== null)
    agecheckbox.value.checked = checkbox;
  $timestampLog("Age Checkbox");
};
const TermsCheckboxTick = () => {
  checkbox1 = !checkbox1;
  if (termscheckbox.value !== null)
    termscheckbox.value.checked = checkbox;
  $timestampLog("Terms Checkbox");
};
const Article = (link:string) => {
  window.location.href = link;
  emit('closeModal', { link: link });
};
const ValidateEmail = (email:string) => {
  if (email.length > 0) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email) || false;
  } else {
    return false;
  }
};
const Submit = async () => {
  $timestampLog(user_email);
  error_message = "";
  green_button = false;
  if (
    first_name !== undefined &&
    last_name !== undefined &&
    user_email !== undefined &&
    ValidateEmail(user_email) &&
    checkbox === true &&
    checkbox1 === true
  ) {
    const payload = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: user_email.trim(),
    };
    const res = await $store.dispatch('UserSignIn', payload);
    $timestampLog(
      'Submit for the SignIn',
      res,
      user_input_error,
      res.status
    );
    if (res.status === 200) {
      if (user_input_error === false) {
        step = 'Step2';
        $timestampLog('Step2---', step);
        showResendCode = true;
      } else {
        error_message =
          'If You are a New user, Please Register, By Tapping on "Register Tab".';
      }
    } else if (res.status === 422) {
      error_message =
        'This email has been registered. Try signing in, or use a different email address to register';
      email_error_message =
        'This email has been registered. Try signing in, or use a different email address to register.';
    }
  } else {
    error_message = 'Fill Field';
  }
};
const OtpUpdate = (value:string[]) => {
  array_item = value;
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
    $timestampLog(Number.isInteger(array_item[j]));
    if (!Number.isInteger(array_item[j])) {
      otp_error = true;
      $timestampLog('array_item[j] Caught ---', array_item[j]);
      $timestampLog(array_item[j] === '');
      $timestampLog(array_item[j] === ' ');
      $timestampLog(array_item[j] === undefined);
    }
  }
  if (otp_error === false) {
    error_message = "";
    let payload = {
      email: user_email.trim(),
      otp: array_item.join(''),
    };
    const res = await $store.dispatch('UserOTPVerification', payload);
    $timestampLog('SignUp - Modal--', res);
    if (res.status === 200) {
      $timestampLog('Signed Up successfully');
      // router.push({name: 'My DAOs', path:'/daos/my-daos'})
      emit('closeModal', {});
    } else {
      otp_error = true;
      otp_error_message = 'Incorrect code entered, please try again.';
      showResendCode = true;
    }
  } else {
    otp_error = true;
    user_input_error = true;
    otp_error_message =
      'Ensure No Alphabets or white spaces have been entered.';
  }
};
watch(() => user_email, (value) => {
  if (value.length >= 5 && ValidateEmail(value)) {
    buttonStates.showUserEmail = true;
  } else {
     buttonStates.showUserEmail = false;
  }
  error_message = "";
  email_error_message = "";
  ButtonCheck();
});
watch(() => first_name, (value) => {
  // Trim the Spaces off
  if (value.trim().length >= 1) {
    buttonStates.showFirstName = true;
  } else {
    buttonStates.showFirstName = false;
  }
  error_message = "";
  email_error_message = "";
  ButtonCheck();
});
watch(() => last_name, (value) => {
  if (value.trim().length >= 1) {
    buttonStates.showLastName = true;
  } else {
    buttonStates.showLastName = false;
  }
  error_message = "";
  email_error_message = "";
  ButtonCheck();
});
watch(() => checkbox, (value) => {
  if (value === true) {
    buttonStates.checkboxSelected = true;
  } else {
    buttonStates.checkboxSelected = false;
  }
  error_message = "";
  email_error_message = "";
  ButtonCheck();
});
watch(() => checkbox1, (value) => {
  if (value === true) {
    buttonStates.checkbox1Selected = true;
  } else {
    buttonStates.checkbox1Selected = false;
  }
  error_message = "";
  email_error_message = "";
  ButtonCheck();
});
</script>

<style scoped>
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
  border: solid 2px;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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
  border: solid 5px #3d9f95;
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
