import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import UploadLetterPage from './pages/UploadLetterPage';
import ViewSharedLetterPage from './pages/ViewSharedLetterPage';
import AppLayout from './components/AppLayout';

const rootRoute = createRootRoute({
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: UploadLetterPage,
});

const viewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/view/$id',
  component: ViewSharedLetterPage,
});

const routeTree = rootRoute.addChildren([indexRoute, viewRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
