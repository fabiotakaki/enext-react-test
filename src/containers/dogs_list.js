import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveDog } from '../actions/index';

class DogsList extends Component{
  constructor(props){
    super(props);

    this.renderDogs = this.renderDogs.bind(this);
    this.handleSaveDog = this.handleSaveDog.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.state = {sizeSlice: 4};
  }

  handleSaveDog(e, dog){
    e.preventDefault();
    this.props.saveDog({name: dog.name, font_family: dog.font_family, color: dog.color, breed: dog.breed, image_url: dog.image_url});
  }

  loadMore(e){
    e.preventDefault();
    this.setState({sizeSlice : this.state.sizeSlice+4})
  }

  renderDogs(dog, index){
    return (
      <div className={`card box-shadow ${dog.color} ${dog.font_family}`} key={index}>
        <img className="card-img-top" src={dog.image_url} />
        <div className="card-body">
          <h1>Name: {dog.name}</h1>
          <h4>Breed: {dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1)}</h4>
          <div className="d-flex justify-content-between align-items-center">
          <button type="button" className="btn btn-sm btn-success" onClick={(e) => this.handleSaveDog(e, dog)}>Add dog</button>
          </div>
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className="row">
      { this.props.dogs.length > 0 ? <h1>Select your favorite dogs</h1> : null }
      <div className="card-columns">
      {this.props.dogs.slice(0, this.state.sizeSlice).map(this.renderDogs)}
      </div>
      { this.props.dogs.length > 0 ? <button type="button" className="btn btn-info" onClick={(e) => this.loadMore(e)}>Load more</button> : null }
      </div>
    );
  }
}

function mapStateToProps({ dogs }){
  return { dogs };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({saveDog}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DogsList);
