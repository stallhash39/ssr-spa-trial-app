<template>
  <Header @openModal="OpenSignInSignUpModal" />
  <div class="bg-f5fbff lg:pt-72px lg:pb-72px pt-48px pb-56px text-center">
    <div class="px-lg-0 px-4">
      <p class="font-NunitoWebBold lg:text-40px text-40px leading-1.2">
        Liberate your creativity with <span class="text-4072b9">Idea NFTs</span>
      </p>
      <p class="mt-4 font-LatoWebRegular lg:text-20px text-16px leading-1.6 opacity-90">
        Ideas are your most valuable currency in the 21st century. We help you make your ideas
        <br class="lg:block hidden" />
        matter by creating, owning, and monetizing them quickly and easily on the blockchain.
      </p>
      <div class="mt-10 flex justify-center lg:gap-6 gap-4 items-center">
        <CustomButton label="Create Idea NFT" />
        <CustomButton label="See How It Works" type="light" />
      </div>
    </div>
    <div class="lg:mt-72px mt-56px relative overflow-hidden">
      <div
        class="flex lg:gap-10 gap-4 flex-nowrap whitespace-nowrap animate-carousal-10 md:animate-carousal-20 lg:animate-carousal-30 relative"
      >
        <CaraousalCard v-for="(n, index) in 5" :key="index"/>
      </div>
    </div>
  </div>
  <div class="lg:py-20 py-12 lg:px-0 px-4 text-center">
    <p class="lg:text-32px text-24px font-NunitoWebBold leading-1.19 text-0d172b">How do Idea NFTs benefit you?</p>
    <div class="lg:mt-20 mt-10 flex lg:flex-row flex-col lg:gap-75px gap-48px justify-center">
      <div>
        <div class="flex rounded-lg border border-d9e8ee justify-between">
          <div class="bg-f8fbfc lg:px-29px px-6 py-37px rounded-l-lg">
            <Creativity />
          </div>
          <div class="lg:pl-29px pl-4 lg:pr-6 pr-4">
            <p class="mt-29px text-right font-NunitoWebBold text-14px leading-1.29 text-4072b9">
              Oh no, my creativity
              <br />
              is drying up!
            </p>
            <ConfusedPeppy class="mt-4" />
          </div>
        </div>
        <div class="lg:mt-8 mt-6 text-left">
          <p class="font-NunitoWebBold text-20px leading-1.2 text-233040">Demonstrate your creativity</p>
          <p class="lg:mt-4 mt-2 font-LatoWebRegular text-16px text-46515a leading-1.5">
            Creativity is a vital skill of the 21st century.
            <br />
            Exercise your idea muscle, create ideas and
            <br />
            demonstrate your creativity with Idea NFTs.
          </p>
        </div>
      </div>
      <div>
        <div class="flex rounded-lg border border-d9e8ee justify-between">
          <div class="bg-f8fbfc lg:px-5 px-4 rounded-l-lg">
            <Bull class="mt-15px" />
            <p class="mt-2.5 mb-3.5 font-NunitoWebBold text-14px text-left leading-1.29 text-46515a">
              I know it was <span class="text-82919c">your idea,</span>
              <br />
              but it was <span class="text-82919c">my idea</span>
              <br />
              to use <span class="text-82919c">your idea.</span>
            </p>
          </div>
          <div class="lg:px-22px px-4">
            <p class="mt-43px text-center font-NunitoWebBold text-14px leading-0.89 text-4072b9">
              Not fair!
            </p>
            <Peppy class="mt-3 w-104px h-104px" />
          </div>
        </div>
        <div class="lg:mt-8 mt-6 text-left">
          <p class="font-NunitoWebBold text-20px leading-1.2 text-233040">Own your ideas</p>
          <p class="lg:mt-4 mt-2 font-LatoWebRegular text-16px text-46515a leading-1.5">
            For most of us, patents are overpriced. Idea NFTs
            <br class="lg:block hidden" />
            allow you to own your idea without the expensive
            <br class="lg:block hidden" />
            and slow patent process.
          </p>
        </div>
      </div>
      <div>
        <div class="flex rounded-lg border border-d9e8ee relative justify-between">
          <div class="bg-f8fbfc lg:pl-6 pl-4 lg:pr-30px pr-4 rounded-l-lg">
            <p class="mt-8 font-NunitoWebBold text-14px leading-1.29 text-left text-46515a">
              <span class="text-82919c">Employee Award,</span>
              <br />
              what rubbish
            </p>
            <Award class="mt-20px mb-26px" />
          </div>
          <div class="lg:pr-6 pr-4 lg:pl-26px pl-4">
            <p class="mt-8 pl-26px text-right font-NunitoWebBold text-14px leading-1.29 text-4072b9">
              Idea NFTs,
              <br />
              that’s smashing!
            </p>
            <IdeaNft class="mt-4 ml-43px" />
          </div>
          <PeppyLove class="absolute bottom-0 left-114px" />
        </div>
        <div class="lg:mt-8 mt-6 text-left">
          <p class="font-NunitoWebBold text-20px leading-1.2 text-233040">Monetize your ideas</p>
          <p class="lg:mt-4 mt-2 font-LatoWebRegular text-16px text-46515a leading-1.5">
            Winning an idea contest for a pat on the back
            <br class="lg:block hidden" />
            isn’t the same as earning fair value for your ideas.
            <br class="lg:block hidden" />
            You can get serious value with Idea NFTs.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-f5fbff lg:py-20 py-12 px-4 flex lg:flex-row flex-col justify-center gap-20">
    <div>
      <p class=" font-NunitoWebBold lg:text-32px text-24px text-0d172b leading-1.19">
        Take your ideas to a whole new
        <br class="lg:block hidden" />
        level and turn them into DAOs
      </p>
      <div class="lg:hidden block my-8">
        <img src="/images/dao_explorer.png" class="mx-auto" />
      </div>
      <p class="lg:mt-10 font-LatoWebRegular lg:text-20px text-16px text-33404d leading-1.6">
        Go from zero to a DAO in minutes with our free market
        <br class="lg:block hidden" />
        that connects you & your DAO with the rest of the world.
      </p>
      <div class="mt-4 flex items-center">
        <p class="font-LatoWebRegular lg:text-20px text-16px text-33404d leading-1.6">
          No technical skills required, coming soon!
        </p>
        <Rocket class="ml-2" />
      </div>

      <CustomButton class="lg:mt-10 mt-7" label="Learn More" type="light" />
    </div>
    <img src="/images/dao_explorer.png" class="lg:block hidden" />
  </div>
  <div class="lg:pt-20 lg:pb-20 pt-12 pb-16 px-4 flex lg:flex-row flex-col justify-center">
    <div class="shadow-nft-start-card lg:py-33px py-4 lg:px-10 px-4 flex lg:flex-row flex-col items-center justify-between lg:rounded-2xl rounded-lg lg:gap-120px">
      <div class="flex items-center lg:flex-row flex-col">
        <Remarkable />
        <div class="lg:ml-8 lg:text-left text-center lg:mt-0 mt-6 lg:mb-0 mb-8">
          <p class="font-NunitoWebBold lg:text-24px text-20px leading-1.2">
            Liberate your creativity with Idea NFTs
          </p>
          <p class="mt-4 font-LatoWebRegular lg:text-16px text-14px leading-1.5 text-46515a">
            Create, own and monetize your ideas with Idea NFTs -
            <span class=" text-3d9f95 font-semibold underline">see how it works.</span>
          </p>
        </div>
      </div>
      <CustomButton label="Get Started" type="light" class="lg:w-auto w-full lg:mb-0 mb-6" />
    </div>
  </div>
  <Footer @openModal="OpenSignInSignUpModal" />
  <LoginSignup id="headersignup" :modal="signInModalPopUp" @closeModal="CloseSignInSignUpModal" />
