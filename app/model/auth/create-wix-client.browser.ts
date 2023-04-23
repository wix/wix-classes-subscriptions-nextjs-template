import { getWixClient } from '@app/model/auth/create-wix-client';
import Cookies from 'js-cookie';

export const getBrowserWixClient = () => getWixClient({ cookieStore: Cookies });
