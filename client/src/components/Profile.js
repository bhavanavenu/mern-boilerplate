import React, { Component } from 'react';
import api from '../api';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      pictureUrl: ''
    }
  }
  componentDidMount() {
    api.getProfile()
    .then(user => {
      this.setState({
        name: user.name,
        email: user.email,
        pictureUrl: user.pictureUrl,
        file: null,
        isLoading: false,
      })
    })
  }
  render() {           
    return (
      <div className="Profile">
        <h2>Profile</h2>

        Name: {this.state.name} <br/>
        Email: {this.state.email} <br/>
        {this.state.pictureUrl && 
          <img 
            src={this.state.pictureUrl} 
            style={{
              height: 200 
            }}
          />
        }
        {this.state.isLoading && 
          <div>Loading...</div>
        }
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
          <button type="submit">Save new profile picture</button>
        </form>
      </div>
    );
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
    this.setState({
      isLoading: true
    })
    api.editPicture(this.state.file)
    .then(data => {
      console.log("SUCCESS", data)
      this.setState({
        pictureUrl: data.pictureUrl,
        isLoading: false,
      })
    })
  }
}

export default Profile;