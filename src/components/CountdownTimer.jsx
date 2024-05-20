import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { cdAction } from '../stores/countDownState';
import { Typography } from '@mui/material';

const CountdownTimer = ({ initialMinutes = 0, initialSeconds = 0, breakTime }) => {
    const { seconds: secondsState, minutes: minutesState } = useSelector(state => state.countD)
    const [minutes, setMinutes] = useState(() => {
        const savedMinutes = minutesState;
        return savedMinutes !== 0 ? savedMinutes : initialMinutes;
    });
    const [seconds, setSeconds] = useState(() => {
        const savedSeconds = secondsState
        return savedSeconds !== 0 ? savedSeconds : initialSeconds;
    });
    const dispatch = useDispatch()


    useEffect(() => {
        const interval = setInterval(() => {
            if (breakTime) {
                clearInterval(interval)
                dispatch(cdAction.removeCd())
            } else if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
            } else {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setMinutes(prevMinutes => prevMinutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, minutes, breakTime, dispatch]);

    useEffect(() => {
        dispatch(cdAction.setCd({ minutes, seconds }))
    }, [dispatch, minutes, seconds]);

    return (
        <Typography>
            {`${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`}
        </Typography>
    )
};

CountdownTimer.propTypes = {
    initialMinutes: PropTypes.number,
    initialSeconds: PropTypes.number,
    breakTime: PropTypes.bool
}

export default CountdownTimer;
