import React from 'react';
import WorldFormModal from "../form/WorldFormModal";
import CharacterFormModal from "../form/CharacterFormModal";

const OptionBar = () => {
    const [openWorld, setOpenWorld] = React.useState(false);
    const [openCharacter, setOpenCharacter] = React.useState(false);

    return (
        <div className={'option_bar'}>
            <div className={'option_bar_menu'}>
                <WorldFormModal openWorld={openWorld} setOpenWorld={setOpenWorld}/>
                <CharacterFormModal openCharacter={openCharacter} setOpenCharacter={setOpenCharacter}/>
            </div>
        </div>
    );
};

export default OptionBar;
