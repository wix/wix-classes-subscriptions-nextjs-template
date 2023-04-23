import MyAccountMenu from '@app/components/MyAccount/MyAccountMenu';
import React from 'react';
import LoginAvatar from '@app/components/Layout/NavBar/LoginAvatar';

export default function MyAccountSection({
  children,
}: React.PropsWithChildren) {
  return (
    <div className="max-w-full-content mx-auto flex flex-col md:flex-row gap-6 py-12 px-6">
      <div className="min-w-[250px] flex flex-col gap-6">
        <div className="w-full bg-gray-c2 p-6 flex md:flex-col items-center gap-4">
          <div className="w-10 h-10 md:w-20 md:h-20">
            <LoginAvatar width="100%" height="100%" className="fill-gray-200" />
          </div>
          <div className="whitespace-nowrap font-open-sans-condensed text-sm">
            username (TODO)
          </div>
        </div>
        <div className="w-full bg-gray-c2 p-6">
          <MyAccountMenu />
        </div>
      </div>
      <div className="bg-gray-c2 h-full grow p-6">{children}</div>
    </div>
  );
}
