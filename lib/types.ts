// Extra types to you if you need :)
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectOptionsArray {
  options?: SelectOption[];
}

export type SelectValue = string | number | undefined;




export interface Service{
  title:string;
  description:string;
  id:string | number;
}

export interface Period{
  title:string;
  start:string;
  end:string;
  id:string | number;
  imageUrl?:string;
}