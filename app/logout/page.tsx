import { redirectRoot } from '../lib/api/requests/auth-redirects';
export default async function Logout() { 

    await redirectRoot(); 

}