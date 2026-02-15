import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col lg:max-w-5xl">

                        {/* Hero Section */}
                        <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center lg:py-12">

                            {/* Badge */}
                            <div className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Sistem Manajemen Organisasi Modern
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-3">
                                <h1 className="text-4xl font-bold tracking-tight text-[#1b1b18] lg:text-5xl dark:text-[#EDEDEC]">
                                    Mini Project Kelola Organisasi
                                    <span className="block text-green-600 dark:text-green-400">Lebih Mudah & Efisien</span>
                                </h1>
                                <p className="mx-auto max-w-2xl text-base text-gray-600 lg:text-lg dark:text-gray-400">
                                    Platform all-in-one untuk mengelola kegiatan masjid, jamaah, keuangan,
                                    dan administrasi dengan sistem yang terintegrasi dan mudah digunakan.
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                >
                                    {auth.user ? 'Buka Dashboard' : 'Mulai Sekarang'}
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex items-center justify-center rounded-md border border-[#19140035] px-6 py-3 text-sm font-medium text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Lihat Fitur
                                </a>
                            </div>

                            {/* Features Grid */}
                            <div id="features" className="grid w-full grid-cols-1 gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:pt-12">

                                {/* Feature 1 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-green-100 p-2.5 dark:bg-green-950">
                                        <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Manajemen Jamaah
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Database lengkap jamaah dengan sistem absensi dan tracking kehadiran digital
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-2.5 dark:bg-blue-950">
                                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Jadwal Kegiatan
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Atur jadwal kajian, pengajian, dan kegiatan masjid dengan reminder otomatis
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-purple-100 p-2.5 dark:bg-purple-950">
                                        <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Laporan Keuangan
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Pencatatan infaq, sedekah, dan pengeluaran dengan laporan transparan
                                    </p>
                                </div>

                                {/* Feature 4 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-orange-100 p-2.5 dark:bg-orange-950">
                                        <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Dokumentasi Digital
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Simpan dan kelola dokumen, surat, dan arsip masjid secara digital
                                    </p>
                                </div>

                                {/* Feature 5 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-red-100 p-2.5 dark:bg-red-950">
                                        <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Keamanan Data
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Sistem enkripsi dan backup otomatis untuk melindungi data organisasi
                                    </p>
                                </div>

                                {/* Feature 6 */}
                                <div className="rounded-xl border border-[#19140035] bg-white p-5 transition-shadow hover:shadow-md dark:border-[#3E3E3A] dark:bg-[#1a1a1a]">
                                    <div className="mb-3 inline-flex rounded-lg bg-teal-100 p-2.5 dark:bg-teal-950">
                                        <svg className="h-5 w-5 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-base font-semibold text-[#1b1b18] dark:text-[#EDEDEC]">
                                        Akses Real-time
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Akses dari mana saja melalui web dan mobile untuk kemudahan pengurus
                                    </p>
                                </div>

                            </div>

                            {/* Stats Section */}
                            <div className="grid w-full grid-cols-2 gap-4 rounded-xl border border-[#19140035] bg-gradient-to-br from-green-50 to-emerald-50 p-6 lg:grid-cols-4 dark:border-[#3E3E3A] dark:from-green-950 dark:to-emerald-950">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 lg:text-3xl dark:text-green-400">500+</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Masjid Terdaftar</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 lg:text-3xl dark:text-green-400">10K+</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Pengguna Aktif</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 lg:text-3xl dark:text-green-400">99.9%</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 lg:text-3xl dark:text-green-400">24/7</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Support</div>
                                </div>
                            </div>

                            {/* CTA Bottom */}
                            <div className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-center text-white dark:from-green-700 dark:to-emerald-700">
                                <h2 className="mb-3 text-xl font-bold lg:text-2xl">
                                    Siap Modernisasi Manajemen Masjid Anda?
                                </h2>
                                <p className="mb-5 text-sm opacity-90 lg:text-base">
                                    Bergabunglah dengan ratusan masjid yang sudah merasakan kemudahan mengelola organisasi takmir
                                </p>
                                <Link
                                    href={auth.user ? dashboard() : register()}
                                    className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-green-600 hover:bg-gray-100"
                                >
                                    {auth.user ? 'Buka Dashboard' : 'Daftar Gratis Sekarang'}
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                        </div>

                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}