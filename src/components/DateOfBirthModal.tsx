'use client';
import React, { useState, FormEvent } from 'react';
import Overlay from './Overlay';
import { buttonVariants } from './ui/button';

interface DateOfBirthModalProps {
  toggleModal: () => void;
  onSubmit: (dateOfBirth: Date) => void;
}

const DateOfBirthModal: React.FC<DateOfBirthModalProps> = ({ toggleModal, onSubmit }) => {
  const [dob, setDob] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dob) {
      const dateOfBirth = new Date(dob);
      onSubmit(dateOfBirth);
      toggleModal(); // Close the modal after submission
    }
  };

  return (
    <Overlay onClose={toggleModal}>
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Enter Your Date of Birth</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label htmlFor="dob" className="block text-md mb-2">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            required
          />
          <button
            type="submit"
            className={buttonVariants({
              size: 'default',
              className: 'mt-5',
            })}
            // className="bg-[#4D5B9E] px-5 py-2 border-2 rounded-2xl text-white text-md"
          >
            Submit
          </button>
        </form>
      </div>
    </Overlay>
  );
};

export default DateOfBirthModal;
