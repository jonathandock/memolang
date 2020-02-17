import { ETermType, EPrepositionType } from "../app/models/term.models";
import { EGender, EGenderType } from 'src/app/models/gender.models';
import { EVerbType, EAuxiliary } from 'src/app/models/verb.models';

export const GLOBALS = {
  TERM_TYPES_LIST: [
    ETermType.Name,
    ETermType.Verb,
    ETermType.Adverb,
    ETermType.Expression,
    ETermType.Preposition
  ],
  GENDERS_LIST: [
    EGender.der,
    EGender.die,
    EGender.das,
    EGender.none,
  ] ,
  PREPOSITION_TYPES_LIST: [
    EPrepositionType.Accusative,
    EPrepositionType.Dative,
    EPrepositionType.Both
  ],
  VERB_TYPES_LIST: [
    EVerbType.Regular,
    EVerbType.Irregular,
  ],
  AUXILIARY_LIST: [
    EAuxiliary.Haben,
    EAuxiliary.Sein,
    EAuxiliary.Both
  ]
};
