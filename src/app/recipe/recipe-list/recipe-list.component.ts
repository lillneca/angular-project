import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: 'recipe-list.component.html',
  styleUrls: ['recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipe: Recipe[] = [];
  private recipeSub: Subscription;

  constructor(public recipeService: RecipeService) {}

ngOnInit() {
  this.recipeService.getRecipe();
  this.recipeSub = this.recipeService.getRecipeUpdated()
    .subscribe((recipes: Recipe[]) => {
      this.recipe = recipes;
    });
}

onDelete(recipeId: string) {
  this.recipeService.deleteRecipe(recipeId);
}

ngOnDestroy() {
  // Called once, before the instance is destroyed.
  // Add 'implements OnDestroy' to the class.
  this.recipeSub.unsubscribe();
}

}
