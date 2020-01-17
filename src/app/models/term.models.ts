import { IGender } from "./gender.models";

export interface ITerm {
  value: string;
  translation: string;
  type: ETermType;
  examples?: string[];
  notes?: string;
  createdDate: number;
  lastModified: number;
}

export interface IName extends ITerm {
  gender: IGender;
}

export interface IPreposition extends ITerm {
  followedBy: EPrepositionType;
}

export enum ETermType {
  Name = "name",
  Verb = "verb",
  Adverb = "adverb",
  Preposition = "preposition",
  Expression = "expression"
}

export enum EPrepositionType {
  Dative = "dative",
  Accusative = "accusative",
  Both = "both"
}
