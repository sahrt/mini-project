import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <AuthLayout
            title="Asallamu'alaikum wr. wb. Marih Bergabung!"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />


            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="nama_lembaga">Nama Lembaga / Masjid</Label>
                                <Input
                                    id="nama_lembaga"
                                    type="text"
                                    required
                                    tabIndex={3}
                                    autoComplete="organization"
                                    name="nama_lembaga"
                                    placeholder="Contoh: Masjid Al-Ikhlas"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError message={errors.nama_lembaga} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="no_hp">No. Handphone / WhatsApp</Label>
                                <Input
                                    id="no_hp"
                                    type="tel"
                                    required
                                    tabIndex={4}
                                    autoComplete="tel"
                                    name="no_hp"
                                    placeholder="08xxxxxxxxxx"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError message={errors.no_hp} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm password
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    className="focus-visible:ring-green-600 dark:focus-visible:ring-green-400"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                tabIndex={7}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner className="text-white" />}
                                Create account
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={8}
                                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}