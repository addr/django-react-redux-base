import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, NotFoundView, FeedbackView, CommentView, FeedbackPrompt, ThankYouView } from './containers';
import requireAuthentication from './utils/requireAuthentication';

// export default(
//     <Route path="/" component={App}>
//         <IndexRoute component={HomeView} />
//         <Route path="login" component={LoginView} />
//         <Route path="protected" component={requireAuthentication(ProtectedView)} />
//         <Route path="*" component={NotFoundView} />
//     </Route>
// );

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomeView} />
        <Route path="login" component={LoginView} />
        <Route path="/feedback" component={requireAuthentication(FeedbackView)} />
        <Route path="/feedback/:feedbackID/comments" component={requireAuthentication(CommentView)} />
        <Route path="/feedback/:feedbackID/feedback-prompt" component={requireAuthentication(FeedbackPrompt)} />
        <Route path="/feedback/:feedbackID/thank-you" component={requireAuthentication(ThankYouView)} />
        <Route path="*" component={NotFoundView} />
    </Route>
)
