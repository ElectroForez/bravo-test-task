import React from "react";

interface SuccessMessageProps {
    message: string;
}

function SuccessMessage({message}: SuccessMessageProps) {
    return(
        <div className="alert alert-success my-3" role="alert">
            {message}
        </div>
    )
}

export default SuccessMessage;