import React from 'react';

class Question extends React.Component {
    render() {
        return(
            <div className="question ui icon floating message">
                <a href="/">
                    <div className="item">
                        <div class="ui teal label">
                            <i className="comment alternate icon"></i>New
                        </div>
                        <div className="content">
                            <div className="header">Helen</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default Question;

