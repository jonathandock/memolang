export interface IGender {
  value: EGender;
  type: string;
}

export enum EGender {
  Der = "der",
  Die = "die",
  Das = "das",
  None = "none"
}

export enum EGenderType {
  Masculine = "masculine",
  Feminine = "feminine",
  Neutral = "neutral",
  None = "none"
}
