import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyC1ef2BAWABLkmhmgpRM8LIBJAAW1tmkA4';

YTSearch ({key: API_KEY, term: 'surfboards'}, function(data){
	console.log(data);
});
//Create a new component. This component will produce some HTML
//refactor functional component to class-based component
// const App = function() {
// 	return (
// 		<div>
// 			<SearchBar />
// 		</div>
// 	);
// };

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		this.videoSearch('surfboards');

	}

	videoSearch(term) {

		YTSearch (
			{key: API_KEY, term: term}, 
			(videos) => {
				this.setState({ 
					videos: videos,
					selectedVideo: videos[0]
				});
				// ES6 when object's property and value have same name make it compact like above {videos: videos} = {videos}								
			}
		);

	}

	render() {
		const videoSearch = _.debounce(term => this.videoSearch(term), 300 );
		return (
			<div>
				<SearchBar onSearchTermChange = {term => videoSearch(term)} />
				<VideoDetail video = { this.state.selectedVideo } />
				<VideoList onVideoSelect = {selectedVideo => this.setState({selectedVideo})} videos = { this.state.videos } />
			</div>
		);
	}
}

//Take this component's generated HTML and put it into the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));