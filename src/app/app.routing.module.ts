import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipe/recipe-create/recipe-create.component';

const routes: Routes = [
  {path: '', component: RecipeListComponent},
  {path: 'create', component: RecipeCreateComponent},
  {path: 'edit/:recipeID', component: RecipeCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
