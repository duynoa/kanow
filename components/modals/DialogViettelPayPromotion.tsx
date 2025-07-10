import React, { useState } from 'react';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { TbDiscount2 } from 'react-icons/tb';

import { Loader2, X } from 'lucide-react';

import { PiWarningCircleBold } from 'react-icons/pi';
import { FormatNumberDot } from '../format/FormatNumber';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { useDataDetailCar } from '@/hooks/useDataQueryKey';
import { useDialogViettelPayPromotion } from '@/hooks/useOpenDialog';
import { getPromotionVoucher } from '@/services/cars/promotion.services';
import { IInfoPromotion } from '@/types/Cars/IPromotions';
import { debounce } from 'lodash';
import { useSearchParams } from 'next/navigation';

const DialogViettelPayPromotion = () => {
  const searchParams = useSearchParams();
  const typeCarDetail = searchParams.get('type');

  const {
    dataPromotion,
    openDialogPromotion,
    isLoadingDataPromotion,
    setIsLoadingDataPromotion,
    setOpenDialogPromotion,
    setDataPromotion,
  } = useDialogViettelPayPromotion();

  const { isStateDetailCar, queryKeyIsStateDetailCar } = useDataDetailCar();
  const [expirationMessage, setExpirationMessage] = useState<string>('');
  const [daysUntilExpiration, setDaysUntilExpiration] = useState<number | null>(null);

  const handleOpenChangeModal = () => {
    setOpenDialogPromotion(!openDialogPromotion);
    setDataPromotion(null);
  };

  const handleSearchPromotion = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setIsLoadingDataPromotion(true);
      setDataPromotion(null);
      try {
        const dataSearch = {
          code_promotion_voucher: event.target.value ? event.target.value : null,
          type: typeCarDetail,
        };
        const { data } = await getPromotionVoucher(dataSearch);

        if (data && data.data) {
          handleCheckPromotion(data.data);
          setDataPromotion(data?.data);
        }
      } catch (err) {
        throw err;
      } finally {
        setIsLoadingDataPromotion(false);
      }
    }
  }, 300);

  const handleClickSubmit = () => {
    if (!dataPromotion) return;

    let itemInfoPromotion: IInfoPromotion = {
      id: dataPromotion.id,
      promotion_id: dataPromotion.promotion_id,
      code: dataPromotion.code,
      name: dataPromotion.promotion.name,
      type: 0,
      cash: dataPromotion.promotion.cash,
      date_end: dataPromotion.promotion.date_end,
      date_start: dataPromotion.promotion.date_start,
      detail: dataPromotion.promotion.detail,
      image: '',
      indefinite: dataPromotion.promotion.indefinite,
      money_max: 0,
      note: dataPromotion.promotion.note,
      percent: 0,
      type_car: 0,
      number_day: 0,
    };
    queryKeyIsStateDetailCar({
      infoPromotion: {
        selectPromotion: '2',
        activePromotion: itemInfoPromotion,
      },
      price: {
        ...isStateDetailCar.price,
        total_amount: isStateDetailCar.price?.temp_total_amount - dataPromotion.promotion?.cash,
        price_depoist:
          (isStateDetailCar.price?.temp_total_amount - dataPromotion.promotion?.cash) * (isStateDetailCar.price?.percent_deposit / 100),
        cash_on_delivery:
          isStateDetailCar.price?.temp_total_amount -
          dataPromotion.promotion?.cash -
          (isStateDetailCar.price?.temp_total_amount - dataPromotion.promotion?.cash) * (isStateDetailCar.price?.percent_deposit / 100),
      },
    });
    setOpenDialogPromotion(false);
    setDataPromotion(null);
  };

  const handleCheckPromotion = (item: any) => {
    // Lấy ngày hiện tại
    const currentDate: Date | any = new Date();

    // Chuyển đổi chuỗi ngày bắt đầu và ngày kết thúc sang đối tượng Date
    const startDate: Date | any = new Date(item.date_start);
    const endDate: Date | any = new Date(item.date_end);

    endDate.setHours(24);
    endDate.setMinutes(0);
    endDate.setSeconds(0);

    // So sánh xem currentDate có nằm trong khoảng từ startDate đến endDate không
    // const isCurrentDateWithinRange = item.date_start && item.date_start ? currentDate >= startDate && currentDate <= endDate : true;

    // Tính số ngày còn lại đến ngày hết hạn
    const daysUntilExpiration = item.date_end && item.date_start ? Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24)) : null;
    setDaysUntilExpiration(daysUntilExpiration);

    // Chuỗi thông báo hiển thị số ngày còn lại đến ngày hết hạn
    let expirationMessage = '';

    if (daysUntilExpiration && daysUntilExpiration === 1) {
      expirationMessage = 'Hết hạn trong hôm nay';
    } else if (daysUntilExpiration && daysUntilExpiration === 2) {
      expirationMessage = 'Hết hạn sau 2 ngày';
    } else if (daysUntilExpiration && daysUntilExpiration <= 30) {
      expirationMessage = `Hết hạn sau ${daysUntilExpiration} ngày`;
    }
    setExpirationMessage(expirationMessage);
  };

  return (
    <Dialog modal open={openDialogPromotion} onOpenChange={handleOpenChangeModal}>
      <DialogOverlay />
      <DialogContent className="px-0 lg:max-w-[520px] md:max-w-[480px] w-full overflow-auto max-h-[90vh] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <DialogClose
          onClick={handleOpenChangeModal}
          className="3xl:size-10 size-8 border border-[#000000] flex items-center justify-center p-2 rounded-full absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-ring focus:ring-offset-0 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-40"
        >
          <X className="size-8 text-[#000000]" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader className="flex items-center justify-center w-full border-b pb-4">
          <DialogTitle className="text-2xl capitalize">Khuyến mãi</DialogTitle>
        </DialogHeader>

        <div className="md:px-6 px-3 relative">
          <Input
            onChange={(event) => handleSearchPromotion(event)}
            placeholder="Nhập mã khuyến mãi ViettelPay"
            className="py-3 rounded-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
          {isLoadingDataPromotion && <Loader2 className="absolute right-10 top-1/4 animate-spin text-[#2FB9BD]" />}
        </div>
        <div className="flex flex-col gap-3 md:px-6 px-3">
          {dataPromotion && (
            <>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between w-full gap-x-4">
                  <div className="flex gap-3">
                    <TbDiscount2 className="text-5xl min-w-[52px] text-[#2FB9BD]" />
                    <div className="flex flex-col gap-1">
                      <div className="text-sm uppercase font-semibold">{dataPromotion.code ? dataPromotion.code : ''}</div>
                      <div className="text-xs">
                        <span>{dataPromotion.promotion?.detail}</span>
                      </div>
                      <div className="text-xs text-[#2FB9BD] font-medium">Ưu đãi {FormatNumberDot(dataPromotion.promotion?.cash)}đ</div>
                      {daysUntilExpiration !== null && daysUntilExpiration <= 30 ? (
                        <div className="flex items-center gap-1 text-[#FA3434] cursor-default">
                          <PiWarningCircleBold className="size-4 min-w-[16px]" />
                          <div className="text-xs">{expirationMessage}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <Button
                      onClick={handleClickSubmit}
                      className="py-3 px-6 rounded-lg bg-[#2FB9BD] hover:bg-[#2FB9BD]/80 caret-transparent"
                    >
                      Áp dụng
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogViettelPayPromotion;
