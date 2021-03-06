import React, { Component } from 'react';
import api from '../api';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null
    }
  }
  handleChange(e) {
    console.log('handleChange');
    console.log('DEBUG e.target.files[0]', e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    api.addPicture(this.state.file)
  }
  render() {                
    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
          <button type="submit">Save new profile picture</button>
        </form>
      </div>
    );
  }
}

export default Home;