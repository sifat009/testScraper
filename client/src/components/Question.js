import React from 'react';

class Question extends React.Component {
    render() {
        return(
            <div className="question ui icon floating message">
                <a href={this.props.href} target="_blank" rel="noopener noreferrer">
                    <div className="item">
                        <div className="ui teal label">
                            <i className="comment alternate icon"></i>{this.props.category}
                        </div>
                        <div className="content">
                            <div className="header">{this.props.title}</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

Question.defaultProps = {
    'category': 'new'
}

export default Question;

