import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface RecipeCat {    // Interface for the recipe category dropdown
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recipe-create',
  templateUrl: 'recipe-create.component.html',
  styleUrls: ['recipe-create.component.scss']
})
export class RecipeCreateComponent implements OnInit {

  enteredTitle = '';
  enteredAuthor = '';
  private formMode = 'create';
  private recipeID: string;
  recipe: Recipe;


  constructor(public recipeService: RecipeService, public route: ActivatedRoute) {}

  recipeCat: RecipeCat [] = [
    {value: 'breakfast-0', viewValue: 'Breakfast'},
    {value: 'lunch-1', viewValue: 'Lunch'},
    {value: 'dinner-2', viewValue: 'Dinner'},
    {value: 'savouries-0', viewValue: 'Savouries'},
    {value: 'drinks-0', viewValue: 'Drinks'},
    {value: 'sweets-0', viewValue: 'Sweets'},
  ];

  ngOnInit () {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('recipeID')) {
        this.formMode = 'edit';
        this.recipeID = paramMap.get('recipeID');
        this.recipeService.getRecipeToEdit(this.recipeID)
          .subscribe(recipeData => {
            this.recipe = {id: recipeData._id, title: recipeData.title, author: recipeData.author, category: recipeData.category};
          });
      } else {
        this.formMode = 'create';
        this.recipeID = null;
      }
    });
  }


  onSaveRecipe(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.formMode === 'create') {
     this.recipeService.addRecipe(form.value.recipeTitle, form.value.recipeAuthor, form.value.recipeCategory);
    } else {
      this.recipeService.updateRecipe(this.recipeID, form.value.recipeTitle, form.value.recipeAuthor, form.value.recipeCategory);
    }
    form.resetForm();
  }
}
