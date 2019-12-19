import React, { useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import CouponEditorForm from 'components/CouponEditorForm';
import { message, Layout, Card } from 'antd';
import { history } from 'app/router';
import { LoginForm } from 'components/auth/LoginForm';
import { SignupForm } from 'components/auth/SignupForm';
import { Auth } from 'components/auth/Auth';


export const AuthPage: FC = () => {
  return (
    <Layout>
      <Auth />
    </Layout>
  )
}

// const CouponCreatePage: React.FC = () => {
//   const { t } = useTranslation();
//   const [loading, setLoading] = useState(false);

//   const handleCouponSave = (values: any) => {
//     setLoading(true);
//     setTimeout(() => {
//       // TODO: integrate API.
//       console.log(values);

//       message.success(t('couponCreate.createCouponSuccess'), 10);
//       setLoading(false);
//       history.push('/');
//     }, 2000);
//   };

//   const props = {
//     handleCouponSave,
//     loading,
//     couponIsNew: true,
//   };

//   return (
//     <>
//       <CouponEditorForm {...props} />
//     </>
//   );
// };

// export default CouponCreatePage;
