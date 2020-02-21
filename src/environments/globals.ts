import {
  ETermType,
  EGender,
  EPrepositionType,
  EVerbType,
  EAuxiliary
} from "src/app/models/enums";

export const GLOBALS = {
  LANGUAGES_LIST: [
    { name: "french", code: "fr" },
    { name: "german", code: "de" },
    { name: "english", code: "en" }
  ],
  TERM_TYPES_LIST: [
    ETermType.Name,
    ETermType.Verb,
    ETermType.Adjective,
    ETermType.Adverb,
    ETermType.Expression,
    ETermType.Preposition
  ],
  GENDERS_LIST: [EGender.der, EGender.die, EGender.das, EGender.none],
  PREPOSITION_TYPES_LIST: [
    EPrepositionType.Accusative,
    EPrepositionType.Dative,
    EPrepositionType.Both
  ],
  VERB_TYPES_LIST: [EVerbType.Regular, EVerbType.Irregular],
  AUXILIARY_LIST: [EAuxiliary.Haben, EAuxiliary.Sein, EAuxiliary.Both]
};
