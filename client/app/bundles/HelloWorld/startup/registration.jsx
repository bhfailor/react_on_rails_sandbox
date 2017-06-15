import ReactOnRails from 'react-on-rails';

import HelloWorld from '../components/HelloWorld';
import Container from '../components/Container';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Container,
});
