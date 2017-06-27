import React from 'react';
import { Link } from 'react-router';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

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
}

class CommentView extends React.Component {
    render() {
        return (
            <div>
                <Header as='h3' dividing>Comments</Header>
                <Comment.Group>
                    <FeedbackComment
                        author="John Q. Professor"
                        commentText="You need to try harder"
                        commentDate="May 12, 2017" />
                    <FeedbackComment
                        author="Angry Student"
                        commentText="You need to teach better"
                        commentDate="May 13, 2017" />
                    <Form reply>
                        <Form.TextArea />
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            primary />
                    </Form>
                </Comment.Group>
            </div>
        )
    }
}

export default CommentView;
