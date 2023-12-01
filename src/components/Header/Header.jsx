import axios from 'axios';
import { useEffect, useState } from 'react';
import { BoxHeader, ListHeader } from './Header.styled';

export const Header = () => {
  const [allCurrency, setAllCurrency] = useState([]);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        await axios
          .get(
            'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json '
          )
          .then(res => {
            setAllCurrency(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getCurrency();
  }, []);

  const headerCur = allCurrency.filter(cur => {
    return cur.cc === 'USD' || cur.cc === 'EUR';
  });

  return (
    <BoxHeader>
      <ListHeader>
        {headerCur.map(cur => (
          <li key={cur.r030}>
            <p>
              1{cur.cc} = {cur.rate.toFixed(2)}UAH
            </p>
          </li>
        ))}
      </ListHeader>
    </BoxHeader>
  );
};
