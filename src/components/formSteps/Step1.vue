<template>
    <section class="card-wrapper">
        <card>
            <section class="form-container step1" aria-label="step1-form">
                <h2>Personal Info</h2>
                <p class="form-cotainer__description">Please provide your name, email address, and phone number.</p>
                <section class="form-inputs step1" aria-label="step1-inputs">
                    <label for="name">Name</label>
                    <input type="text" name="name" placeholder="e.g. Stephen King" v-model="userChoise.name">
                    <label for="email">Email Address</label>
                    <input type="email" name="email" placeholder="e.g. stephenking@lorem.com" v-model="userChoise.email">
                    <label for="phone">Phone Number</label>
                    <input type="number" name="phone" placeholder="e.g. +1 234 567 890" v-model="userChoise.phoneNumber">
                </section>
            </section>     
        </card>
    </section>
</template>

<script setup lang="ts">
import Card from '../UI/Card.vue';
import {userInfo} from '../../stores/userInfoStore.ts';

const formStore = userInfo();

const userChoise = formStore.getUserPlanChosen;




//https://stackoverflow.com/questions/76370713/how-to-use-pinia-store-getters-on-v-model-of-an-input LEGGERE per V-Model
</script>

<style lang="scss" scoped>

</style>
