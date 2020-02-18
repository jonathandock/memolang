export interface GoogleTranslateResponse {
  data: TranslateTextResponseList;
}

export interface TranslateTextResponseList {
  translations: TranslateTextResponseTranslation[];
}

export interface TranslateTextResponseTranslation {
  translatedText: string;
  detectedSourceLanguage?: string;
  model?: string;
}

export interface TranslationObject {
  source?: string;
  target: string;
  q: string;
}

export interface QuickTranslation {
  translatedTerm: string | TranslateTextResponseTranslation[];
  searchedText: string;
}
