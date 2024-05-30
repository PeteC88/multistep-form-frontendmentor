<template>
  <section class="card-wrapper">
    <card>
      <section class="form-container" aria-label="step2 form">
        <h2>Select your plan</h2>
        <p class="form-cotainer__description">
          You have theption of monthly or yearly billing
        </p>
        <section class="form-inputs step2" aria-label="step2 plan choise">
          <ul role="radiogroup" aria-label="plan choise">
            <!-- li are set as radio buttons  -->
            <li
              v-for="plan in formStore.plans"
              role="radio"
              :aria-checked="plan.isSelected"
              class="form__plan form__plan--radio"
              aria-label="Arcade plan"
              tabindex="0"
              @click="emit('choosePlanAction', plan.id)"
              @keydown="emit('choosePlanAction', plan.id)"
            >
              <picture>
                <img
                  :src="`/${plan.icon}`"
                  :alt="`icon ${plan.name.toLocaleLowerCase()} plan`"
                />
              </picture>
              <div>
                <h4>
                  {{ plan.name }}
                </h4>
                <p>
                  {{
                    userPlanChosen.plan.isMonthly
                      ? `$${plan.priceParMonth}/mo`
                      : `$${
                          plan.priceParMonth * formStore.nbOfPayingMonthsPerYear
                        }/yr`
                  }}
                </p>
                <p
                  class="form__plan--free-months"
                  v-if="!userPlanChosen.plan.isMonthly"
                >
                  2 months free
                </p>
              </div>
            </li>
            <li
              class="form__plan--monthly-yearly"
              aria-label="monthly to yearly switcher button"
            >
              <button
                :class="{ 'monthly-plan': userPlanChosen.plan.isMonthly }"
                @click="emit('choseMonthlyPlan')"
              >
                Monthly
              </button>
              <p
                role="button"
                class="monthly-year-toogle toggle-point"
                :class="{ 'yearly--active': userPlanChosen.plan.isYearly }"
              ></p>
              <button
                :class="{ 'yearly-plan': userPlanChosen.plan.isYearly }"
                @click="emit('choseYarlyPlan')"
              >
                Yearly
              </button>
            </li>
          </ul>
        </section>
      </section>
    </card>
  </section>
</template>

<script setup lang="ts">
import Card from "../UI/Card.vue";
import { defineEmits, onMounted } from "vue";
import { userInfo } from "../../stores/userInfoStore.ts";

const formStore = userInfo();

const userPlanChosen = formStore.userPlanChosen;

const emit = defineEmits([
  "togglePlans",
  "choosePlanAction",
  "choseMonthlyPlan",
  "choseYarlyPlan",
]);

onMounted(() => {
  /* initialized the first choice when the component is created  */
  formStore.plans[0].isSelected = true;
  formStore.userPlanChosen.plan.name = formStore.plans[0].name;
  formStore.userPlanChosen.plan.priceParMonth =
    formStore.plans[0].priceParMonth;
  formStore.userPlanChosen.plan.priceParYear =
    formStore.plans[0].priceParMonth * formStore.nbOfPayingMonthsPerYear;
});
</script>

<style lang="scss" scoped></style>
