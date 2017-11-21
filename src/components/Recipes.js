import React from 'react';
import Recipe from './Recipe';

const Recipes = (props) => (
    <div className="recipes">
        {
            props.recipies.map((item, index) => {
            return (
                    <Recipe 
                    key={index} 
                    recipeName={item.name}
                    recipeIngredients={item.ingredients}
                    index={index}
                    handleEditRecipe={props.handleEditRecipe}
                    handleRemoveRecipe={props.handleRemoveRecipe}
                    collapse={props.collapse}
                    />
            )
        })
        }
    </div>
);   

export default Recipes;