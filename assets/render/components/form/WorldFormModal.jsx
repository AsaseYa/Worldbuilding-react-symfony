import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextInput from "./TextInput";
import SubmitButton from "./SubmitButton";
import axios from "axios";
import {TextareaAutosize} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: '#000000',
};

const WorldFormModal = ({openWorld, setOpenWorld}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleOpen = () => setOpenWorld(true);
    const handleClose = () => setOpenWorld(false);

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
                setOpenWorld(false)
                setLoading(false);
                setState({
                    world: {
                        name: '',
                        isPublic: false,
                        url: '',
                        description: ''
                    }
                })
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
            <SubmitButton value={'Nouveau monde'} onClick={handleOpen} />
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openWorld}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openWorld}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Créer un monde
                        </Typography>
                        <div id="transition-modal-description">
                            <form onSubmit={worldSubmit}>
                                <TextInput label={'Nom du monde'} name={'name'} type={'text'} required={true}
                                           value={world.name} onChange={changeInput}/>
                                <TextInput label={'Image'} name={'url'} type={'text'} required={true} value={world.url}
                                           onChange={changeInput}/>
                                <div className={'world_text_area'}>
                                    <TextareaAutosize
                                        id={'world_text_area_id'}
                                        minRows={1}
                                        style={{width: '100%'}}
                                        placeholder={''}
                                        name={'description'}
                                        value={world.description}
                                        onChange={changeInput}
                                    />
                                    <label className={'world_text_area_label'} htmlFor={"world_text_area_id"}>
                                        Description
                                    </label>
                                </div>

                                <div className={'word_form_checkbox'}>
                                    <label>En ligne ?</label>
                                    <input type={'checkbox'} name={'isPublic'} onChange={updateCheck}/>
                                </div>
                                <SubmitButton value={'Créer votre monde !'}/>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default WorldFormModal;
