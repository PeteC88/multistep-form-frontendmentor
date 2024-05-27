import { AddOnsInfo } from "../interfaces/addOnsInfo";
export default interface UserPlanChosen {
    name:string,
    email:string,
    phoneNumber:string,
    plan:{
        name:string,
        priceParMonth: number,
        priceParYear: number,
        isMonthly:boolean,
        isYearly:boolean
    },
    addOns:AddOnsInfo[]
}

