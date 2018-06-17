import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dogsUpdate } from '../actions/index';

class DogsSaved extends Component{
  constructor(props){
    super(props);

    this.clearStorage = this.clearStorage.bind(this);
    this.renderDogs = this.renderDogs.bind(this);
    this.formatDate = this.formatDate.bind(this);
  }

  componentWillMount(){
    if(localStorage.getItem('savedDogs') != null){
      this.props.dogsUpdate(JSON.parse(localStorage.getItem('savedDogs')));
    }
  }

  formatDate(d) {
    let date = new Date(d);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
  }

  clearStorage(){
    this.props.dogsUpdate([]);
    localStorage.clear();
  }

  renderDogs(dog, index){
    return (
      <div className={`card box-shadow ${dog.color} ${dog.font_family}`} key={index}>
        <img className="card-img-top" src={dog.image_url} />
        <div className="card-body">
          <h1>Name: {dog.name}</h1>
          <h4>Breed: {dog.breed.charAt(0).toUpperCase() + dog.breed.slice(1)}</h4>
          <div className="d-flex justify-content-between align-items-center">
          </div>
        </div>
      </div>
    );
  }

  render(){
    return (
      <div className="row">
      <div className="col">
      { this.props.dogs_saved.length > 0 ? <h1>Dogs Saved</h1> : null }
      { this.props.dogs_saved.length > 0 ? <h2>Date cached: {this.formatDate(parseInt(localStorage.getItem('savedDogsDateTime')))}</h2> : null }
      <div className="card-columns">
      {this.props.dogs_saved.map(this.renderDogs)}
      </div>
      { this.props.dogs_saved.length > 0 ? <button className="btn btn-danger" onClick={this.clearStorage}>Clear Storage</button> : null }
      </div>
      </div>
    );
  }
}

function mapStateToProps({ dogs_saved }){
  return { dogs_saved };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({dogsUpdate}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DogsSaved);
