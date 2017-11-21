import React from 'react';
import Collapsible from 'react-collapsible';
import Actions from './Actions';

const Recipe = (props) => {
    return (
    <div>
        <Collapsible trigger={props.recipeName} open={props.collapse}>
            <h2 className="Collapsible__h2">Ingredients</h2>
            <div className="Collapsible__content">
            {props.recipeIngredients.map((ingredient, index) => (
                    <div className="Collapsible__container" key={index}>
                    <p className="Collapsible__item">{ingredient}</p>
                    </div>
                )
            )}
            <Actions 
            handleEditRecipe={props.handleEditRecipe}
            handleRemoveRecipe={props.handleRemoveRecipe}
            recipeName={props.recipeName}
            index={props.index}
            recipeIngredients={props.recipeIngredients}
            />
            </div>
        </Collapsible>
    </div>
    );
};

export default Recipe;