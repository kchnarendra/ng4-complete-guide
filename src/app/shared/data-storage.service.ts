import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";

@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        //return this.http.put('https://ng-recipe-book-528e9.firebaseio.com/recXipes.json', this.recipeService.getRecipes());
        return this.http.put('https://ng-recipe-book-528e9.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    getRecipes() {
        return this.http.get('https://ng-recipe-book-528e9.firebaseio.com/recipes.json')
            .pipe(
                map(
                    (response: Response) => {
                        const recipes = response.json();
                        for(let recipe of recipes) {
                            if(!recipe['ingredients']) {
                                recipe['ingredients'] = [];
                            }
                        }
                        this.recipeService.setRecipes(recipes);
                    }
                )
            );
    }
}
