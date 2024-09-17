'use client'

import React, { useState, useEffect, Suspense } from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import styles from './result.module.css';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const SearchParamsWrapper = dynamic(() => 
  import('next/navigation').then((mod) => {
    const UseSearchParams = () => {
      const searchParams = mod.useSearchParams();
      return { searchParams };
    };
    return UseSearchParams;
  }),
  { ssr: false }
);

const ResultPage = () => {
  const [risk, setRisk] = useState(false);
  const [value, setValue] = useState(0);
  const router = useRouter();

  const ResultContent = () => {
    const { searchParams } = SearchParamsWrapper();

    useEffect(() => {
      const paramValue = parseFloat(searchParams.get("s_value")) || 0;
      setValue(paramValue);
      localStorage.setItem('strokeValue', paramValue);
      setRisk(paramValue > 49);
    }, [searchParams]);

    return (
      <div className={styles.result}>
        <ReactSpeedometer
          maxValue={100}
          value={value}
          needleColor="blue"
          startColor="green"
          segments={20}
          endColor="red"
        />
        <div className={styles.messageBox}>
          <h2 className={`${risk ? styles.risk : styles.norisk}`}>
            {risk ? 'Risk of Stroke' : 'No Risk of Stroke'}
          </h2>
        </div>
        <div>
          {risk && (
            <button onClick={() => router.push('/doctors')} className={styles.checkbtn}>
              Check Up Now
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading...</div>}>
        <ResultContent />
      </Suspense>
    </div>
  );
};

export default ResultPage;