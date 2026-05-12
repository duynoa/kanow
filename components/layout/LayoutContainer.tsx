'use client';

import { CustomDataPolicy } from '@/custom/CustomData';
import { useAuth } from '@/hooks/useAuth';
import {
  useDataDetailCar,
  useDataInfoRentalCar,
  useDataListCarAutonomous,
  useDataListCarsDriver,
  useDataPolicy,
} from '@/hooks/useDataQueryKey';
import { useGeneralKey } from '@/hooks/useGeneralKey';
import { useNotification } from '@/hooks/useNotification';
import {
  useDialogAddress,
  useDialogPayment,
  useDialogRegisterOwnerDriver,
  useDialogRequestCarRental,
  useDialogReviewCar,
  useDialogRouteAddress,
} from '@/hooks/useOpenDialog';
import { useResize } from '@/hooks/useResize';
import useAuthenticationAPI from '@/services/auth/auth.services';
import { getDataPolicy } from '@/services/cars/policy.services';
import useGoogleApi from '@/services/filter/google/google.services';
import { useDialogStore } from '@/stores/dialogStores';
import { useDrawerStore } from '@/stores/drawerStores';
import '@/styles/globals.scss';
import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';
import React, { Suspense, useEffect } from 'react';


import 'swiper/css/bundle';



