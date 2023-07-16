import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import  RankItem  from "./components/RankItem";
import { Home } from "./components/Home";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/rank-item',
    element: <RankItem />
  }
];

export default AppRoutes;
