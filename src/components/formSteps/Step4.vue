<template>
    <section class="card-wrapper">
        <card>
            <section class="form-container step3" aria-label="step3-form">
                <h2>Finishing up</h2>
                <p class="form-cotainer__description">Double-check everything looks OK before confirming.</p>
                <section class="last-check__wrapper">
                    <div class="last-check__plan">
                        <div class="last-check__info">
                            <h3>{{ `${formStore.userPlanChosen.plan.name} (${monthlyOrYearly.monthlyYearly})` }}</h3>
                            <p @click="emit('changePlanAction')">Change</p>
                        </div>
                        <p class="last-check__plan-price total-price-plan">{{
                            `$${monthlyOrYearlyPrice}/${monthlyOrYearly.moOrYr}` }}</p>
                    </div>
                    <div v-for="addOn in filteredAddOns" class="last-check__services">
                        <p class="last-check__service-title">{{ `${addOn.name} (${monthlyOrYearly.moOrYr})` }}</p>
                        <p class="last-check__service-price">{{ isMonthly ? `+$${addOn.price}/mo` : `+$${addOn.price *
                            formStore.nbOfPayingMonthsPerYear}/yr` }}</p>
                    </div>
                </section>
                <section class="last-check__total">
                    <p class="total__title">Total {{ `(${monthlyOrYearly.perMonthPerYear})` }}</p>
                    <p class="total__price"> {{ `+$${totalPrice}/${monthlyOrYearly.moOrYr}` }}</p>

                </section>
            </section>

        </card>
    </section>
</template>

<script setup>
import Card from '../UI/Card.vue';
import {userInfo} from '../../stores/userInfoStore.ts';
import { onMounted, defineEmits, computed } from 'vue';

const emit = defineEmits(['changePlanAction'])
const formStore = userInfo();



let isMonthly = formStore.userPlanChosen.plan.isMonthly;


const monthlyOrYearly = computed(()=>{
    return{
        monthlyYearly: isMonthly ? 'Monthly' : 'Yearly',
        moOrYr: isMonthly ? 'mo' : 'yr',
        perMonthPerYear: isMonthly ? 'per month' : 'per year'
        }
    } 
);


const monthlyOrYearlyPrice = computed(()=>{
    return isMonthly ? formStore.userPlanChosen.plan.priceParMonth : formStore.userPlanChosen.plan.priceParYear
    }
)


const filteredAddOns = computed(()=>{

    if(formStore.userPlanChosen.addOns.length >= 1){
        //sort de array so it will be displayed sorted on the component
        return formStore.userPlanChosen.addOns.sort( (a, b) => a.id - b.id );
    }
        
})

const totalPrice = computed(()=>{
    
    const total = [];
    total.push(formStore.userPlanChosen.plan.priceParMonth);
    formStore.userPlanChosen.addOns.forEach(item => total.push(item.price))

    let sum = total.reduce((accumulator, currentValue)=>{
        return accumulator + currentValue;
    }, 0);
    
    if(isMonthly){   
        return sum;
    }else{
        return sum * formStore.nbOfPayingMonthsPerYear;
    }
})
</script>