import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Notfound extends Component {

    render() {
        return (
            <div className="uk-container">
                    <h3 className=" uk-padding-small uk-padding-remove-bottom uk-margin-remove-bottom">Page requested is not found</h3>
            </div>
        )
    }
}




export default Notfound;