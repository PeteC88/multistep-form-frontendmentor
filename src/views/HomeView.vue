<template>
  <form @submit.prevent="">
    <main class="container">
      <NavSteps :currentStep="currentStep" />
      <!--   <Transition > -->
      <KeepAlive>
        <Step1 v-if="currentStep === 1" :nextStepClicked="nextStepClicked" />
      </KeepAlive>
      <KeepAlive>
        <Step2
          v-if="currentStep === 2"
          @choosePlanAction="choosePlanAction"
          @choseMonthlyPlan="chooseMonthlyPlan"
          @choseYarlyPlan="chooseYearlyPlan"
        />
      </KeepAlive>
      <KeepAlive>
        <Step3 v-if="currentStep === 3" @select-plan="selectPlanAddOn" />
      </KeepAlive>
      <!-- This component no need to be keeped alive so it can recalculate each time if the plan is yearly or not -->
      <Step4 v-if="currentStep === 4" @changePlanAction="changePlan" />
      <TheConfirmation v-if="currentStep === 5" />
      <!--  </Transition> -->

      <Footer
        @nextStepAction="nextStepAction()"
        @prevStepAction="prevStepAction()"
        :currentStep="currentStep"
      />
    </main>
  </form>
</template>

<script setup lang="ts">
import { AddOnsInfo } from "../interfaces/addOnsInfo";
import { userInfo } from "../stores/userInfoStore";
import NavSteps from "../components/NavSteps.vue";
import Footer from "../components/Footer.vue";
import Step1 from "../components/formSteps/Step1.vue";
import Step2 from "../components/formSteps/Step2.vue";
import Step3 from "../components/formSteps/Step3.vue";
import Step4 from "../components/formSteps/Step4.vue";
import TheConfirmation from "../components/formSteps/TheConfirmation.vue";

import { ref } from "vue";

const formStore = userInfo();
const userPlanChosen = formStore.userPlanChosen;

let currentStep = ref(1);
let nextStepClicked = ref(false);

//const changeNextClickEvent = () => nextStepClicked.value = false;

const prevStepAction = () => {
  if (currentStep.value > 1) {
    nextStepClicked.value = false;
    currentStep.value--;
  }
};

const nextStepAction = () => {
  nextStepClicked.value = true;
  if (
    currentStep.value < 5 &&
    userPlanChosen.name &&
    userPlanChosen.email &&
    userPlanChosen.phoneNumber
  ) {
    //check if the email has the right pattern
    let emailRegexValidator =
      /^([a-zA-Z][\w+-]+(?:\.\w+)?)@([a-zA-Z][\w-]+(?:\.[a-zA-Z]{2,10})+)$/;

    if (
      emailRegexValidator.test(userPlanChosen.email) &&
      userPlanChosen.name.length >= 3
    ) {
      if (
        userPlanChosen.phoneNumber.length >= 10 &&
        userPlanChosen.phoneNumber.length <= 20
      ) {
        currentStep.value++;
      }
    } else {
      return;
    }
  } else {
    console.error("please check and fill the input in the step 1");
  }
};
/* Action from step 2 to choise the plan */

const choosePlanAction = (id: number) => {
  formStore.plans.forEach((item) => {
    if (item.id === id) {
      item.isSelected = true;
      formStore.userPlanChosen.plan.name = item.name;
      formStore.userPlanChosen.plan.priceParMonth = item.priceParMonth;
      formStore.userPlanChosen.plan.priceParYear =
        item.priceParMonth * formStore.nbOfPayingMonthsPerYear;
    } else {
      item.isSelected = false;
    }
  });
};

/* Action from step two to cohise beetween monthly or yearly plan */
const chooseMonthlyPlan = () => {
  userPlanChosen.plan.isMonthly = true;
  userPlanChosen.plan.isYearly = false;
};

const chooseYearlyPlan = () => {
  userPlanChosen.plan.isMonthly = false;
  userPlanChosen.plan.isYearly = true;
};

/* Action to choose an addOn to the plan */
const selectPlanAddOn = (payload: AddOnsInfo) => {
  payload.isSelected = !payload.isSelected;

  if (payload.isSelected) {
    userPlanChosen.addOns.push(payload);
  } else {
    if (userPlanChosen.addOns.includes(payload)) {
      /* Delete the plan that has been unselected */
      userPlanChosen.addOns.splice(userPlanChosen.addOns.indexOf(payload), 1);
    }
  }
};

/* Action that reset the current step to 2 in order to let the user change the plan chosen before */
const changePlan = () => {
  currentStep.value = 2;
};
</script>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}
</style>
