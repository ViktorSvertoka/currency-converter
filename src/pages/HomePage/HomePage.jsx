import axios from 'axios';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [currency1, setCurrency1] = useState(1);
  const [currency2, setCurrency2] = useState(1);
  const [selectedCurrency1, setSelectedCurrency1] = useState('USD');
  const [selectedCurrency2, setSelectedCurrency2] = useState('USD');
  const [select, setSelect] = useState([]);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const response = await axios.get(
          'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
        );
        const filteredCurrencies = response.data.filter(
          cur => cur.cc === 'USD' || cur.cc === 'EUR'
        );

        setSelect([
          ...filteredCurrencies,
          {
            r030: 1000,
            txt: 'Українська гривня',
            rate: 1,
            cc: 'UAH',
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrency();
  }, []);

  const rateUsd = select[0]?.rate || 0;
  const rateEur = select[1]?.rate || 0;

  const handleInputCurrency1 = event => {
    const value = Number(event.target.value);

    if (isNaN(value)) {
      return;
    }

    setCurrency1(value);

    if (selectedCurrency1 === selectedCurrency2) {
      setCurrency2(value);
    } else if (selectedCurrency1 === 'UAH' && selectedCurrency2 === 'USD') {
      setCurrency2((value / rateUsd).toFixed(2));
    } else if (selectedCurrency2 === 'UAH' && selectedCurrency1 === 'USD') {
      setCurrency2((value * rateUsd).toFixed(2));
    } else if (selectedCurrency1 === 'UAH' && selectedCurrency2 === 'EUR') {
      setCurrency2((value / rateEur).toFixed(2));
    } else if (selectedCurrency2 === 'UAH' && selectedCurrency1 === 'EUR') {
      setCurrency2((value * rateEur).toFixed(2));
    } else if (selectedCurrency1 === 'USD' && selectedCurrency2 === 'EUR') {
      setCurrency2(((value * rateUsd) / rateEur).toFixed(2));
    } else {
      setCurrency2(((value * rateEur) / rateUsd).toFixed(2));
    }
  };

  const handSelectCurrency1 = event => {
    const value = event.target.value;
    setSelectedCurrency1(value);
  };

  const handleInputCurrency2 = event => {
    const value = Number(event.target.value);

    if (isNaN(value)) {
      return;
    }

    setCurrency2(value);

    if (selectedCurrency1 === selectedCurrency2) {
      setCurrency1(value);
    } else if (selectedCurrency2 === 'UAH' && selectedCurrency1 === 'USD') {
      setCurrency1((value / rateUsd).toFixed(2));
    } else if (selectedCurrency1 === 'UAH' && selectedCurrency2 === 'USD') {
      setCurrency1((value * rateUsd).toFixed(2));
    } else if (selectedCurrency1 === 'UAH' && selectedCurrency2 === 'EUR') {
      setCurrency1((value / rateEur).toFixed(2));
    } else if (selectedCurrency2 === 'UAH' && selectedCurrency1 === 'EUR') {
      setCurrency1((value * rateEur).toFixed(2));
    } else if (selectedCurrency1 === 'USD' && selectedCurrency2 === 'EUR') {
      setCurrency1(((value * rateEur) / rateUsd).toFixed(2));
    } else {
      setCurrency1(((value * rateUsd) / rateEur).toFixed(2));
    }
  };

  const handSelectCurrency2 = event => {
    const value = event.target.value;
    setSelectedCurrency2(value);
  };

  return (
    <div>
      <form>
        <label>
          <input
            name="currency1"
            type="text"
            value={currency1}
            onChange={handleInputCurrency1}
          />
          <select value={selectedCurrency1} onChange={handSelectCurrency1}>
            {select.map(cur => (
              <option key={cur.r030} value={cur.cc}>
                {cur.cc}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            name="currency2"
            type="text"
            autoComplete="off"
            value={currency2}
            onChange={handleInputCurrency2}
          />
          <select value={selectedCurrency2} onChange={handSelectCurrency2}>
            {select.map(cur => (
              <option key={cur.r030} value={cur.cc}>
                {cur.cc}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};

export default HomePage;
