import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import RoleService from '@services/roleService';

const withAuth = (WrappedComponent, allowedRoles) => {
  const Wrapper = props => {
    const router = useRouter();
    const [role , setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchUserRole = useCallback(async () => {
      setIsLoading(true);
      try{
        const response = await RoleService.getRoleByUserId();
        if(response && response.data && response.data.role_id)
          setRole(response.data.role_id);
      }catch(e){
        console.log(e);
        setRole(null);
      }
      setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchUserRole();
    }, [fetchUserRole]);

    if(typeof window === 'undefined') return null;

    const isLoggedIn = localStorage.getItem('auth_token');

    useEffect(() => {
        if (!isLoading && (!isLoggedIn || (allowedRoles && role && !allowedRoles.includes(role)))) {
          router.replace('/');
        }
    }, [isLoggedIn, isLoading, role]);

    return (!isLoading && isLoggedIn && role &&
      (!allowedRoles || (allowedRoles && allowedRoles.includes(role)))) ?
      <WrappedComponent {...props} />
      :
      null;
  };

  return Wrapper;
};

export default withAuth;