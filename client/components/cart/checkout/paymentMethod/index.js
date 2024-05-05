import { use, useEffect, useState } from "react";
import PaymentForm from "@components/cart/checkout/paymentMethod/partials/paymentForm";
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';
import AuthTabs from '@components/auth/authMenu/partials/authTabs';

const PaymentMenu = ({handleSelectPayment}) => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  return (
    <section className="flex flex-col w-auto justify-center items-center w-96">
      {isLoggedIn ? (
       <PaymentForm />
      ) : (
        <AuthTabs />
      )}
    </section>
  );
}

export default PaymentMenu;