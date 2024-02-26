import TicTac from './component/ticTac';

function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <header className="App-header">
        <TicTac />
      </header>
    </div>
  );
}

export default App;
