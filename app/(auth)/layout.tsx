const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 md:w-3/5">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-center items-center">
                {/* this is rive */}
              </div>
              <div className=""></div>
            </div>
          </div>
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