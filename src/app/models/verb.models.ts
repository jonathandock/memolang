import { ITerm } from "./term.models";

export interface IVerb extends ITerm {
  verbType: EVerbType;
  conjugation: IConjugation;
}

export enum EVerbType {
  Regular = "regular",
  Irregular = "irregular"
}

export interface IConjugation {
  infinitive: string;
  presentParticiple?: string;
  pastParticiple?: string;
}
