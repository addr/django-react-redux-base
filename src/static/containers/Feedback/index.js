import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';
import { Header, Container, Card, Icon, Image, Button, Rating } from 'semantic-ui-react'

const FeedbackCard = ({title, date, comment, student_name, rating, ...props}) =>  {
    return (
        <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {title} ({date})
                    </Card.Header>
                    <Card.Meta>
                        {student_name}
                    </Card.Meta>
                    <Card.Description>
                        {comment}
                        <div>
                            <Rating icon='star' defaultRating={1} maxRating={5}  />
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Link to="comments">
                            <Button basic color='green'>Reply</Button>
                        </Link>
                        <Link to="comments">
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
        return (
            <div>
                { this.props.isFetching ?
                    <Container text textAlign='center'>
                        <Header as='h3'>Loading...</Header>
                    </Container>
                    :
                    <Card.Group>
                        // <FeedbackCard
                        //     title="Advising appointment feedback"
                        //     date="2017-06-26"
                        //     student_name="John Doe"
                        //     comment="My advising appointment was terrible!" />
                        // <FeedbackCard
                        //     title="Advising appointment feedback"
                        //     date="2017-05-01"
                        //     student_name="Jane Doe"
                        //     comment="My advising appointment was great!" />
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
