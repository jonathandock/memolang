import { ITerm } from "./term.models";

export interface IVerb extends ITerm {
  verbType: EVerbType;
  conjugation?: IConjugation;
  auxiliary: EAuxiliary;
}

export enum EVerbType {
  Regular = "regular",
  Irregular = "irregular"
}

export interface IConjugation {
  presentParticiple?: string;
  pastParticiple?: string;
}

export enum EAuxiliary {
  Sein = "sein",
  Haben = "haben",
  Both = "both"
}
