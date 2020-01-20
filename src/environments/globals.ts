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
  GENDERS_LIST: {
    der: { value: EGender.der, type: EGenderType.der },
    die: { value: EGender.die, type: EGenderType.die },
    das: { value: EGender.das, type: EGenderType.das },
    none: { value: EGender.none, type: EGenderType.none },
  } ,
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
