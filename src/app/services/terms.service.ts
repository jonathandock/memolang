import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { IPreposition, ITerm, IName } from "../models/term.models";
import { IVerb } from "../models/verb.models";

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class TermsService {
  private _terms: Observable<(ITerm | IVerb | IPreposition | IName)[]>;
  private _termsCollection: AngularFirestoreCollection<
    ITerm | IVerb | IPreposition
  >;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this._termsCollection = this.afs.collection<ITerm | IVerb | IPreposition | IName>(
      "terms"
    );
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
}
