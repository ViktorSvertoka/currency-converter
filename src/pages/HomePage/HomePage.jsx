import axios from 'axios';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [cur1, setCur1] = useState(1);
  const [cur2, setCur2] = useState(1);
  const [selectCur, setSelectCur] = useState([]);

  const date = new Date();
  const today = date.toLocaleDateString();

  const [selectedCurrency1, setSelectedCurrency1] = useState({
    r030: 840,
    txt: 'Долар США',
    rate: 36.3535,
    cc: 'USD',
    exchangedate: today,
  });

  const [selectedCurrency2, setSelectedCurrency2] = useState({
    r030: 1000,
    txt: 'Українська гривня',
    rate: 1,
    cc: 'UAH',
    exchangedate: today,
  });

  useEffect(() => {
    const getCurrency = async () => {
      //   console.log(today);
      try {
        await axios
          .get(
            'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json '
          )
          .then(res => {
            // console.log(res.data);
            const selectCur = res.data.filter(cur => {
              return cur.cc === 'USD' || cur.cc === 'EUR';
            });

            setSelectCur([
              ...selectCur,
              {
                r030: 1000,
                txt: 'Українська гривня',
                rate: 1,
                cc: 'UAH',
                exchangedate: today,
              },
            ]);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCurrency();
  }, [today]);
  //   console.log(selectCur);
  useEffect(() => {
    setCur2(() => {
      const countedValue =
        (cur1 * selectedCurrency1.rate) / selectedCurrency2.rate;

      return Number(countedValue);
    });
  }, [cur1, selectedCurrency1.rate, selectedCurrency2.rate]);

  //   useEffect(() => {
  //     setCur1(() => {
  //       const countedValue =
  //         (cur2 * selectedCurrency2.rate) / selectedCurrency1.rate;

  //       return Number(countedValue);
  //     });
  //   }, [cur2, selectedCurrency1.rate, selectedCurrency2.rate]);

  const handleInputCur1 = e => {
    const value = Number(e.target.value);

    setCur1(value);
    setCur2(() => {
      const countedValue =
        (cur1 * selectedCurrency1.rate) / selectedCurrency2.rate;

      return Number(countedValue);
    });
  };

  const handleInputCur2 = e => {
    const value = Number(e.target.value);

    setCur2(value);
    setCur1(() => {
      const countedValue =
        (cur2 * selectedCurrency2.rate) / selectedCurrency1.rate;

      return Number(countedValue);
    });
  };

  const handleChangeCurr1 = e => {
    const selectedCurr = selectCur.filter(cur => cur.cc === e.target.value);

    setSelectedCurrency1(...selectedCurr);
    setCur2(Number((cur1 * selectedCurrency1.rate) / selectedCurrency2.rate));
  };

  const handleChangeCurr2 = e => {
    const selectedCurr = selectCur.filter(cur => cur.cc === e.target.value);
    setSelectedCurrency2(...selectedCurr);
    setCur1(() => {
      const countedValue =
        (cur2 * selectedCurrency2.rate) / selectedCurrency1.rate;

      return Number(countedValue);
    });
  };

  return (
    <div>
      <form>
        <label>
          <input
            name="cur1"
            type="text"
            value={cur1}
            onChange={handleInputCur1}
          />
          <select value={selectedCurrency1.cc} onChange={handleChangeCurr1}>
            {selectCur.map(cur => {
              return (
                <option key={cur.r030} value={cur.cc}>
                  {cur.cc}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          <input
            name="cur2"
            type="text"
            autoComplete="off"
            value={cur2}
            onChange={handleInputCur2}
          />
          <select value={selectedCurrency2.cc} onChange={handleChangeCurr2}>
            {selectCur.map(cur => {
              return (
                <option key={cur.r030} value={cur.cc}>
                  {cur.cc}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </div>
  );
};

export default HomePage;
