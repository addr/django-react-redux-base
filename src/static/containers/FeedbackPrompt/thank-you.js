import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router';

class ThankYouView extends React.Component {
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2'>Thank You!</Header>
            <Link to='/feedback'>
                <a>See your feedback history.</a>
            </Link>
            </Container>
        )
    }
}

export default ThankYouView;
