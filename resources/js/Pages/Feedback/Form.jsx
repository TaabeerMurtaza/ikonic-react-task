import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import Dropdown from '@/Components/Dropdown';
import { Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Form({ auth }) {

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm();

    const submit = (e) => {
        e.preventDefault();

        patch(route('feedback.submit'));
    };
    const className = "tm_feedback_form"

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 dark:text-gray-200 leading-tight mb-4">Feedback Form</h2>}
        >
            <Head title="Feedback" />
            <div className="container mt-4">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <section className={className}>
                        <header>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Update your account's profile information and email address.
                            </p>
                        </header>

                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="title"
                                />

                                <InputError className="mt-2" message={errors.title} />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />

                                <TextArea
                                    id="description"
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="description"
                                    />

                                <InputError className="mt-2" message={errors.description} />
                            </div>

                            <div>
                                <InputLabel htmlFor="category" value="Category" />
                                <select
                                required
                                onChange={(e) => setData('category', e.target.value)}
                                 className={'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm '} >
                                    <option value="">Select Option</option>
                                    <option>Bug Report</option>
                                    <option>Feature Request</option>
                                    <option>Improvement</option>
                                </select>

                                <InputError className="mt-2" message={errors.category} />
                            </div>


                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                                </Transition>
                            </div>
                        </form>
                    </section>
                </div>

            </div>
        </AuthenticatedLayout>
        // 

    );
}