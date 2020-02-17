import { IGender, EGender } from "./gender.models";
import { IVerb } from "./verb.models";

export interface ITerm {
  id: string;
  value: string;
  translation: string;
  type: ETermType;
  examples?: string[];
  notes?: string;
  createdDate: number;
  lastModified: number;
}

export interface ISortedTerms {
  key: string;
  terms: (ITerm | IVerb | IPreposition)[];
}

export interface IName extends ITerm {
  gender: string;
  plural?: string;
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
