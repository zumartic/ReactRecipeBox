import React from 'react';

const AddRecipe = (props) => (
    <div>
        <button className="button"
            onClick={(e) => {
                props.handleAddRecipe();
        }}>
        Add New Recipe
        </button>
    </div>
);

export default AddRecipe;