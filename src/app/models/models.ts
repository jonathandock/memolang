import { ETermType, EPrepositionType, EGender, EVerbType, EAuxiliary } from "./enums";

/**
 * Main ITerm interface
 * Representation of a word
 */
export interface ITerm {
  /**
   * Required for types of terms
   */
  id: string;
  value: string;
  translation: string;
  type: ETermType;

  /**
   * properties for a name
   */
  gender?: string;
  plural?: string;

  /**
   * property for a preposition
   */
  followedBy?: EPrepositionType;

  /**
   * properties for a verb
   */
  verbType?: EVerbType;
  conjugation?: IConjugation;
  auxiliary?: EAuxiliary;

  /**
   * Optional properties for all types of term
   */
  examples?: string[];
  notes?: string;
  termKnowledge?: ITermKnowledge;
  createdDate: number;
  lastModified: number;
}

/**
 * Gender model for a term of type Name
 */
export interface IGender {
  value: EGender;
  type: string;
}

/**
 * Conjugation of verb
 */
export interface IConjugation {
  presentParticiple?: string;
  pastParticiple?: string;
}

/**
 * Model for the terms sorted aplhabetically
 */
export interface ISortedTerms {
  key: string;
  terms: ITerm[];
}

/**
 * Term knowledge (Bound to quizz)
 */
export interface ITermKnowledge {
  totalTries: number;
  successTries: number;
  failTries: number;
  tries: ITry[];
}

/**
 * Model of a try (quizz)
 */
export interface ITry {
  date: number;
  success: boolean;
  guess: IQuizzResponse;
}

/**
 * Quizz response model
 */
export interface IQuizzResponse {
  try: string;
  gender?: string;
}
