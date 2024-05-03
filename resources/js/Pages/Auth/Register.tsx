import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthButton from '@/Components/AuthButton';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Registrar" />
            <div className='w-10/12 md:w-1/4 p-4 bg-white shadow-sm overflow-hidden rounded'>
                <div className='flex items-center justify-center py-8'>
                    <Link href="/">
                        <ApplicationLogo width="w-32" />
                    </Link>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <label className='label-form' htmlFor="name">Nome</label>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <label className='label-form' htmlFor="email">E-mail</label>

                        <TextInput
                            id="email"
                            type="text"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <label className='label-form' htmlFor="password">Senha</label>
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
                                autoComplete="new-password"
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

                    <div className="mt-4">
                        <label className='label-form' htmlFor="password_confirmation">Confirme a senha</label>
                        <div className="flex items-center justify-between relative">
                            <TextInput
                                id="password_confirmation"
                                type={
                                    showPassword2
                                        ? "text"
                                        : "password"
                                } name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <div
                                className="absolute right-2 cursor-pointer text-gray-500"
                                onClick={() =>
                                    setShowPassword2(
                                        (state) => !state,
                                    )
                                }
                            >
                                {showPassword2 ? (
                                    <IoEyeOff size={24} />
                                ) : (
                                    <IoEye size={24} />
                                )}
                            </div>
                        </div>
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <AuthButton className="" disabled={processing}>
                            Registrar
                        </AuthButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
