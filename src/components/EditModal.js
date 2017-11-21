import React from 'react';
import Modal from 'react-modal';

export default class EditModal extends React.Component {
    state = {
        error: undefined
    };
    handleSaveEdit = (e) => {
        e.preventDefault();
        const recipe = e.target.elements.RecipeName.value.trim();
        const ingredients = e.target.elements.ingredientsText.value.split(",");
        const error = this.props.handleSaveEdit(recipe, ingredients);
        console.log(error);
        this.setState(() => ({ error }));
    }
    handleCloseModal = () => {
        this.setState(() => ({ error: undefined }));
        this.props.handleCloseModal();
    }
    render () {
        let ingredientsString = "";
        let recipe = "";
        if(this.props.recipeIngredients){
            ingredientsString = this.props.recipeIngredients.toString();
        }
        if(this.props.selectedOption && this.props.edit){
            recipe = this.props.selectedOption;
        } 
    return (
    <Modal
        isOpen={!!this.props.selectedOption}
        onRequestClose={this.props.handleCloseModal}
        contentLabel="Selected Option"
        closeTimeoutMS={200}
        className="modal"
        >
            {(this.props.edit) ? <h2 className="modal__title">Edit Recipe</h2> : <h2 className="modal__title">Add Recipe</h2>}
            <div className="modal__body">
                <form className="modal__form" id="recipeForm" onSubmit={this.handleSaveEdit}>
                    <h3 className="modal__subtitle">Recipe</h3>
                        <input className="modal__input" type="text" name="RecipeName" defaultValue={recipe} placeholder="Enter recipe name"/>
                    <h3 className="modal__subtitle">Ingredients</h3>
                    <textarea className="modal__textarea" placeholder="Enter Ingredients, separated by comma" name="ingredientsText" defaultValue={ingredientsString}/>
                    {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                </form>
                <div className="modal__button-area">
                    <button className="button modal__save-button" type="submit" form="recipeForm">Save</button>
                    <button 
                        className="button modal__close-button" 
                        onClick={this.handleCloseModal}>
                        Close
                    </button>
                </div>
            </div>
    </Modal>
    );
}
}