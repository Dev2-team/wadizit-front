import React from 'react';

const ProgressBar = (props) => {

    const { completed } = props;

    //progress bar 스타일
    const containerStyles = {
        height: "12px",
        width: "120%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        display: "inline-block",
        
    }

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: "#00b2b2",
        borderRadius: "inherit",
        textAlian: 'right',
        transition: 'width 1s ease-in-out',

    }

    const labelStyles = {
        color: "black",
        fontSize: "10px",
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <div style={labelStyles}>{`${completed}%`}</div>
            </div>
        </div>
    );
};

export default ProgressBar;