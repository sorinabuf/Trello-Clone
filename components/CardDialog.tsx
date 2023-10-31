import { Button, Dialog, IconButton, Input } from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import TitleIcon from '@mui/icons-material/Title';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import styles from '@/styles/pages.module.css';

interface Props {
  open: boolean;
  cardId: number;
  cardName: string;
  cardDescription: string;
  onClose: (name: string, description: string, open: boolean) => void;
  deleteCard: () => void;
}

export default function CardDialog({
  cardName,
  cardDescription,
  open,
  onClose,
  deleteCard,
}: Props) {
  const inputStyle = {
    backgroundColor: '#22272B',
    borderRadius: '10px',
    padding: '10px 15px',
    margin: '15px',
  };

  const inputLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '25px',
  };

  const closeIconStyle = {
    display: 'flex',
    justifyContent: 'end',
  };

  const buttonsStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '25px',
  };

  const deleteButtonStyle = {
    display: 'flex',
    justifyContent: 'end',
    marginTop: '25px',
  };

  const [nameValue, setNameValue] = useState(cardName);
  const [descriptionValue, setDescriptionValue] = useState(cardDescription);
  const [isModified, setIsModified] = useState(false);

  const handleCardDialogClose = () => {
    onClose(nameValue, descriptionValue, false);
  };

  const handleNameChange = (event: any) => {
    const newName = event.target.value;
    setNameValue(newName);

    if (newName !== cardName && newName !== '') {
      setIsModified(true);
    }
  };

  const handleDescriptionChange = (event: any) => {
    const newDescription = event.target.value;
    setDescriptionValue(newDescription);

    if (newDescription !== cardDescription) {
      setIsModified(true);
    }
  };

  const discardChanges = () => {
    setNameValue(cardName);
    setDescriptionValue(cardDescription);

    setIsModified(false);
  };

  const saveChanges = () => {
    setIsModified(false);
    onClose(nameValue, descriptionValue, true);
  };

  const handleDeleteCard = () => {
    setIsModified(false);
    deleteCard();
  };

  useEffect(() => {
    setNameValue(cardName);
  }, [cardName]);

  useEffect(() => {
    setDescriptionValue(cardDescription);
  }, [cardDescription]);

  return (
    <Dialog onClose={handleCardDialogClose} open={open}>
      <div className={styles['card-dialog']}>
        <div>
          <div className={styles['full-width']} style={closeIconStyle}>
            <IconButton
              size='small'
              disableRipple
              onClick={handleCardDialogClose}
            >
              <CloseIcon sx={{ color: '#B6C2CF' }} />
            </IconButton>
          </div>

          <div style={inputLabelStyle}>
            <TitleIcon sx={{ color: '#B6C2CF' }} />
            <span className={styles['card-input-font']}>Name</span>
          </div>

          <div style={inputStyle}>
            <Input
              disableUnderline
              className={styles['card-input-font']}
              type='text'
              value={nameValue}
              onChange={handleNameChange}
              fullWidth
              multiline
              maxRows={3}
            />
          </div>

          <div style={inputLabelStyle}>
            <NotesIcon sx={{ color: '#B6C2CF' }} />
            <span className={styles['card-input-font']}>Description</span>
          </div>

          <div style={inputStyle}>
            <Input
              disableUnderline
              className={styles['card-input-font']}
              type='text'
              value={descriptionValue}
              onChange={handleDescriptionChange}
              placeholder={
                descriptionValue === ''
                  ? 'Add a more detailed description...'
                  : ''
              }
              fullWidth
              multiline
              rows={5}
            />
          </div>

          <div style={buttonsStyle}>
            <Button
              variant='contained'
              disableElevation
              disabled={!isModified}
              onClick={saveChanges}
            >
              Save changes
            </Button>
            <Button onClick={discardChanges}>Discard changes</Button>
          </div>
        </div>

        <div style={deleteButtonStyle}>
          <Button
            variant='contained'
            color='error'
            disableElevation
            onClick={handleDeleteCard}
          >
            <DeleteIcon sx={{ marginRight: '5px', marginLeft: '-5px' }} />
            Delete card
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
