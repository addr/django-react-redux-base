import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, NotFoundView, FeedbackView, CommentView } from './containers';
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
        <IndexRoute component={FeedbackView} />
        <Route path="comments" component={CommentView} />
        <Route path="*" component={NotFoundView} />
    </Route>
)
