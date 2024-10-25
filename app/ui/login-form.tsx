'use client'
import { roboto } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
	AtSymbolIcon,
	ExclamationCircleIcon,
	KeyIcon,
} from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { Button } from './button';

export default function LoginForm() {

	const { register, handleSubmit } = useForm();
	const { signIn, error } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSignIn(data: any) {
		setIsLoading(true);
		const response = await signIn(data);
		setIsLoading(false);
	}

	return (
		<form onSubmit={handleSubmit(handleSignIn)} className="space-y-3">
			<div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
				<h1 className={`${roboto.className} mb-3 text-2xl`}>
					Login
				</h1>
				<div className="w-full">
					<div>
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="email"
						>
							Email
						</label>
						<div className="relative">
							<input
								{...register('email')}
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Informe seu email ou username"
								required
							/>
							<AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
					<div className="mt-4">
						<label
							className="mb-3 mt-5 block text-xs font-medium text-gray-900"
							htmlFor="password"
						>
							Senha
						</label>
						<div className="relative">
							<input
								{...register('password')}
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type="password"
								name="password"
								placeholder="Informe sua senha"
								required
								minLength={6}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				<Button className="mt-4 w-full bg-color-shop text-color-shop" disabled={isLoading}>
					{
						(!isLoading)
							?
							<>
								Log in
								<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
							</>
							:
							<>
								Aguarde ...
							</>
					}
				</Button>
			</div>
			{(error) &&
				<div className='flex box-error rounded-lg bg-gray-50 p-2'>
					<ExclamationCircleIcon className="h-5 w-5 text-red-500" />
					<p>{error.message}</p>
				</div>
			}
		</form>
	);
}
