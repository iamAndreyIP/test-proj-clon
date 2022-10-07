import NotfoundPage from './src/pages/404Page/notFoundPage';
import ServerErrorPage from './src/pages/500Page/serverErrorPage';
import ChatPage from './src/pages/chatPage/chatPage';
import LoginPageNew from './src/pages/loginPage/loginPage2';
import RegistrationPageNew from './src/pages/registrationPage/registrationPage2';
import ProfilePage from './src/pages/profilePage/profilePage';
import Router from './src/utils/Router';
import store from './src/utils/store';
import AuthController from './src/controllers/authcontroller';

export const router = new Router();

//@ts-ignorets ignore
window.store = store;

document.addEventListener('DOMContentLoaded', () => {
  router
    .use('/', LoginPageNew)
    .use('/signup', RegistrationPageNew)
    .use('/messenger', ChatPage)
    .use('/profile', ProfilePage)
    .use('/500', ServerErrorPage)
    .use('*', NotfoundPage);

  let login = localStorage.getItem('login');
  let isProtected = true;

  switch (window.location.pathname) {
    case '/':
    case '/signup':
      isProtected = false;
      break;
  }

  if (login) {
    AuthController.fetchUser();

    router.start();
    if (!isProtected) {
      router.go('/messenger');
    }
  } else {
    router.start();

    router.go('/');
  }
});
