import { Outlet } from 'react-router-dom';
import { Footer, Header } from './components/index.js';


function Layout() {
    const navItems = [
        { id: 1, name: 'View Items', link: '/' },
        { id: 2, name: 'Add Items', link: '/add-items' }
    ];

    return (
        <div>
            <Header navItems={navItems} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}


export default Layout;