import { useEffect, FormEventHandler, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthButton from '@/Components/AuthButton';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function Login() {
    const { user } = usePage().props as any;
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            {!user?.exists &&
                <div
                    className='w-10/12 md:w-1/4 flex flex-col items-center justify-center bg-white mb-4 shadow-sm rounded py-4'>
                    <h1 className=' text-red-500 mb-4 font-bold uppercase'>Não há usuários cadastrados</h1>
                    <Link
                        className='bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded shadow-sm duration-300 font-bold'
                        href={route('register')}
                    >
                        Cadastrar usuário administrador
                    </Link>
                </div>
            }
            <div className="w-10/12 md:w-1/4 p-4 bg-white shadow-sm overflow-hidden rounded">
                <div className='flex items-center justify-center py-8'>
                    <Link href="/">
                        <ApplicationLogo width="w-32" />
                    </Link>
                </div>

                <form onSubmit={submit}>
                    <div>
                        <label className='label-form' htmlFor="email">E-mail</label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <label className='label-form' htmlFor="email">Senha</label>
                        <div className="flex items-center justify-between relative">
                            <TextInput
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                } name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <div
                                className="absolute right-2 cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowPassword(
                                        (state) => !state,
                                    )
                                }
                            >
                                {showPassword ? (
                                    <IoEyeOff size={24} />
                                ) : (
                                    <IoEye size={24} />
                                )}
                            </div>
                        </div>
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ms-2 text-sm text-gray-600">Lembrar-me</span>
                        </label>
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Perdeu sua senha?
                        </Link>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <AuthButton className="" disabled={processing}>
                            Entrar
                        </AuthButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
