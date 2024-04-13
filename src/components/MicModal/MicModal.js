import React from 'react';
import { useSpeechRecognitionWithMicModal } from '../../hooks/SpeechRecognition';
import Button from '../ButtonModal/ButtonModal';

const MicModal = ({handleModalClose,handleresponse}) => {
  const { error, startRecognition } = useSpeechRecognitionWithMicModal({handleModalClose,handleresponse});

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }}>
        <p>{error || 'Please speak...'}</p>
        {!error && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={startRecognition} children={"Start" } bg={'green'} margin={'10px'}/>
            <Button onClick={handleModalClose} children={"Cancel" } bg={'red'} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MicModal;
