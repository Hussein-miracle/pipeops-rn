import {z} from "zod";
import { Service } from "./types";


const service_validation_schema = z.object({
  serviceType:z.custom<Service>().refine((service) => !!service?.id , {message:"Please select a service"})
})