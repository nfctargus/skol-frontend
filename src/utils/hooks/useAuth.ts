import { useEffect, useState } from 'react';
import { getAuthUser } from '../api';
import { isLoggedIn, setUser } from '../store/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';


export function useAuth() {
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(true);
    const user = useSelector(isLoggedIn);
    const controller = new AbortController();

    useEffect(() => {
        getAuthUser()
        .then(({ data }) => {
            dispatch(setUser(data));
            setTimeout(() => setLoading(false), 100);
        })
        .catch((err) => {
            console.log(err);
            setTimeout(() => setLoading(false), 100);
        });

        return () => controller.abort();
    }, []);

    return { user, loading };
}
