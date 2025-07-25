/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Navigator from './src/routers/StackNavigation';
import { Provider as PaperProvider } from 'react-native-paper';

function App() {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
}

export default App;
