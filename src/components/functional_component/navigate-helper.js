import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigateHelper = ({ shouldNavigate, path }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (shouldNavigate) {
            navigate(path);
        }
    }, [shouldNavigate, path, navigate]);

    return null;
};

export default NavigateHelper;