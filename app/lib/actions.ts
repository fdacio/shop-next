'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  
  try {
    
    const response = await signIn('credentials', formData);

  } catch (error) {

    if (error instanceof AuthError) {
      return error.cause;
    }

    throw error;

  }

}
