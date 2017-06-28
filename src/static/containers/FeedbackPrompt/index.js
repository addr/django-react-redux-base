import React from 'react';
import { Divider, Segment, Image, Form, Container, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';

// images
import * as veryGoodDefault from '../../images/smile/Very Good Default.png';
import * as veryGoodNotSelected from '../../images/smile/Very Good Not Selected.png';
import * as veryGoodSelected from '../../images/smile/Very Good Selected.png';
import * as goodDefault from '../../images/smile/Good Default.png';
import * as goodNotSelected from '../../images/smile/Good Not Selected.png';
import * as goodSelected from '../../images/smile/Good Selected.png';
import * as okayDefault from '../../images/smile/Okay Default.png';
import * as okayNotSelected from '../../images/smile/Okay Not Selected.png';
import * as okaySelected from '../../images/smile/Okay Selected.png';
import * as poorDefault from '../../images/smile/Poor Default.png';
import * as poorNotSelected from '../../images/smile/Poor Not Selected.png';
import * as poorSelected from '../../images/smile/Poor Selected.png';
import * as veryPoorDefault from '../../images/smile/Very Poor Default.png';
import * as veryPoorNotSelected from '../../images/smile/Very Poor Not Selected.png';
import * as veryPoorSelected from '../../images/smile/Very Poor Selected.png';

// const radioForm = () => (
//     <Form.Group inline>
//         <Form.Radio
//             label='Bad'
//             value='1'
//             checked={rating === '1'}
//             onChange={this.selectRating} />
//         <Form.Radio
//             label='OK'
//             value='2'
//             checked={rating === '2'}
//             onChange={this.selectRating} />
//         <Form.Radio
//             label='Great'
//             value='3'
//             checked={rating === '3'}
//             onChange={this.selectRating} />
//     </Form.Group>
//     <Form.Button
//         onClick={this.submitRating}>
//         Submit
//     </Form.Button>
// )

class FeedbackPrompt extends React.Component {
    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        token: React.PropTypes.string,
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
        this.onSmileClick = this.onSmileClick.bind(this);
    }

    selectRating(e, { value }) {
        e.preventDefault();
        this.setState({ rating: value });
    }

    onSmileClick(rating) {
        console.log(`Clicked rating ${rating}`);
        this.setState({ rating: rating });
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
                    <Image.Group size='mini'>
                        <Image src={veryGoodNotSelected.default} onClick={() => { this.onSmileClick(0)}} size='mini' inline='true' centered spaced />
                        <Image src={goodNotSelected.default} onClick={() => { this.onSmileClick(1)}} size='mini' inline='true' centered spaced />
                        <Image src={okayNotSelected.default} onClick={() => { this.onSmileClick(2)}} size='mini' inline='true' centered spaced />
                        <Image src={poorNotSelected.default} onClick={() => { this.onSmileClick(3)}} size='mini' inline='true' centered spaced />
                        <Image src={veryPoorNotSelected.default} onClick={() => { this.onSmileClick(4)}} size='mini' inline='true' centered spaced />
                    </Image.Group>
                    <p></p>
                    <Form.Button
                        onClick={this.submitRating}>
                        Submit
                    </Form.Button>
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
