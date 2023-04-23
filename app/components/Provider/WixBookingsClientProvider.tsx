'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, createContext } from 'react';
import { WixSession } from '@app/model/auth/auth';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import { getBrowserWixClient } from '@app/model/auth/wix-client.browser';

const queryClient = new QueryClient();

export const WixSessionContext = createContext<WixSession | null>(null);

const theme: CustomFlowbiteTheme = {
  checkbox: {
    root: {
      base: 'bg-gray-c2 text-gray-c1 !ring-stone-400 !ring-offset-stone-300',
    },
  },
  dropdown: {
    floating: {
      style: {
        auto: 'bg-gray-c2 min-w-fit -ml-4',
      },
    },
  },
};

export const WixBookingsClientProvider = ({
  children,
}: PropsWithChildren<{}>) => (
  <Flowbite theme={{ theme, dark: true }}>
    <WixSessionContext.Provider value={{ wixClient: getBrowserWixClient() }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WixSessionContext.Provider>
  </Flowbite>
);
