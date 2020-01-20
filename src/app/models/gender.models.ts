export interface IGender {
  value: EGender;
  type: string;
}

export enum EGender {
  der = "der",
  die = "die",
  das = "das",
  none = "none"
}

export enum EGenderType {
  der = "masculine",
  die = "feminine",
  das = "neutral",
  none = "none"
}
