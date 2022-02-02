import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#0a101a',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: '#FFFFFF',
};

const WorldFormModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let [state, setState] = useState({
        world: {
            name: '',
            isPublic: '',
            url: '',
            description: ''
        }
    });
    let {world} = state;

    let changeInput = (event) => {
        setState((state) => ({
            world: {
                ...state.world,
                [event.target.name]: event.target.value,
            }
        }));
    }

    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Créer un monde
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            <form>
                                <TextInput label={'Nom du monde'} name={'name'} type={'text'} required={true}
                                           value={world.name} onChange={changeInput}/>
                                <TextInput label={'Image'} name={'url'} type={'text'} required={true} value={world.url}
                                           onChange={changeInput}/>
                                <TextInput label={'Description'} name={'description'} type={'textarea'} required={true}
                                           value={world.description} onChange={changeInput}/>
                                <SubmitButton value={'Créer votre monde !'}/>
                            </form>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default WorldFormModal;
