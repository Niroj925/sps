'use client'; // Ensure the component is client-side only

import React, { useState, useEffect } from 'react';
import styles from './add.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/component/api/api';

function Book() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [stroke, setStroke] = useState(null); // Use state for stroke value
  const router = useRouter();

  const [doctorId, setDoctorId] = useState(null); // Use state for doctorId
  const [patient, setPatient] = useState({
    name: '',
    contact: null,
    email: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage and searchParams only in the browser
      const strokeValue = localStorage.getItem('strokeValue');
      setStroke(strokeValue); // Set the stroke value from localStorage

      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('id');
      setDoctorId(id); // Set the doctorId from searchParams
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPatient((prevProperty) => ({
      ...prevProperty,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    setIsButtonDisabled(true);
    const data = {
      name: patient.name,
      contact: parseInt(patient.contact),
      email: patient.email,
      stroke,
    };

    try {
      const response = await api.post(`/patient/add/${doctorId}`, data);

      if (response.status === 200) {
        toast.success('Appointment successfully placed', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTimeout(() => {
          router.push('/');
        }, 3000);
      }

      // Reset form fields
      setPatient({
        name: '',
        contact: '',
        email: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setTimeout(() => {
        router.push('/');
      }, 3000);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.login}>Book Now</h2>
        <hr className={styles.line} />
        <form action="" className={styles.form}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={patient.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Mobile Number"
            name="contact"
            value={patient.contact}
            onChange={handleChange}
            onWheel={(e) => e.preventDefault()}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            required
          />

          <button type="button" onClick={handleClick} disabled={isButtonDisabled}>
            Confirm
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Book;
