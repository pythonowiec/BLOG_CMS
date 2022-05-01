import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class Example extends Component {
    constructor() {
        super();
        this.onChangeImage = this.onChangeImage.bind(this)
        this.state = {
        files: []
        };
    }
    onChangeImage = (e) => {
        const file = e.target.files[0]
        const fd = new FormData()
        fd.append('image', file, file.name)
        console.log();
        axios.post('http://127.0.0.1:8000/api/posts', fd)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        console.log(this.state.files);
        const fd = new FormData(this.state.files[0])
        const files = this.state.files.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
        ));

    return (
        <div>
            <input type="file" onChange={this.onChangeImage} />
        </div>
    );
  }
}

export default Example