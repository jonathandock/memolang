/**
 * Term type enum
 */
export enum ETermType {
  Name = "name",
  Verb = "verb",
  Adverb = "adverb",
  Preposition = "preposition",
  Expression = "expression",
  Adjective = "adjective",
}

/**
 * Verb types
 */
export enum EVerbType {
  Regular = "regular",
  Irregular = "irregular"
}

/**
 * Auxiliary of verb
 */
export enum EAuxiliary {
  Sein = "sein",
  Haben = "haben",
  Both = "both"
}

/**
 * Preposition type
 * if is followed by accustif, dator both
 */
export enum EPrepositionType {
  Dative = "dative",
  Accusative = "accusative",
  Both = "both"
}

/**
 * Gender of names
 */
export enum EGender {
  der = "der",
  die = "die",
  das = "das",
  none = "none"
}

/**
 * Gendre type (Not used yet)
 */
export enum EGenderType {
  der = "masculine",
  die = "feminine",
  das = "neutral",
  none = "none"
}

/**
 * Sort types of lists
 */
export enum ESorts {
  Alphabetically = "alphabetically",
  Latest = "most recently added"
}
