import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import css from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={css.container}>
      <Header />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
