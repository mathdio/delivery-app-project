const loginRedirect = (history) => {
  if (!localStorage.getItem('user')) {
    history.push('/login');
  }
};

export default loginRedirect;
