import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';
import { Segment, Label, Header, Container, Card, Icon, Image, Button, Rating } from 'semantic-ui-react'

import * as veryGoodDefault from '../../images/smile/Very Good Default.png';
import * as goodDefault from '../../images/smile/Good Default.png';
import * as okayDefault from '../../images/smile/Okay Default.png';
import * as poorDefault from '../../images/smile/Poor Default.png';
import * as veryPoorDefault from '../../images/smile/Very Poor Default.png';

const FeedbackCard = ({title, date, comment, student_name, rating, feedback_id, status, ...props}) =>  {
    let returnSrc = veryGoodDefault.default;
    switch (rating) {
        case 4:
        returnSrc = veryGoodDefault.default;
        break;
        case 3:
        returnSrc = goodDefault.default;
        break;
        case 2:
        returnSrc = okayDefault.default;
        break;
        case 1:
        returnSrc = poorDefault.default;
        break;
        case 0:
        returnSrc = veryPoorDefault.default;
        break;
        default:
        returnSrc = okayDefault.default;
        break;
    }
    return (
        <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Label as='a' color='orange' ribbon='right'>{status}</Label>
                        {title} ({date})
                    </Card.Header>
                    <Card.Meta>
                        {student_name}
                    </Card.Meta>
                    <Card.Description>
                        {comment !== 'Initial Comment' ?
                            comment
                        :
                            'Awaiting student feedback...'
                        }
                        <p></p>
                        <div>
                            <Image src={returnSrc} size='mini' centered />
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Link to={`/feedback/${feedback_id}/comments`}>
                            <Button basic color='green'>Reply</Button>
                        </Link>
                        <Link to={`/feedback/${feedback_id}/comments`}>
                            <Button basic color='red'>Archive</Button>
                        </Link>
                    </div>
                </Card.Content>
            </Card>
    )
}

class FeedbackView extends React.Component {

    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.array,
        token: React.PropTypes.string,
        actions: React.PropTypes.shape({
            getFeedbacks: React.PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        this.props.actions.getFeedbacks();
    }

    render() {
        let feedbacks = this.props.data;
        if (feedbacks) {
            feedbacks = this.props.data.map(feedback => (
                <FeedbackCard
                    title={feedback.reason}
                    date={feedback.feedback_time_stamp}
                    student_name={feedback.student_name}
                    feedback_id={feedback.feedback_id}
                    comment={feedback.initial_comment}
                    status={feedback.feedback_status}
                    rating={feedback.student_rating}
                />
            ))
        }
        return (
            <div>
                { this.props.isFetching ?
                    <Container text textAlign='center'>
                        <Header as='h3'>Loading...</Header>
                    </Container>
                    :
                    <Card.Group>
                        {feedbacks}
                    </Card.Group>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackView);
export { FeedbackView as FeedbackViewNotConnected };
