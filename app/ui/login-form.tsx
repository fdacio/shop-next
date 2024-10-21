'use client'
import { roboto } from '@/app/ui/fonts';
import {
	AtSymbolIcon,
	KeyIcon,
	ExclamationCircleIcon,

} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useApi, ApiMethod } from '@/app/lib/useApi'
import { Token } from '../lib/definitions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginForm() {

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { callback: doLogin, data: token, loading, error } = useApi<Token>(ApiMethod.POST, "/auth/login");
	
	const handlerLogin = async (event: any) => {
		
		event.preventDefault();

		if (doLogin == null) return;

		type Login = {
			'username': string,
			'password': string
		}

		let login: Login = {
			username: email,
			password: password
		};

		await doLogin(login);

		localStorage.setItem("token", (token != null) ? token.token : "");
		
		if (token != null) router.push('/');

	}


	return (
		<form className="space-y-3">
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
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="email"
								type="email"
								name="email"
								placeholder="Informe seu email ou username"
								required
								onChange={(event) => setEmail(event.target.value)}
								value={email}
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
								className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
								id="password"
								type="password"
								name="password"
								placeholder="Informe sua senha"
								required
								minLength={6}
								onChange={(event) => setPassword(event.target.value)}
								value={password}
							/>
							<KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
						</div>
					</div>
				</div>
				<Button className="mt-4 w-full bg-color-shop text-color-shop" onClick={handlerLogin} disabled={loading}>
					{
						(!loading)
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
					<p>{error.message}</p>
				</div>
			}
		</form>
	);
}
