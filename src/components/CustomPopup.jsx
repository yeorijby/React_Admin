import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const CustomPopup = ({ title, label1, label2, label3, open, onClose, onConfirm }) => {
  const [inputValues, setInputValues] = useState([{ text1: '', text2: '', text3: '' }]);

  const handleConfirmClick = () => {
    // 여기에서 입력된 값들을 사용하여 원하는 동작 수행
    onConfirm(inputValues);

    // Dialog 닫기
    onClose();
  };

  const handleInputChange = (fieldName) => (event) => {
    // TextField 입력값 변경 시 상태 업데이트
    setInputValues({ ...inputValues, [fieldName]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div>
        <h2>{title}</h2>
        <TextField label={label1} value={inputValues.text1} onChange={handleInputChange('text1')} />
        <TextField label={label2} value={inputValues.text2} onChange={handleInputChange('text2')} />
        <TextField label={label3} value={inputValues.text3} onChange={handleInputChange('text3')} />
        <Button onClick={handleConfirmClick}>확인</Button>
      </div>
    </Dialog>
  );
};

export default CustomPopup;
