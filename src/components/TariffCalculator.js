import { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import ButtonOption from './ButtonOption';

const TariffCalculator = () => {
  const [tariff, setTariff] = useState('standard');
  const [currency, setCurrency] = useState('CNY');
  const [paymentPeriod, setPaymentPeriod] = useState('month');
  const [exchangeRates, setExchangeRates] = useState({ CNY: 0, KZT: 0 });

  useEffect(() => {
    /**
     * Fetches the exchange rates for RUB from an API and sets the exchange rates state
     * @returns A promise that resolves when the exchange rates are fetched and set
     */
    const fetchExchangeRates = async () => {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/RUB');
      const data = await response.json();
      setExchangeRates({ CNY: data.rates.CNY, KZT: data.rates.KZT });
    };

    fetchExchangeRates();
  }, []);

  /**
   * Calculates the price and discount based on the selected tariff and payment period
   * @returns An object containing the converted price and discount
   */
  const calculatePriceAndDiscount = () => {
    const tariffsWithPrices = {
      standard: { month: 100, year: 1000 },
      advanced: { month: 150, year: 1400 },
    };
    const price = tariffsWithPrices[tariff][paymentPeriod];
    const discount = paymentPeriod === 'year' ? tariffsWithPrices[tariff]['month'] * 12 - price : 0;
    //const finalPrice = price - discount;
    const convertedPrice = (price * exchangeRates[currency]).toFixed(0);
    return { convertedPrice, discount: (discount * exchangeRates[currency]).toFixed(0) };
  };

  const { convertedPrice, discount } = calculatePriceAndDiscount();

  return (

      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full relative">
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6 mt-12">Тарифный калькулятор</h1>

        <div className="absolute top-5 right-5 flex items-center gap-2.5">
          <FaMoneyBillWave className="text-2xl text-blue-600" />
          <select className="py-1.5 px-2.5 rounded-lg border border-blue-600" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="CNY">CNY</option>
            <option value="KZT">KZT</option>
          </select>
        </div>
        <label className="block mb-2 text-gray-700">
          Выбор тарифа:
        </label>
        <div className="flex flex-wrap justify-around mb-4">
          <ButtonOption name="Стандартный" value="standard" selected={tariff === 'standard'} onClick={setTariff} />
          <ButtonOption name="Продвинутый" value="advanced" selected={tariff === 'advanced'} onClick={setTariff} />
        </div>
        <label className="block mb-2 text-gray-700">
          Выбор периода оплаты:
        </label>
        <div className="flex flex-wrap justify-around">
          <ButtonOption name="За месяц" value="month" selected={paymentPeriod === 'month'} onClick={setPaymentPeriod} />
          <ButtonOption name="За год" value="year" selected={paymentPeriod === 'year'} onClick={setPaymentPeriod} />
        </div>
        <div className="text-center mt-6">
          <p className="text-lg">
            Сумма к оплате: {convertedPrice} {currency}
          </p>

          <p className="text-lg text-red-600" style={{ visibility: discount > 0 ? 'visible' : 'hidden' }}>
            Скидка при оплате за год: {discount > 0 ? `${discount} ${currency}` : ''}
          </p>
        </div>
      </div>

  );
};

export default TariffCalculator;