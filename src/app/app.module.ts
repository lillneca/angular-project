import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeComponent} from './recipe/recipe.component';
import { HeaderComponent} from './header/header.component';
import { RecipeCreateComponent} from './recipe/recipe-create/recipe-create.component';
import { RecipeListComponent} from './recipe/recipe-list/recipe-list.component';
import { RecipeViewComponent} from './recipe/recipe-list/recipe-view/recipe-view.component';
import { AppRoutingModule } from './app.routing.module';




@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeCreateComponent,
    RecipeViewComponent,
    HeaderComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
