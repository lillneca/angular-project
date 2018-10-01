import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';


@Injectable({providedIn: 'root'})
export class RecipeService {
  private recipes: Recipe[] = [];
  private recipesUpdated = new Subject<Recipe[]>();

  constructor (private http: HttpClient) {}

  getRecipe() {
    this.http.get<{message: string, recipes: any}>('http://localhost:3000/api/recipes')
      .pipe(map((recipeData) => {
        return recipeData.recipes.map(recipe => {
          return {
            title: recipe.title,
            author: recipe.author,
            category: recipe.category,
            id: recipe._id
          };
        });
      }))
      .subscribe(transformedRecipeData => {
        this.recipes = transformedRecipeData;
        this.recipesUpdated.next([...this.recipes]);
      });
  }

  getRecipeToEdit(id: string) {
    return this.http.get<{_id: string, title: string, author: string, category: string}>
    ('http://localhost:3000/api/recipes/' + id);
  }

  getRecipeUpdated() {
    return this.recipesUpdated.asObservable();
  }

  addRecipe(title: string, author: string, category: string) {
    const newRecipe: Recipe = { id: null, title: title, author: author, category: category };
    this.http.post<{message: string, recipeId: string}>('http://localhost:3000/api/recipes', newRecipe)
      .subscribe(responseData => {
        const id = responseData.recipeId;
        newRecipe.id = id;
        this.recipes.push(newRecipe);
        this.recipesUpdated.next([...this.recipes]);
      });
  }

  updateRecipe(id: string, title: string, author: string, category: string ) {
    const editedRecipe: Recipe = { id: id, title: title, author: author, category: category };
    this.http
      .put('http://localhost:3000/api/recipes/' + id, editedRecipe)
      .subscribe(response => {
        const updatedRecipes = [...this.recipes];
        const oldRecipeIndex = updatedRecipes.findIndex(p => p.id === id);
        updatedRecipes[oldRecipeIndex] = editedRecipe;
        this.recipes = updatedRecipes;
        this.recipesUpdated.next([...this.recipes]);
      });
  }

  deleteRecipe(recipeId: string) {
    this.http.delete('http://localhost:3000/api/recipes/' + recipeId)
      .subscribe(() => {
        const updatedRecipes = this.recipes.filter(recipe => recipe.id !== recipeId);
        this.recipes = updatedRecipes;
        this.recipesUpdated.next([...this.recipes]);
      });
  }
}
