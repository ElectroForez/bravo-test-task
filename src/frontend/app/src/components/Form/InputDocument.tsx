import React, {ChangeEvent, useState} from 'react';

interface InputDocumentProps {
    addChangeHandler: (value: string) => void;
}

function InputDocument({ addChangeHandler }:InputDocumentProps) {

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        addChangeHandler(event.target.value);
    }

    return (
        <div className="mb-3">
            <label htmlFor="inputDocumentName" className="form-label">Название документа</label>
            <input onChange={changeHandler} type="text" className="form-control" list={"documents"} placeholder={"Например: ГОСТ 123"} id="inputDocumentName"/>
        </div>
    )
}

export default InputDocument;
