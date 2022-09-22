import React, { Component } from 'react';


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div className="card mt-5 bg-dark ">
                <div className="card-header text-white">Welcome in admin panel</div>

                <div className="card-body text-white">
                </div>
            </div>
        );
    }
}

export default Example