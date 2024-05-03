import { ReactNode } from 'react';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';
import SideBar from '@/Components/SideBar';
import 'animate.css';

interface LayoutProps {
    children: ReactNode;
}

const Authenticated = ({ children }: LayoutProps) => {
    return (
        <main className="bg-slate-200">
            <div className='flex'>
                <div>
                    <SideBar/>
                </div>
                <div className='min-h-screen flex flex-1 flex-col'>
                    <Header />
                    <div className='flex-grow'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </main>
    );
}
export default Authenticated;
