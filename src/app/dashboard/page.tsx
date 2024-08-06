'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import DateOfBirthModal from '@/components/DateOfBirthModal';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect} from 'next/navigation';
import { User } from 'lucide-react';

const weeksInYear = 52;

const Dashboard: React.FC = () => {
  const [dob, setDob] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(!dob);

  // const {getUser} = getKindeServerSession()
  // const user = getUser()
  // if(!user || !user.id) redirect('auth-callback?origin=dashboard')

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
    
    return Array.from({ length: weeksInLife }, (_, index) => (
      <div
        key={index}
        className={`w-4 h-4 ${index < filledBlocks ? 'bg-black' : 'bg-white'} border border-gray-300`}
      />
    ));
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
