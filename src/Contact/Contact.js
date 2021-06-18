import React, { Component, useState } from 'react';
import "./Contact.css";

class Contact extends Component {
    render() {
        return (
            <div className='App'>
            <form>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        );
    }
}

export default Contact;