<script setup lang="ts">
  import { defineEmits, inject } from "vue";
  import Logo from "@/components/icons/Logo.vue"
  import InformationCircle from "@/components/icons/InformationCircle.vue"
  import Chat from "@/components/icons/Chat.vue"
  import Location from "@/components/icons/Location.vue"
  const emit = defineEmits(['openModal']);
  const $timestampLog:any = inject('$timestampLog');
  const OpenSignInSignUpModal = () => {
    emit('openModal');
    $timestampLog("Open signInModal from Footer");
  };
</script>
<template>
  <div class="lg:pt-72px pt-12 lg:px-0 px-4 bg-233040">
    <div class="flex lg:flex-row flex-col justify-evenly">
      <div>
        <Logo />
        <p class="mt-6 font-LatoWebRegular text-14px leading-1.5 text-f8fbfc">
          Our purpose is to create a community
          <br />
          committed to building a world of three
          <br />
          zeros - zero poverty, zero unemployment
          <br />
          and zero net carbon emissions.
        </p>
      </div>
      <div class="lg:mt-0 mt-10">
        <p class="font-LatoWebSemibold text-20px leading-1.6 text-white">
          Quick Links
        </p>
        <div class="mt-6 font-LatoWebRegular text-14px leading-1.5 text-f8fbfc">
          <p class="cursor-pointer" @click.stop="OpenSignInSignUpModal">Sign Up/Sign In</p>
          <a class="mt-3 block" href="/nft">Idea NFT</a>
          <a class="mt-3 block" href="/market">DAO Market</a>
          <p class="mt-3">DAO Magazine</p>
          <p class="mt-3">FAQs</p>
        </div>
      </div>
      <div class="lg:mt-0 mt-10">
        <p class="font-LatoWebSemibold text-20px leading-1.6 text-white">
          Company
        </p>
        <div class="mt-6 font-LatoWebRegular text-14px leading-1.5 text-f8fbfc">
          <div class="flex items-center gap-2">
            <InformationCircle />
            <a href="https://daostreet.io/blog/about/">About</a>
          </div>
          <div class="flex mt-6 items-center gap-2">
            <Chat />
            <a href="mailto:team@daostreet.io">Contact Us</a>
          </div>
          <div class="flex mt-6 items-center gap-2">
            <Location />
            <a href="https://discoverwinters.com/">Winters, CA, 95694</a>
          </div>
        </div>
      </div>
      <div class="lg:mt-0 mt-10">
        <p class="font-LatoWebSemibold text-20px leading-1.6 text-white">
          Legal
        </p>
        <div class="mt-6 font-LatoWebRegular text-14px leading-1.5 text-f8fbfc">
          <p>Privacy Policy</p>
          <p class="mt-3">Terms</p>
        </div>
      </div>
    </div>
    <p class="lg:mt-83px mt-64px lg:pb-26px pb-72px font-LatoWebRegular text-12px leading-1.5 text-f8fbfc text-center">
      © 2022 DAOStreet LLC. All rights reserved.
    </p>
  </div>
</template>
