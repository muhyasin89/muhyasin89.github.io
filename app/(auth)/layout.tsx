import { ReactNode } from "react";
import Spline from '@splinetool/react-spline/next';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative lg:flex">
          <Spline
                scene="https://prod.spline.design/DuwsOIESq4sXLszI/scene.splinecode" 
              />
        </div>
        <div className="relative hidden h-full flex-col p-8 dark:border-r lg:flex">
          <div className="h-full flex items-center justify-center bg-muted rounded-2xl">
            {children}
          </div>
        </div>
      </div>
    );
  };
  export default AuthLayout;