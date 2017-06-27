import React from 'react';
import { Form, Container, Header } from 'semantic-ui-react';

class FeedbackPrompt extends React.Component {
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2'>
                    How was your appointment?
                </Header>
                <Form>
                    <Form.TextArea
                        placeholder='Example: "Thank you for the advising help!"' />
                    <Container textAlign='center'>
                        <Form.Group inline>
                            <Form.Radio
                                label='Bad'
                                value='bd'
                                checked={false}
                                onChange={this.props.handleChange} />
                            <Form.Radio
                                label='OK'
                                value='ok'
                                checked={false}
                                onChange={this.props.handleChange} />
                            <Form.Radio
                                label='Great'
                                value='gr'
                                checked={false}
                                onChange={this.props.handleChange} />
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Container>
                </Form>
        </Container>
        )
    }
}

export default FeedbackPrompt;
