import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';
import { toast } from 'react-toastify';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';

function RequireAuth({ children }) {
    const [user, loading] = useAuthState(auth);
    const [
        sendEmailVerification,
        sending,
        error
    ] = useSendEmailVerification(auth);
    const location = useLocation();

    const handleVerificationCode = async () => {
        await sendEmailVerification();
        toast.success(`verification sent to email to ${user.email}`);
    }

    if (loading || sending) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
        return (
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm mx-auto text-center'>
                    <h2 className='mb-2 text-red-600 text-xl'>Your Email not Verified</h2>
                    {(error) && <>
                        <div className="alert alert-error shadow-lg my-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{error.message}</span>
                            </div>
                        </div>
                    </>}
                    <h3 className='mb-2 text-green-600'>Please verified your email</h3>
                    <button type="button" className="text-white bg-green-700 hover:bg-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hover:text-green-600 border" onClick={handleVerificationCode}>Send Verification Email Again</button>
                </div>
            </div>
        );
    }

    return children;
}

export default RequireAuth;