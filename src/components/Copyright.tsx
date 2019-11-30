/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';

/* style */
const useStyles = makeStyles(theme => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(2),
    },
}));


const Copyright: React.FC = () => {

    const classes = useStyles();

    return (
        <Typography variant="body2" color="textSecondary" align="center" className={classes.footer}>
            {'Copyright © '}
            <Link color="inherit" href="https://dwellet.harrytang.com/">
                dwellet
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Copyright;