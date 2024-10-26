import { redirectRoot } from '../auth-redirects';
export default async function Logout() { 

    await redirectRoot(); 

}