import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, from, of } from "rxjs";
import { map, take, tap, catchError } from "rxjs/operators";
import { IPreposition, ITerm, IName } from "../models/term.models";
import { IVerb } from "../models/verb.models";

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { GoogleTranslateResponse, TranslateTextResponseList, TranslateTextResponseTranslation, TranslationObject } from '../models/translate.model';

@Injectable({
  providedIn: "root"
})
export class TermsService {
  private _terms: Observable<(ITerm | IVerb | IPreposition | IName)[]>;
  private _termsCollection: AngularFirestoreCollection<
    ITerm | IVerb | IPreposition
  >;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this._termsCollection = this.afs.collection<
      ITerm | IVerb | IPreposition | IName
    >("terms");
    this._terms = this._termsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /**
   * Get all terms from Firebase database
   */
  public termsStream(): Observable<(ITerm | IVerb | IPreposition | IName)[]> {
    return this._terms;
  }

  /**
   * Get all terms from Firebase database
   */
  // public getTerms(): Observable<(ITerm | IVerb | IPreposition)[]> {
  //   return this._termsCollection.
  // }

  /**
   * Get specific term by id
   * @param id
   */
  public get(id: string): Observable<ITerm | IVerb | IPreposition | IName> {
    return this._termsCollection
      .doc<ITerm | IVerb | IPreposition>(id)
      .valueChanges()
      .pipe(
        take(1),
        map(term => {
          term.id = id;
          return term;
        })
      );
  }

  public getLatests() {
    return this._termsCollection.get();
  }

  /**
   * Add a term to the collection
   * @param term
   */
  public add(term: ITerm | IVerb | IPreposition | IName) {
    return from(this._termsCollection.add(term));
  }

  /**
   * Add a term to the collection
   * @param term
   */
  public update(term: ITerm | IVerb | IPreposition | IName) {
    console.log(term);
    return from(this._termsCollection.doc(term.id).update(term));
  }

  /**
   * Delete a term to the collection
   * @param term
   */
  public delete(id: string) {
    return from(this._termsCollection.doc(id).delete());
  }

  /**
   * Translate a word to german with google translate API
   * @param translationObj
   */
  public translate(translationObj: TranslationObject): Observable<TranslateTextResponseTranslation[]> {
    const url =
      "https://google-translate1.p.rapidapi.com/language/translate/v2";

    const httpOptions = {
      headers: new HttpHeaders({
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
        "x-rapidapi-key": "5d02500658msh4fd0f4747554216p1addfdjsn436842ca05b7",
        "content-type": "application/x-www-form-urlencoded"
      })
    };

    const httpParams = new HttpParams({ fromObject: translationObj as any });
    const urlEncodedBody = httpParams.toString().replace(/\+/g, '%2B');

    return this.http.post(url, urlEncodedBody, httpOptions).pipe(
      map((googleTranslateRes: GoogleTranslateResponse) => {
        if (googleTranslateRes && googleTranslateRes.data) {
          return googleTranslateRes.data.translations;
        } else {
          return [];
        }
      }),
      catchError((err) => {
        console.log(err);
        return of([]);
      })
    );
  }
}
