import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import axios from "axios";

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

const WorldFormModal = ({open, setOpen}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let [state, setState] = useState({
        world: {
            name: '',
            isPublic: false,
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

    let updateCheck = (event) => {
        setState((state) => ({
            world: {
                ...state.world,
                [event.target.name]: event.target.checked,
            }
        }));
    }

    let worldSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        let token = localStorage.getItem("token");
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };
        try {
            const res = await axios.post(
                '/api/worlds/new', {
                    name: state.world.name,
                    isPublic: state.world.isPublic,
                    url: state.world.url,
                    description: state.world.description,
                },
                config
            );
            let response = JSON.parse(res.request.response);
            if (response.success) {
                setOpen(false)
                setLoading(false);
            } else {
                setError(response.content);
                setLoading(false);
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
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
                            <form onSubmit={worldSubmit}>
                                <TextInput label={'Nom du monde'} name={'name'} type={'text'} required={true}
                                           value={world.name} onChange={changeInput}/>
                                <TextInput label={'Image'} name={'url'} type={'text'} required={true} value={world.url}
                                           onChange={changeInput}/>
                                <TextInput label={'Description'} name={'description'} type={'textarea'} required={true}
                                           value={world.description} onChange={changeInput}/>
                                <div className={'word_form_checkbox'}>
                                    <label>En ligne ?</label>
                                    <input type={'checkbox'} name={'isPublic'} onChange={updateCheck}/>
                                </div>
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
