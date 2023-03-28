import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';

const Header = () => (
  <>
    <header className="absolute md:fixed h-header bg-gray-c1 z-40 w-full">
      <div className="relative flex justify-center max-w-full-content mx-auto gap-8 h-header items-center">
        <NavBar />
      </div>
    </header>
    <div className="h-header"></div>
    <ScrollIntoView hashName="#top" />
  </>
);

export default Header;
