import AppRouter from './routes/AppRouter';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppRouter />
    </div>
  );
}

export default App;