import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:roomId" component={Room} />
          <Route path="/admin/rooms/:roomId" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
