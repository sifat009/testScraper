import React from 'react';
import Question from './Question';
import Loader from './Loader';

class App extends React.Component {
    state = {
        questionList: []
    }

    componentDidMount() {
        this.intervalId = setInterval( async () => {
            await this.getQuestions();
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    async getQuestions() {
        const response = await fetch('/api/questions');
        const {questions} = await response.json();
        const questionList = questions.map((question, index) => {
            return <Question key={index} title={question.title} href={question.href} />
        });
        this.setState({questionList})
    }

    render() {
        return(
            <div className="ui container">
                {
                    this.state.questionList.length > 0 
                        ? this.state.questionList
                        : <Loader text="Fetching questions..." />
                }
            </div>
        )
    }
}

export default App;

