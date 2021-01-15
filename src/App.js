import Home from "./pages/Home";
import Explore from "./pages/Explore";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from "./pages/Layout";
import Detail from "./pages/Detail";
import MyPokemon from "./pages/MyPokemon";
function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Layout>
                  <Route path="/" exact component={Home}/>
                  <Route path="/explore" component={Explore}/>
                  <Route path="/detail/:name" component={Detail}/>
                  <Route path="/my-pokemon" component={MyPokemon}/>
              </Layout>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
