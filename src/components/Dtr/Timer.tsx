import React from 'react';
import PrimaryButton from '../../components/PrimaryButton';
import DangerButton from '../../components/DangerButton';
import WarningButton from '../../components/WarningButton';
import SuccessButton from '../../components/SuccessButton';

const Timer: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg border m-4 p-4">
        <div className="flex items-center justify-between flex-wrap">
            <span className="text-2xl font-bold mr-2">
                8 hrs 0 mins and 0 secs left
            </span>
            <div className="flex items-center flex-wrap">
                <PrimaryButton 
                    className="p-3 mr-2"
                >
                    Time-In
                </PrimaryButton>
                <SuccessButton 
                    className="p-3 mr-2"
                >
                    Resume
                </SuccessButton>
                <WarningButton 
                    className="p-3 mr-2"
                >
                    Break
                </WarningButton>
                <DangerButton 
                    className="p-3"    
                >
                    Time-Out
                </DangerButton>
            </div>
        </div>
    </div>
  );
};

export default Timer;
