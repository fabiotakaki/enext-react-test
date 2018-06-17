import React, { Component } from 'react';
import SearchForm from '../containers/search_form';
import DogsList from '../containers/dogs_list';
import DogsSaved from '../containers/dogs_saved';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchForm />
        <DogsSaved />
        <DogsList />
      </div>
    );
  }
}
