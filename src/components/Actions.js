import React from 'react';

const Actions = (props) => (
    <div className="Collapsible__item">
        <button className="button"
            onClick={(e) => {
                props.handleEditRecipe(props.recipeName, props.recipeIngredients, props.index);
            }}>
            Edit
        </button>
        <button className="button Actions__button-remove"
            onClick={(e) => {
                props.handleRemoveRecipe(props.index);
            }}>
            Remove    
        </button>
    </div>
);

export default Actions;