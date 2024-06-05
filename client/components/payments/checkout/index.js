import { use, useEffect, useState } from "react";
import PaymentForm from "@components/payments/checkout/partials/paymentForm";
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';
import AuthTabs from '@components/auth/authMenu/partials/authTabs';

const PaymentMenu = ({handleSelectPayment}) => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();

  return (
    <section className="flex flex-col items-center w-full overflow-scroll">
      {isLoggedIn ? (
       <PaymentForm />
      ) : (
        <AuthTabs />
      )}
    </section>
  );
}

export default PaymentMenu;