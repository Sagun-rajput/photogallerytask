import './App.css';
import React, { Component } from 'react';
import Header from './components/Header';

class App extends Component {
  constructor(){
    super();
    this.state = {
      pictures: [],
    };
  }

  componentDidMount(){
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c8c78d376c5b81d57079b51ac633fcb8&tags=nyc&per_page=5000&page=1&format=json&nojsoncallback=1')
    .then(function(response){
      return response.json();
    })
    .then(function(j){
      // alert(JSON.stringify(j));
      let picArray = j.photos.photo.map((pic) => {
        
        var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
        return(
          <img alt="dogs" src={srcPath}></img>
        )
      })
      this.setState({pictures: picArray});
    }.bind(this))
  }


  render() {
     return (
      <div className="App">
        <Header/>

        <p className="App-intro">
          {this.state.pictures}
        </p>
      </div>
  );
}
}

export default App;
