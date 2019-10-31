import React from 'react';
import Question from './Question';
import Loader from './Loader';

class App extends React.Component {
    state = {
        questionList: []
    }

    componentDidMount() {
        this.intervalId = setInterval( async () => {
            try {
                await this.getQuestions();
            } catch (error) {
                console.log(error)
            }
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    async getQuestions() {
        const response = await fetch('/api/questions');
        if(!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }
        const {questions} = await response.json();
        if(questions) {
            const questionList = questions.map((question, index) => {
                return <Question key={index} title={question.title} href={question.href} category={question.category} />
            });
            this.setState({questionList})
        }
    }

    render() {
        return(
            <div className="ui container">
                {
                    this.state.questionList.length > 0 
                        ? this.state.questionList
                        : <Loader text="Fetching unanswered questions..." />
                }
            </div>
        )
    }
}

export default App;

