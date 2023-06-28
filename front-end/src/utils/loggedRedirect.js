const loggedRedirect = (history) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    if (user.role === 'customer') {
      history.push('/customer/products');
    } else if (user.role === 'administrator') {
      history.push('/admin/manage');
    } else if (user.role === 'seller') {
      history.push('/seller/orders');
    }
  }
};

export default loggedRedirect;
