import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 799
    }
];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryOption(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days');

        if(!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }

    return deliveryDate.format('dddd, MMMM D');
}

function isWeekend(date) {
    const day = date.format('dddd');
    return day === 'Saturday' || day === 'Sunday';
}