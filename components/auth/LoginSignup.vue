<template>
  <transition name="fade z-70" v-if="show">
    <div
      class="modal fixed z-70 top-0 right-0 bottom-0 left-0 overflow-x-hidden overflow-y-auto w-"
    >
      <div
        class="modal__backdrop fixed w-full h-full z-1 opacity-60 bg-dark-500 top-0 left-0"
      />
      <div
        class="modal__dialog m-auto lg:mt-16 relative bg-white flex flex-col w-full h-full"
      >
        <div class="modal__header flex items-start justify-between p-4 lg:p-10">
          <Logo alt="logo" />
          <button type="button" class="modal__close" @click="closeModalClick">
            <CloseBox />
          </button>
        </div>
        <LoginSignupNabvar @changeTab="changeTab" :tabby="PreDefinedTab" />
        <div class="modal__body flex flex-col overflow-auto p-4 lg:p-10 z-70">
          <Signin v-if="tab === 'signin'" @closeModal="emitCloseModalEvent" />
          <Signup v-if="tab === 'signup'" @closeModal="emitCloseModalEvent" />
        </div>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { inject, watch, computed, onMounted, ref} from 'vue';
// import { useRouter } from 'vue-router';
import Signin from './Login.vue';
import Signup from './Signup.vue';
import Logo from "@/components/icons/Logo.vue"
import CloseBox from "@/components/icons/CloseBox.vue"
import LoginSignupNabvar from './LoginSignupNabvar.vue';
export interface Props {
  default_tab?: string,
  modal?: boolean,
  open?: boolean,
};
const props = withDefaults(defineProps<Props>(), {
  default_tab: undefined,
  modal: false
});
const emit = defineEmits(['closeModal']);
const $timestampLog:any = inject('$timestampLog');
// const router = useRouter();
// const currentRouteName = computed(() => router.currentRoute.value.name);
let show = ref(false);
let tab:string = 'signin';
const green_button:boolean = false;
let redirect_route_path_name:string|undefined = undefined;
let success:boolean|undefined = undefined;
let link:string|undefined = undefined;
let PreDefinedTab:string|undefined = undefined;
const body:HTMLBodyElement|null = (computed(() => {
  if (typeof window === 'undefined') return null;
  return document.querySelector('body');
})).value;
onMounted(() => {
  $timestampLog('Window-- ', window.default_sign_in_tab);
  if (
    window.default_sign_in_tab !== undefined ||
    localStorage.default_sign_in_tab !== undefined
  ) {
    tab = localStorage.default_sign_in_tab;
    PreDefinedTab = localStorage.default_sign_in_tab;
    localStorage.removeItem('default_sign_in_tab');
  }
});
const closeModalClick = () => {
  show.value = false;
  emit('closeModal');
  $timestampLog('Read these values', redirect_route_path_name, success);
  if (redirect_route_path_name !== undefined && success === true) {
    $timestampLog('Caught ---', redirect_route_path_name);
    // $timestampLog(router.resolve({ name: redirect_route_path_name }).href);
    // window.location.href = router.resolve({ name: redirect_route_path_name }).href;
  } else {
    if (link === undefined) {
      body?.classList.remove('overflow-hidden');
      window.parent.postMessage({}, '*');
    } else {
      body?.classList.remove('overflow-hidden');
      window.parent.postMessage({ link: link }, '*');
    }
  }
};
const emitCloseModalEvent = (value:any) => {
  success = true;
  if (value !== undefined) {
    link = value?.link;
  }
  closeModalClick();
};
const openModalClick = () => {
  show.value = true;
  body?.classList.add('overflow-hidden');
};
const changeTab = (val:string) => {
  tab = val;
  PreDefinedTab = val;
};
watch(
  () => props.modal,
  value => {
    if (value === true) {
      openModalClick();
    } else {
      closeModalClick();
    }
    $timestampLog('props.modal -- ', value);
  }
);
watch(
  () => redirect_route_path_name,
  value => {
    $timestampLog('redirect_route_path_name -- ', value);
  }
);
watch(
  () => props.default_tab,
  (value) => {
    if (value !== undefined) {
      tab = value;
    }
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
  .z-70 {
    z-index: 70;
  }
  input:focus {
    border: 1px solid #3d9f95;
  }
</style>
