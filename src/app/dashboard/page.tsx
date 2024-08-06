'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DateOfBirthModal from '@/components/DateOfBirthModal';

const weeksInYear = 52;

const Dashboard: React.FC = () => {
  const [dob, setDob] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(!dob);
  const [number,  setNumber] = useState<number>(0);

  const handleDateOfBirthSubmit = (dateOfBirth: Date) => {
    setDob(dateOfBirth.toISOString().split('T')[0]); // Store the date in YYYY-MM-DD format
    setShowModal(false);
  };

  const calculateFilledBlocks = (dob: string | null): number => {
    if (!dob) return 0;

    const today = new Date();
    const dobDate = new Date(dob);
    const dobWeek = Math.floor((today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    return (dobWeek);
  };

  const filledBlocks = calculateFilledBlocks(dob);

  const renderBlocks = () => {
    const weeksInLife = 60 * weeksInYear; // Total number of weeks in a 60-year lifespan

    return Array.from({ length: weeksInLife }, (_, index) => {
      // Calculate the week number within the year (1 to 52)
      const weekNumber = (index % weeksInYear) + 1;

      return (
        <div
          key={index}
          className={`w-4 h-4 border border-gray-300 transition-transform duration-100 ease-in-out flex items-center justify-center ${
            index < filledBlocks ? 'bg-black' : 'bg-white'
          } custom-hover-scale relative`}
        >
          <span className="week-number opacity-0 transition-opacity duration-200 ease-in-out">
            {weekNumber}
          </span>
        </div>
      );
    });
  };

  return (
    <>
      {showModal && (
        <DateOfBirthModal
          toggleModal={() => setShowModal(false)}
          onSubmit={handleDateOfBirthSubmit}
        />
      )}
      <MaxWidthWrapper className="py-8">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(52, minmax(0, 1fr))',
            gap: '0.5rem',
            
          }}
        >
          {renderBlocks()}
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Dashboard;
