import React from 'react';
import AddRecipe from './AddRecipe';
import EditModal from './EditModal';
import Header from './Header';
import Recipes from './Recipes';

export default class RecipeBox extends React.Component {
    state = {
        // recipies: [{
        //     name: "Pumpkin Pie 2",
        //     ingredients: ['Pumpkin Puree','Sweetened Condensed Milk','Eggs','Pumpkin Pie Spice','Pie Crust']
        // },{
        //     name: 'Onion Pie',
        //     ingredients: ['Onion','Pie Crust','Sounds Yummy right?']
        // }],
        recipies: [],
        editModal: undefined,
        addModal: undefined,
        recipeIngredients: undefined,
        recipeIndex: undefined,
        collapse: false
    };
    handleEditRecipe = (recipeToEdit, recipeIngredients, recipeIndex) => {
        this.setState(() => ({editModal: recipeToEdit, 
                            recipeIngredients: recipeIngredients,
                            recipeIndex,
                            edit: true
                    }));
    };
    handleSaveEdit = (recipe, recipeIngredients) => {
        if (!recipe) {
            return 'Enter valid value to add item';
        } else if (this.state.recipies.find(o => o.name === recipe)&&!this.state.edit) {
            return 'This option already exists';
        } 
        const index = this.state.recipeIndex;
        if(this.state.edit){
            this.setState((prevState) => {  
                let newRecipies = prevState.recipies;
                newRecipies[index].name=recipe;
                newRecipies[index].ingredients=recipeIngredients;
                return {
                    recipies: newRecipies,
                    editModal: undefined,
                    recipeIngredients: undefined,
                    recipeIndex: undefined,
                    edit: false
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    recipies: prevState.recipies.concat([{name: recipe, ingredients: recipeIngredients}]),
                    editModal: undefined,
                    recipeIngredients: undefined,
                    recipeIndex: undefined,
                }
            })
        }
    };
    handleRemoveRecipe = (recipeToRemoveIndex) => {
        this.setState((prevState)=>{
            let rese = prevState.recipies;
            rese.splice(recipeToRemoveIndex,1);
            return {
                collapse: false,
                recipies: rese
                //recipies: prevState.recipies.splice(recipeToRemoveIndex,1)
            }
        })        
    };
    handleAddRecipe = () => {
        this.setState(() => ({editModal: true,
                                edit: false}))
    };
    componentDidMount() {
        try {
            const json = localStorage.getItem('recipies');
            const recipies = JSON.parse(json);
            
            if(recipies) {
                this.setState(() => ({ recipies }));
            }
        } catch (e) {
            // Do nothig at all
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.recipies.length !== this.state.recipies.length || 
        prevState.edit !== this.state.edit) {
            const json = JSON.stringify(this.state.recipies);
            localStorage.setItem('recipies', json);
        }
    }
    handleCloseModal = () => {
        this.setState(() => ({editModal: undefined, recipeIngredients: undefined}))
    }
    render () {
        return (
            <div>
                <Header />
                <div className="container">
                    <Recipes 
                    recipies={this.state.recipies}
                    collapse={this.state.collapse}
                    handleEditRecipe={this.handleEditRecipe}
                    handleRemoveRecipe={this.handleRemoveRecipe}
                    />
                    <AddRecipe 
                    handleAddRecipe={this.handleAddRecipe}
                    />
                </div>
                <EditModal 
                selectedOption={this.state.editModal}
                recipeIngredients={this.state.recipeIngredients}
                edit={this.state.edit}
                handleCloseModal={this.handleCloseModal}
                handleSaveEdit={this.handleSaveEdit}
                />
            </div>
        );
    }
}

