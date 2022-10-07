import React from 'react';

interface ErrorProps {
    message: string;
}

function ErrorMessage(props: ErrorProps) {
    return (
        <div className="alert alert-danger my-3" role="alert">
            {props.message}
        </div>
    )
}

export default ErrorMessage;
