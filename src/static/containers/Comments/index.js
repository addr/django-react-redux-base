import React from 'react';
import { Link } from 'react-router';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/feedback';

const FeedbackComment = ({author, commentText, commentDate}) => {
    return (
        <Comment>
            <Comment.Content>
                <Comment.Author as='a'>
                    {author}
                </Comment.Author>
                <Comment.Metadata>
                    <div>
                        {commentDate}
                    </div>
                </Comment.Metadata>
                <Comment.Text>
                    {commentText}
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
};

class CommentView extends React.Component {
    static propTypes = {
        isFetching: React.PropTypes.bool.isRequired,
        data: React.PropTypes.array,
        token: React.PropTypes.string,
        isAuthenticated: React.PropTypes.bool,
        actions: React.PropTypes.shape({
            getComments: React.PropTypes.func.isRequired,
            postComment: React.PropTypes.func.isRequired
        }).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
        this.addComment = this.addComment.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    componentWillMount() {
        this.props.actions.getComments(this.props.params.feedbackID);
    }

    addComment(e) {
        e.preventDefault();
        const token = this.props.token;
        console.log(`Token: ${token}`);
        const commentObject = {
            feedback_id: this.props.params.feedbackID,
            comment: this.state.comment,
            author_id: 1,
            author_name: 'John Q. Professor',
        };
        this.props.actions.postComment(commentObject, token);
    }

    onTextChange(e) {
        e.preventDefault();
        if (e) {
            this.setState({ comment: e.target.value })
        }
    }

    render() {
        let comments = this.props.data;
        if (comments) {
            comments = this.props.data.map(comment => (
                <FeedbackComment
                    author={comment.author_name}
                    commentText={comment.comment}
                    commentDate={comment.time_stamp} />
            ));
        }
        return (
            <div>
                <Header as='h3' dividing>Comments</Header>
                { this.props.isFetching ?
                    <p>Loading...</p>
                    :
                    <Comment.Group>
                        {comments}
                        <Form reply>
                            <Form.TextArea
                                onChange={this.onTextChange}/>
                            <Button
                                content='Add Reply'
                                labelPosition='left'
                                icon='edit'
                                onClick={this.addComment}
                                primary />
                        </Form>
                    </Comment.Group>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.feedback.comments,
        isFetching: state.feedback.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);
export { CommentView as CommentViewNotConnected };
