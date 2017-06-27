import React from 'react';
import { Form, Container, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';

class FeedbackPrompt extends React.Component {
    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.array,
        actions: React.PropTypes.shape({
            getFeedbacks: React.PropTypes.func.isRequired,
            postFeedbackPrompt: React.PropTypes.func.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            prompt: '',
            rating: 0,
            comment: '',
            status: ''
        };

        this.selectRating = this.selectRating.bind(this);
        this.submitRating = this.submitRating.bind(this);
        this.onCommentChange = this.onCommentChange.bind(this);
    }

    selectRating(e, { value }) {
        e.preventDefault();
        this.setState({ rating: value });
    }

    onCommentChange(e) {
        e.preventDefault();
        this.setState({ comment: e.target.value });
    }

    submitRating(e) {
        e.preventDefault();
        const rating = {
            search_feedback_id: this.props.params.feedbackID,
            student_rating: this.state.rating,
            initial_comment: this.state.comment,
            feedback_status: 'Awaiting Advisor'
        }
        this.props.actions.postFeedbackPrompt(rating);
    }

    componentWillMount() {
        this.props.actions.getFeedbacks();
    }

    componentWillReceiveProps(props) {
        if (props.data) {
            let prompt = props.data.find((feedback) => {
                return feedback.feedback_id == this.props.params.feedbackID;
            })
            this.setState({ prompt: prompt.feedback_prompt });
        }
    }

    render() {
        const { rating } = this.state;
        return (
            <Container text textAlign='center'>
                <Header as='h2'>
                    {
                        this.state.prompt == '' ?
                        'Loading...'
                        :
                        this.state.prompt
                    }
                </Header>
                <Form>
                    <Form.TextArea
                        placeholder='Example: "Thank you for the advising help!"'
                        onChange={this.onCommentChange}/>
                    <Container textAlign='center'>
                        <Form.Group inline>
                            <Form.Radio
                                label='Bad'
                                value='1'
                                checked={rating === '1'}
                                onChange={this.selectRating} />
                            <Form.Radio
                                label='OK'
                                value='2'
                                checked={rating === '2'}
                                onChange={this.selectRating} />
                            <Form.Radio
                                label='Great'
                                value='3'
                                checked={rating === '3'}
                                onChange={this.selectRating} />
                        </Form.Group>
                        <Form.Button
                            onClick={this.submitRating}>
                            Submit
                        </Form.Button>
                    </Container>
                </Form>
        </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.feedback.feedbacks,
        isFetching: state.feedback.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackPrompt);
export { FeedbackPrompt as FeedbackPromptNotConnected };