</template>



<style>
@keyframes slideshow {
  0%    { left: 100%; }
  100%  { left: -120%; }
}
</style>

<script setup lang="ts">
  import { defineAsyncComponent, ref } from "vue"; 
  // Components
  import Header from "@/components/layouts/Header.vue"
  import Footer from "@/components/layouts/Footer.vue"
  import CustomButton from "@/components/ui/CustomButton.vue"
  import CaraousalCard from "@/components/ui/CaraousalCard.vue"

  // Icons
  import Creativity from "@/components/icons/Creativity.vue"
  import ConfusedPeppy from "@/components/icons/ConfusedPeppy.vue"
  import Bull from "@/components/icons/Bull.vue"
  import Peppy from "@/components/icons/Peppy.vue"
  import Award from "@/components/icons/Award.vue"
  import Remarkable from "@/components/icons/Remarkable.vue"
  import IdeaNft from "@/components/icons/IdeaNft.vue"
  import PeppyLove from "@/components/icons/PeppyLove.vue"
  import Rocket from "@/components/icons/Rocket.vue"

  const LoginSignup = defineAsyncComponent(() =>
    import('@/components/auth/LoginSignup.vue')
  );
  const signInModalPopUp = ref(false);

  const OpenSignInSignUpModal = () => {
    signInModalPopUp.value = true;
  };

  const CloseSignInSignUpModal = () => {
    signInModalPopUp.value = false;
  };

</script>
