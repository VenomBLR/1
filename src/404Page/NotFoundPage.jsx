import React from 'react';

export class NotFoundPage extends React.Component {

    render() {
        return (
            <div className = "container">  
            <div className = "row"> 
            <div class="col-md-4"></div>
            <div className = "col-md-3 col-md-offset-3">
                <h1>404 Oops...</h1>
            </div>
            </div>
            </div>
        );
    }
}

export default NotFoundPage;