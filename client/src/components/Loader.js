import React from 'react';

class Loader extends React.Component {

    render() {
        return(
            <div className="ui segment placeholder">
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">{this.props.text}</div>
                </div>
                <p></p>
                <p></p>
                <p></p>
            </div>
        )
    }

}

Loader.defaultProps = {
    text: 'Loading...'
}

export default Loader;