// ── QueryClient singleton ──────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// ── Lazy-loaded components ────────────────────────────────────────────
const AOSInitializer = dynamic(() => import('@/components/init/AOSInitializer'), { ssr: false });
const PusherProvider = dynamic(() => import('@/components/providers/PusherProvider'), { ssr: false });
const GoogleOAuthWrapper = dynamic(() => import('@/components/providers/GoogleOAuthWrapper'), { ssr: false });
const AlertCancel = dynamic(() => import('@/components/alert/AlertCancel'), { ssr: false });
const AlertDialogCustom = dynamic(() => import('@/components/alert/AlertDialogCustom'), { ssr: false });
const AlertDialogLogout = dynamic(() => import('@/components/alert/AlertDialogLogout'), { ssr: false });
const DialogAnswerPolicy = dynamic(() => import('@/components/modals/DialogAnswerPolicy').then((m) => m.DialogAnswerPolicy), { ssr: false });
const DialogCalendar = dynamic(() => import('@/components/modals/DialogCalendar').then((m) => m.DialogCalendar), { ssr: false });
const DialogCancelCar = dynamic(() => import('@/components/modals/DialogCancelCar').then((m) => m.DialogCancelCar), { ssr: false });
const DialogFilterAddress = dynamic(() => import('@/components/modals/DialogFilterAddress'), { ssr: false });
const DialogFilterListCars = dynamic(() => import('@/components/modals/DialogFilterListCars'), { ssr: false });
const DialogFilterMyCar = dynamic(() => import('@/components/modals/DialogFilterMyCar'), { ssr: false });
const DialogLogin = dynamic(() => import('@/components/modals/DialogLogin').then((m) => m.DialogLogin), { ssr: false });
const DialogPromotions = dynamic(() => import('@/components/modals/DialogPromotions').then((m) => m.DialogPromotions), { ssr: false });
const DialogRegisterOwnerDriver = dynamic(() => import('@/components/modals/DialogRegisterOwnerDriver').then((m) => m.DialogRegisterOwnerDriver), { ssr: false });
const DialogReportCar = dynamic(() => import('@/components/modals/DialogReportCar').then((m) => m.DialogReportCar), { ssr: false });
const DialogRequestCarRental = dynamic(() => import('@/components/modals/DialogRequestCarRental').then((m) => m.DialogRequestCarRental), { ssr: false });
const DialogReviewImage = dynamic(() => import('@/components/modals/DialogReviewImage').then((m) => m.DialogReviewImage), { ssr: false });
const DialogValidate = dynamic(() => import('@/components/modals/DialogValidate').then((m) => m.DialogValidate), { ssr: false });
const DialogNotification = dynamic(() => import('@/components/modals/DialogNotification').then((m) => m.DialogNotification), { ssr: false });
const DialogPayment = dynamic(() => import('@/components/modals/DialogPayment').then((m) => m.DialogPayment), { ssr: false });
const DialogRouteAddress = dynamic(() => import('@/components/modals/DialogRouteAddress'), { ssr: false });
const DialogSubmit = dynamic(() => import('@/components/modals/DialogSubmit').then((m) => m.DialogSubmit), { ssr: false });
const DialogViettelPayPromotion = dynamic(() => import('@/components/modals/DialogViettelPayPromotion'), { ssr: false });
const DrawerCustom = dynamic(() => import('@/components/drawer/DrawerCustom'), { ssr: false });
const ButtonToTop = dynamic(() => import('@/components/button/ButtonToTop'), { ssr: false });
const ButtonDownloadApp = dynamic(() => import('@/components/button/ButtonDownloadApp'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });
const Header = dynamic(() => import('@/components/layout/Header'), { ssr: false });
const Toaster = dynamic(() => import('react-hot-toast').then((m) => m.Toaster), { ssr: false });

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { openDrawer } = useDrawerStore();
  const { getKeySettings } = useAuthenticationAPI();
  const { apiGetCurrentPosition } = useGoogleApi();
  const { informationUser, setInformationUser } = useAuth();
  const { generalKey, setGeneralKey } = useGeneralKey();
  const { isStateInfoRentalCar, queryKeyIsStateInfoRentalCar } = useDataInfoRentalCar();
  const {
    openDialogAddress,
    valueAddressPickup,
    valueAddressDestination,
    indexAddressDestination,
    setValueAddressPickup,
    setValueAddressDestination,
    setCoordinates,
  } = useDialogAddress();
  const { isStateNotification, queryKeyIsStateNotification } = useNotification();
  const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar();
  const { setValueTwoAddress } = useDialogRouteAddress();
  const { openDialogRegisterOwnerDriver } = useDialogRegisterOwnerDriver();
  const { isStateListCarAutonomous, queryKeyIsStateListCarAutonomous } = useDataListCarAutonomous();
  const { isStateListCarsDriver, queryKeyIsStateListCarsDriver } = useDataListCarsDriver();
  const { queryKeyIsStatePolicy } = useDataPolicy();
  const { isVisibleMobile, isVisibleTablet, onResizeMobile, onResizeTablet, onCloseResizeMobile, onCloseResizeTablet } = useResize();
  const { openDialogReviewCar, setOpenDialogReviewCar } = useDialogReviewCar();
  const { openDialogCustom } = useDialogStore();
  const { openDialogRequestCarRental } = useDialogRequestCarRental();
  const { openDialogPayment } = useDialogPayment();

  const currentTime = new Date();
  const expirationTime = new Date(currentTime.getTime() + 30 * 60 * 1000);

  const InitialCoordinates = {
    latCurrent: 0,
    lngCurrent: 0,
    lat: 0,
    lng: 0,
    latTo: 0,
    lngTo: 0,
  };

  // ── Lazy load: Gọi API policy + key settings sau khi hydration ──
  useEffect(() => {
    const fetchDataPolicy = async () => {
      try {
        const { data } = await getDataPolicy();
        if (data) {
          let { customDataPolicy } = CustomDataPolicy(data);
          queryKeyIsStatePolicy({ dataPolicy: customDataPolicy });
        }
      } catch (e) {
        console.error('fetchDataPolicy error:', e);
      }
    };

    const fetchKeyApi = async () => {
      try {
        const { data } = await getKeySettings();
        if (data) {
          setGeneralKey(data);
        }
      } catch (e) {
        console.error('fetchKeyApi error:', e);
      }
    };

    fetchKeyApi();
    fetchDataPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAddressLocalStorage = async () => {
    const savedCoordinates = Cookies.get('coordinates');

    if (!savedCoordinates) return;

    const parseCoordinates = JSON.parse(savedCoordinates);

    const dataParamsPickup = {
      key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
      location: `${parseCoordinates.lat},${parseCoordinates.lng}`,
      address: '',
      viewbox: '',
    };

    const dataParamsDestination = {
      key: process.env.NEXT_PUBLIC_REACT_API_GOOGLE_API_MAP4D,
      location: `${parseCoordinates.latTo},${parseCoordinates.lngTo}`,
      address: '',
      viewbox: '',
    };

    if (pathname.startsWith('/list-cars-autonomous')) {
      if (parseCoordinates.lat && parseCoordinates.lng) {
        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup);
        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
          const address = dataPickup.result[0].address;
          const location = dataPickup.result[0].location;
          setValueAddressPickup(address);
          setCoordinates({ ...parseCoordinates, lat: location.lat, lng: location.lng });
        }
      }
    } else if (pathname.startsWith('/list-cars-driver')) {
      if (parseCoordinates.lat && parseCoordinates.lng && parseCoordinates.latTo && parseCoordinates.lngTo) {
        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup);
        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination);
        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result && dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
          const addressPickup = dataPickup.result[0].address;
          const locationPickup = dataPickup.result[0].location;
          const addressDestination = dataDestination.result[0].address;
          const locationDestination = dataDestination.result[0].location;
          const updatedAddressDestination = [...valueAddressDestination];
          updatedAddressDestination[indexAddressDestination] = {
            id: valueAddressDestination[indexAddressDestination].id,
            valueAddress: addressDestination || '',
          };
          setValueAddressPickup(addressPickup);
          setValueAddressDestination(updatedAddressDestination);
          setCoordinates({ ...parseCoordinates, lat: locationPickup.lat, lng: locationPickup.lng, latTo: locationDestination.lat, lngTo: locationDestination.lng });
          setValueTwoAddress(`${dataPickup.result[0].name} - ${dataDestination.result[0].name}`);
        }
      } else if (parseCoordinates.lat && parseCoordinates.lng) {
        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup);
        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
          const address = dataPickup.result[0].address;
          const location = dataPickup.result[0].location;
          setValueAddressPickup(address);
          setCoordinates({ ...parseCoordinates, lat: location.lat, lng: location.lng });
        }
      } else if (parseCoordinates.latTo && parseCoordinates.lngTo) {
        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination);
        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
          const address = dataDestination.result[0].address;
          const location = dataDestination.result[0].location;
          const updatedAddressDestination = [...valueAddressDestination];
          updatedAddressDestination[indexAddressDestination] = {
            id: valueAddressDestination[indexAddressDestination].id,
            valueAddress: address || '',
          };
          setValueAddressDestination(updatedAddressDestination);
          setCoordinates({ ...parseCoordinates, latTo: location.lat, lngTo: location.lng });
        }
      }
    } else if (pathname.startsWith('/detail-car')) {
      if (parseCoordinates.lat && parseCoordinates.lng && parseCoordinates.latTo && parseCoordinates.lngTo) {
        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup);
        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination);
        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result && dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
          const addressPickup = dataPickup.result[0].address;
          const locationPickup = dataPickup.result[0].location;
          const addressDestination = dataDestination.result[0].address;
          const locationDestination = dataDestination.result[0].location;
          const updatedAddressDestination = [...valueAddressDestination];
          updatedAddressDestination[indexAddressDestination] = {
            id: valueAddressDestination[indexAddressDestination].id,
            valueAddress: addressDestination || '',
          };
          setValueAddressPickup(addressPickup);
          setValueAddressDestination(updatedAddressDestination);
          setCoordinates({ ...parseCoordinates, lat: locationPickup.lat, lng: locationPickup.lng, latTo: locationDestination.lat, lngTo: locationDestination.lng });
          setValueTwoAddress(`${dataPickup.result[0].name} - ${dataDestination.result[0].name}`);
        }
      } else if (parseCoordinates.lat && parseCoordinates.lng) {
        const { data: dataPickup } = await apiGetCurrentPosition(dataParamsPickup);
        if (dataPickup && dataPickup.code == 'ok' && dataPickup.result) {
          const address = dataPickup.result[0].address;
          const location = dataPickup.result[0].location;
          setValueAddressPickup(address);
          setCoordinates({ ...parseCoordinates, lat: location.lat, lng: location.lng });
        }
      } else if (parseCoordinates.latTo && parseCoordinates.lngTo) {
        const { data: dataDestination } = await apiGetCurrentPosition(dataParamsDestination);
        if (dataDestination && dataDestination.code == 'ok' && dataDestination.result) {
          const address = dataDestination.result[0].address;
          const location = dataDestination.result[0].location;
          const updatedAddressDestination = [...valueAddressDestination];
          updatedAddressDestination[indexAddressDestination] = {
            id: valueAddressDestination[indexAddressDestination].id,
            valueAddress: address || '',
          };
          setValueAddressDestination(updatedAddressDestination);
          setCoordinates({ ...parseCoordinates, latTo: location.lat, lngTo: location.lng });
        }
      }
    } else if (pathname === '/' || pathname === '/home') {
      setCoordinates(InitialCoordinates);
      const updatedAddressDestination = [...valueAddressDestination];
      updatedAddressDestination[indexAddressDestination] = {
        id: valueAddressDestination[indexAddressDestination].id,
        valueAddress: '',
      };
      setValueAddressPickup('');
      setValueAddressDestination(updatedAddressDestination);
      Cookies.set('coordinates', JSON.stringify(InitialCoordinates), { expires: expirationTime });
    }
  };

  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!pathname.startsWith('/list-cars-autonomous') && !pathname.startsWith('/list-cars-driver')) {
      queryKeyIsStateListCarAutonomous({ ...isStateListCarAutonomous, page: 1 });
      queryKeyIsStateListCarsDriver({ ...isStateListCarsDriver, page: 1 });
    }

    if (!pathname.startsWith('/info-rental-car')) {
      setOpenDialogReviewCar(false);
    }

    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
      document.head.appendChild(meta);
    }

    if (!pathname.startsWith('/detail-car')) {
      queryKeyIsStateDetailCar({
        infoPromotion: {
          ...isStateDetailCar?.infoPromotion,
          selectPromotion: '0',
          activePromotion: null,
        },
        price: {
          ...isStateDetailCar?.price,
          total_amount: isStateDetailCar?.price?.temp_total_amount - isStateDetailCar?.dataDetailCar?.promotion?.[0]?.price_promotion,
        },
      });
    }

    scrollTop();
    fetchAddressLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        onResizeMobile();
      } else {
        onCloseResizeMobile();
      }
      if (window.innerWidth <= 768) {
        onResizeTablet();
      } else {
        onCloseResizeTablet();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisibleMobile, isVisibleTablet, onCloseResizeMobile, onCloseResizeTablet, onResizeMobile, onResizeTablet]);

  useEffect(() => {
    if (openDialogAddress || openDialogRegisterOwnerDriver) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = 'unset';
  }, [openDialogAddress, openDialogRegisterOwnerDriver]);

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthWrapper>
        <AOSInitializer />
        <PusherProvider
          generalKey={generalKey}
          informationUser={informationUser}
          onStatusChange={(status) => {
            queryKeyIsStateInfoRentalCar({
              detailRentalCar: {
                ...isStateInfoRentalCar?.detailRentalCar,
                status: {
                  ...isStateInfoRentalCar?.detailRentalCar?.status,
                  ...status,
                },
              },
              loading: {
                ...isStateInfoRentalCar.loading,
                isLoadingButton: false,
              },
            });
          }}
          onNotification={(data) => {
            const jsonData = JSON.parse(data?.json_data);
            const newData = {
              id: data.id,
              object_id: +data.object_id,
              object_type: `${data.object_type}`,
              title: data.title,
              content: data.content,
              created_at: data.created_at,
              is_read: 0,
              customer_id: informationUser?.id,
              json_data: jsonData,
            };
            setInformationUser({
              ...informationUser,
              drivingLiscense: {
                ...informationUser.drivingLiscense,
                status: jsonData?.status,
              },
            });
            const newListNotifications = [newData, ...isStateNotification.dataListNotifications];
            queryKeyIsStateNotification({ ...isStateNotification, dataListNotifications: newListNotifications });
          }}
        />
        <main className="w-full bg-[#FCFDFD]">
          <Suspense>
            {!pathname.startsWith('/vehicle-management-mobile') &&
              !pathname.startsWith('/income-statistic-mobile') &&
              !pathname.startsWith('/transaction-statement-mobile') &&
              !pathname.startsWith('/policy-mobi') && <Header />}
            <main className="overflow-hidden w-full h-full">
              {children}
              {!pathname.startsWith('/vehicle-management-mobile') &&
                !pathname.startsWith('/income-statistic-mobile') &&
                !pathname.startsWith('/transaction-statement-mobile') &&
                !pathname.startsWith('/policy-mobi') && (
                  <>
                    <ButtonToTop />
                    {isVisibleTablet && <ButtonDownloadApp />}
                  </>
                )}
              <AlertDialogLogout />
              <DialogLogin />
              <DialogCalendar />
              <DialogReviewImage />
              {openDrawer && <DrawerCustom />}
              {openDialogRequestCarRental && <DialogRequestCarRental />}

              <DialogValidate />
              <AlertCancel />
              <DialogAnswerPolicy />
              <DialogCancelCar />
              <DialogPromotions />
              <DialogViettelPayPromotion />
              <DialogReportCar />
              {openDialogAddress && <DialogFilterAddress />}
              <DialogRouteAddress />

              <AlertDialogCustom />
              <DialogSubmit />
              <DialogRegisterOwnerDriver />
              <DialogFilterMyCar />
              <DialogFilterListCars />

              <DialogNotification />

              {openDialogPayment && <DialogPayment />}
            </main>
            {pathname !== '/list-cars-autonomous' &&
              pathname !== '/list-cars-driver' &&
              !pathname.startsWith('/vehicle-management-mobile') &&
              !pathname.startsWith('/income-statistic-mobile') &&
              !pathname.startsWith('/transaction-statement-mobile') &&
              !pathname.startsWith('/transaction-statement') &&
              !pathname.startsWith('/policy-mobi') && <Footer />}
            <Toaster position="top-right" reverseOrder={false} />
          </Suspense>
        </main>
      </GoogleOAuthWrapper>
    </QueryClientProvider>
  );
};

export default LayoutContainer;
