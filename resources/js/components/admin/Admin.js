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
            <div class="card mt-5 bg-dark ">
                <div class="card-header text-white">Welcome in admin panel</div>

                <div class="card-body text-white">
                </div>
            </div>
        );
    }
}

export default Example