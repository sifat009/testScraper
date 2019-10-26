import React from 'react';
import Question from './Question';

class App extends React.Component {
    render() {
        return(
            <div className="ui container">
                <Question />
                <Question />
                <Question />
                <Question />
            </div>
        )
    }
}

export default App;

