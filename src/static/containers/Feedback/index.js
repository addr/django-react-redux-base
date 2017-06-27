import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';
import { Segment, Label, Header, Container, Card, Icon, Image, Button, Rating } from 'semantic-ui-react'

const FeedbackCard = ({title, date, comment, student_name, rating, feedback_id, status, ...props}) =>  {
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
                        <div>
                            <Rating icon='star' defaultRating={1} maxRating={5}  />
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
                    status={feedback.feedback_status} />
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
