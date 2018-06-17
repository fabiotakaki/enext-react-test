import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDogs, fetchBreeds, fetchSubBreeds } from '../actions/index';
import axios from 'axios';

class SearchForm extends Component{

  constructor(props){
    super(props);
    this.state = {name: '', font_family: '', color:'', breed: 'poodle', sub_breed: 'all'};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getOptionsSubBreeds = this.getOptionsSubBreeds.bind(this);
  }

  componentWillMount(){
    this.props.fetchBreeds();
  }

  renderList(){
    return this.props.breeds.map((breed) => {
      return <option key={breed} value={breed}>{breed}</option>;
    });
  }

  getOptionsSubBreeds(){
    if(this.props.sub_breeds.data){
      return this.props.sub_breeds.data.message.map((sub_breed) => {
        return <option key={sub_breed} value={sub_breed}>{sub_breed}</option>;
      });
    }else{
      return null;
    }

  }

  handleBreedChange(event){
    this.setState({breed : event.target.value});
    this.setState({sub_breed : 'all'});
    this.props.fetchSubBreeds(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();

    // get Dogs!
    this.props.fetchDogs(this.state.name, this.state.font_family, this.state.color, this.state.breed, this.state.sub_breed);
  }

  render(){
    return (
      <div className="row">
        <div className="col">
          <h1>Search Dogs</h1>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name of your dog</label>
            <input className="form-control" value={this.state.name} onChange={event => this.setState({name : event.target.value})} />
          </div>
          <div className="form-group">
            <label>Font-Family</label>
            <select className="form-control" value={this.state.font_family} onChange={event => this.setState({font_family : event.target.value})}>
            <option key="default" value="">Default (bootstrap)</option>
            <option key="indie-flower" value="indie-flower">Indie Flower</option>
            <option key="pacifico" value="pacifico">Pacifico</option>
            <option key="nunito-sans" value="nunito-sans">Nunito Sans</option>
            <option key="abril-fatface" value="abril-fatface">Abril Fatface</option>
            <option key="amatic-sc" value="amatic-sc">Amatic SC</option>
            </select>
          </div>
          <div className="form-group">
            <label>Color background</label>
            <select className="form-control" value={this.state.color} onChange={event => this.setState({color : event.target.value})}>
            <option key="default" value="">Default (bootstrap)</option>
            <option key="bg-primary" value="text-white bg-primary">Blue</option>
            <option key="bg-secondary" value="text-white bg-secondary">Gray</option>
            <option key="bg-success" value="text-white bg-success">Green</option>
            <option key="bg-danger" value="text-white bg-danger">Red</option>
            <option key="bg-warning" value="text-white bg-warning">Yellow</option>
            </select>
          </div>
          <div className="form-group">
            <label>Pick your favorite breed</label>
            <select className="form-control" value={this.state.breed} onChange={event => this.handleBreedChange(event)}>
            {this.renderList()}
            </select>
          </div>
          <div className="form-group">
            <label>Sub-breed</label>
            <select className="form-control" value={this.state.sub_breed} onChange={event => this.setState({sub_breed : event.target.value})}>
            <option key="all" value="all">All</option>
            {this.getOptionsSubBreeds()}
            </select>
           </div>
          <input className="btn btn-primary" type="submit" value="Search" />
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  // will return as props to BreedList
  return {
    breeds: state.breeds,
    sub_breeds: state.sub_breeds
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchDogs, fetchBreeds, fetchSubBreeds}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);