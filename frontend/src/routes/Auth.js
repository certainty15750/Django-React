// import lib
import Loadable from 'react-loadable';

// import components
import LoadingComponent from '../util/Loader/Loader';

export default [
  {
    path: '/login',
    exact: true,
    component: Loadable({
      loader: () => import('../containers/Login'),
      loading: LoadingComponent,
    }),
  },
  // {
  //   path: '/signup',
  //   exact: true,
  //   component: Loadable({
  //     loader: () => import('../Modules/Auth/SignUp/SignUp'),
  //     loading: LoadingComponent,
  //   }),
  // }
]
