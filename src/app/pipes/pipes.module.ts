import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortTermsPipe } from './sort-terms.pipe';
import { FilterBySearchPipe } from './filter-by-search.pipe';
import { HighlightPipe } from './highlight.pipe';



@NgModule({
  declarations: [
    SortTermsPipe,
    FilterBySearchPipe,
    HighlightPipe
  ],
  exports: [
    SortTermsPipe,
    FilterBySearchPipe,
    HighlightPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
