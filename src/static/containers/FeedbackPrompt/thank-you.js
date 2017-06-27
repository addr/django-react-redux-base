import React from 'react';
import { Container, Header } from 'semantic-ui-react';

class ThankYouView extends React.Component {
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2'>Thank You!</Header>
                <a>See your feedback history.</a>
            </Container>
        )
    }
}

export default ThankYouView;
