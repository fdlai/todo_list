import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="App">
      <div className="page">
        <div className="page__content">
          <Header />
          <Main />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
