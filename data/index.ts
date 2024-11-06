import { AfternoonIcon, AllDayIcon, EveningIcon, MorningIcon } from "@/components/icons"
import { Period, Service } from "@/lib/types"
import { ReactNode } from "react"
import { SvgProps } from "react-native-svg"

export const serviceItems:Service[] = [
  {
    title:"Residential Service",
    description:"Select this if you need the task done at a particular location of your choice",
    id:"si1"
  },
  {
    title:"On-Site Service",
    description:"Select this if you are more happy to go to the registered business address",
    id:"si2"
  },
]


export const serviceTimes:Array<Period  & { icon?:((props: SvgProps) => ReactNode)}> = [
  {
    title:"Morning",
    start:"7:00am",
    end:"11:59am",
    id:"st1",
    icon:MorningIcon
  },
  {
    title:"Afternoon",
    start:"12:00am",
    end:"4:59am",
    id:"st2",
    icon:AfternoonIcon,
  },
  {
    title:"Evening",
    start:"5:00pm",
    end:"9:59am",
    id:"st3",
    icon:EveningIcon
  },
  {
    title:"All Day",
    start:"7:00am",
    end:"9:59am",
    id:"st4",
    icon:AllDayIcon,
  },
]

export  const lgas = [
  {
    label:"Ido",
    value:"ido",
  },
  {
    label:"Ikorodu",
    value:"ikorodu",
  },
  {
    label:"Ikeja",
    value:"ikeja",
  },
]