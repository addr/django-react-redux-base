import React from 'react';
import { Link } from 'react-router';
import { Card, Icon, Image, Button, Rating } from 'semantic-ui-react'

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

    render() {
        return (
            <Card.Group>
                <FeedbackCard
                    title="Advising appointment feedback"
                    date="2017-06-26"
                    student_name="John Doe"
                    comment="My advising appointment was terrible!" />
                <FeedbackCard
                    title="Advising appointment feedback"
                    date="2017-05-01"
                    student_name="Jane Doe"
                    comment="My advising appointment was great!" />
            </Card.Group>
        )
        // return (
        //     <Card.Group>
        //         <Card fluid>
        //             <Card.Content>
        //                 <Card.Header>
        //                     Matthew
        //                 </Card.Header>
        //                 <Card.Meta>
        //                     <span className='date'>
        //                         Joined in 2015
        //                     </span>
        //                 </Card.Meta>
        //                 <Card.Description>
        //                     Matthew is a musician living in Nashville.
        //                 </Card.Description>
        //             </Card.Content>
        //             <Card.Content extra>
        //                 <a>
        //                     <Icon name='user' />
        //                 22 Friends
        //                 </a>
        //             </Card.Content>
        //         </Card>
        //     </Card.Group>
        // )
    }
}

export default FeedbackView;
