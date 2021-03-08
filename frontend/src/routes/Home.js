// import lib
import Loadable from 'react-loadable';

// import components
import LoadingComponent from '../util/Loader/Loader';

export default [
  {
    path: '/',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('../containers/TaskPage'),
      loading: LoadingComponent,
    }),
  }
]
