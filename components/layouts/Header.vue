<script setup lang="ts">
  import { reactive, inject, defineEmits } from "vue";
  // Components
  import NavItems from "@/components/layouts/NavItems.vue"
  import CustomButton from "@/components/ui/CustomButton.vue"
  // Icons
  import Logo from "@/components/icons/Logo.vue"
  import BurgerMenu from "@/components/icons/BurgerMenu.vue"
  import Close from "@/components/icons/Close.vue"
  import UserCircle from "@/components/icons/UserCircle.vue"
  const $timestampLog:any = inject('$timestampLog');
  const data = reactive({
    isMenuOpen: false,
  });
  const emit = defineEmits(['openModal']);
  const OpenSignInSignUpModal = () => {
    emit('openModal');
    $timestampLog("Open signInModal from Header");
  };
  const openMenu = () => {
    data.isMenuOpen = true;
  };
  const closeMenu = () => {
    data.isMenuOpen = false;
  };
</script>
<template>
  <header class="block sticky top-0 z-10 bg-white shadow-nft-start-card">
     <nav class="flex flex-wrap items-center justify-between w-full lg:justify-start lg:flex-nowrap lg:py-6 lg:px-120px p-4">
       <div>
          <a href="#">
            <Logo />
          </a>
        </div>
        <button class="lg:hidden block" @click="openMenu">
          <BurgerMenu class="h-6 w-6" />
        </button>
        <div class="w-full hidden ml-8 items-center lg:flex">
          <NavItems />
          <ul class="items-center lg:ml-auto lg:flex lg:justify-between">
            <li class="py-3 lg:py-0">
              <CustomButton label="Sign Up/Sign In" size="small" @click.stop="OpenSignInSignUpModal" />
            </li>
          </ul>
        </div>
    </nav>
    <div class="block fixed inset-0 bg-46515a bg-opacity-80 transition-all duration-300 z-20"
      :class="[data.isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0']"
    >
      <div class="absolute h-full overflow-y-auto p-5 w-64 bg-white transition-all duration-300"
        :class="[data.isMenuOpen ? 'right-0' : '-right-full']"
      >
        <div class="flex justify-end">
          <button @click="closeMenu">
            <Close />
          </button>
        </div>
        <div class="mt-4 mb-8 space-x-2 flex items-center">
          <UserCircle />
          <div>
            <p class="font-LatoWebRegular text-46515a leading-1.5">Hey there!</p>
            <a class=" font-LatoWebSemibold text-3d9f95 leading-1.5" @click.stop="OpenSignInSignUpModal">Sign Up/Sign In</a>
          </div>
        </div>
        <nav class="py-8 border-t border-d9e8ee">
          <NavItems layout="vertical" />
        </nav>
      </div>
    </div>
  </header>
</template>
