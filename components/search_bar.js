import React, { Component } from 'react';
//pull off the property 'Component' from react as a variable called Component

//Functional Component
// const SearchBar = () => {
// 	return <input type="text" placeholder="hello"></input>;
// }

//Class-based Component
class SearchBar extends Component {
	//Learning state

	constructor(props) {
		super(props);

		this.state = { term: ''};
	}

	render() {
		// return <input onChange ={this.onInputChange}/>;
		//using arrow function
		// return <input onChange={(event) => {console.log(event.target.value);}}/>
		// update the state object
		return (
			<div className="search-bar">
				<input 
					value = {this.state.term}
					onChange = { event => this.onInputChange(event.target.value) } />
				
			</div>
		);

	}

	//event handler, argument event could be event/ e/ eventObject
	onInputChange(term) {
		this.setState({term});
		this.props.onSearchTermChange(term);
	}

}

export default SearchBar;