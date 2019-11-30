/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import {green} from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles, Theme} from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

interface Props {
    message?: string | null;
    type: string;
}


function MySnackbarContentWrapper(props: Props) {
    const classes = useStyles();
    const {message, type} = props;

    return (
        <SnackbarContent
            className={type === 'success' ? classes.success : classes.error}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    {message}
                </span>
            }

        />
    );
}


const Notification: React.FC<{ message: string | null, type: string, closeNotificationHandler: any }> = ({message, type, closeNotificationHandler}) => {
    if (message === null) {
        return null
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={true}
            autoHideDuration={5000}
            onClose={closeNotificationHandler}
        >
            <MySnackbarContentWrapper
                type={type}
                message={message}
            />
        </Snackbar>
    )
};

export default Notification;