import {defineStore} from "pinia";
import {ref, computed} from 'vue'
import { AddOnsInfo } from "../interfaces/addOnsInfo";
import PlanInformations from "../interfaces/planInformations";
import User from "../interfaces/user";
import UserPlanChosen from "../interfaces/userPlanChosen";


export const userInfo = defineStore('userInfo', ()=>{

    let nbOfPayingMonthsPerYear = 10;

    const user = ref<User>({
        name:'',
        email:'',
        phone:''
    })

    const plans = ref<PlanInformations[]>([
            {
                id:1,
                name:'Arcade',
                priceParMonth: 9,
                icon: 'icon-arcade.svg',
                isSelected: true
            },
            {
                id:2,
                name:'Advanced',
                priceParMonth: 12,
                icon:'icon-advanced.svg',
                isSelected: false
            },
            {
                id:3,
                name:'Pro',
                priceParMonth: 15,
                icon :'icon-pro.svg',
                isSelected: false
            }
        ])
    


    const addOns:AddOnsInfo[] = [
        {
            id:1,
            name:'Online  service',
            infos:'Access to multiplayer games',
            price: 1,
            isSelected: true
        },
        {
            id:2,
            name:'Larger storage',
            infos:'Extra 1TB of cloud save',
            price: 2,
            isSelected: false
        },
        {
            id:3,
            name:'Customizable Profile',
            infos:'Custom theme on your profile',
            price: 2,
            isSelected: false
        }
        
    ]

    const userPlanChosen= ref<UserPlanChosen>({
        name:'',
        email:'',
        phoneNumber:'',
        plan:{
            name:'',
            priceParMonth: 0,
            priceParYear: 0,
            isMonthly:true,
            isYearly:false
        },
        addOns:[]
    })

  

    const currentStep = ref(1);
    const getUserPlanChosen = computed(()=>userPlanChosen);
    
    return {user, plans, addOns, userPlanChosen, getUserPlanChosen, currentStep, nbOfPayingMonthsPerYear};
})