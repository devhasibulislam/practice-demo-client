import React from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../shared/Loading';

const Reset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [
        sendPasswordResetEmail,
        sending,
        error
    ] = useSendPasswordResetEmail(auth);

    if (sending) {
        return <Loading />
    }

    const onSubmit = async (data) => {
        const email = data?.email;
        await sendPasswordResetEmail(email);

        toast.success(`reset info sent to ${email}`);
    };

    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
            <h1 className='text-3xl text-center text-green-600'>Reset</h1>
            {(error) && <>
                <div className="alert alert-error shadow-lg my-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{error.message}</span>
                    </div>
                </div>
            </>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='text-center'>
                    {/* segment for email */}
                    <div className="form-control w-full max-w-xs mx-auto">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid Email'
                                }
                            })}
                        />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    <input className='btn w-full max-w-xs text-white hover:text-black hover:bg-white' type="submit" value="Reset" />
                </div>
            </form>
        </div>
    );
};

export default Reset;