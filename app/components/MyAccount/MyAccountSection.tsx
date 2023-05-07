import MyAccountMenu from '@app/components/MyAccount/MyAccountMenu';
import React from 'react';
import MemberAvatar from '@app/components/Login/MemberAvatar';
import { members } from '@wix/members';

export default function MyAccountSection({
  children,
  member,
}: React.PropsWithChildren & { member: members.Member | undefined }) {
  return (
    <div className="max-w-full-content mx-auto flex flex-col md:flex-row gap-6 py-12 px-6 items-stretch">
      <div className="min-w-[250px] flex flex-col gap-6">
        <div className="w-full bg-gray-c2 p-6 flex md:flex-col items-center gap-4">
          <div className="w-10 h-10 md:w-20 md:h-20 fill-gray-200">
            <MemberAvatar />
          </div>
          <div className="whitespace-nowrap font-open-sans-condensed text-sm">
            {member?.profile?.slug}
          </div>
        </div>
        <div className="w-full bg-gray-c2 p-6">
          <MyAccountMenu />
        </div>
      </div>
      <div className="bg-gray-c2 grow p-7">{children}</div>
    </div>
  );
}
