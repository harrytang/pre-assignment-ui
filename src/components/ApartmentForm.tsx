/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },

    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

interface Props {
    closeFormHandler: any,
    formAction: (string|null),
    fromDataHandler: any,
    formData: any,
    submitHandler: any
}

const ApartmentForm: React.FC<Props> = ({closeFormHandler, formAction, formData, submitHandler, fromDataHandler}) => {
    const classes = useStyles();

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    {formAction===null?'New Apartment': 'Update ApartmentForm'}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.address}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="postalCode"
                            name="postalCode"
                            label="Postal Code"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.postalCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="postalArea"
                            name="postalArea"
                            label="Postal Area"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.postalArea}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="rooms"
                            name="rooms"
                            label="Rooms"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.rooms}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="squareMeters"
                            name="squareMeters"
                            label="Square Meters"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.squareMeters}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="hasElevator" onChange={fromDataHandler}
                                               checked={formData.hasElevator}/>}
                            label="Elevator"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="buildYear"
                            name="buildYear"
                            label="Build Year"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.buildYear}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="price"
                            name="price"
                            label="Price"
                            fullWidth
                            onChange={fromDataHandler}
                            value={formData.price}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            required
                            id="notes"
                            name="notes"
                            label="Notes"
                            fullWidth
                            multiline
                            rows="6"
                            onChange={fromDataHandler}
                            value={formData.notes}
                        />
                    </Grid>

                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={submitHandler}>Submit</Button>
                        <Button variant="contained" className={classes.button} onClick={closeFormHandler}>Back</Button>
                    </div>

                </Grid>
            </Paper>
        </main>
    );
};

export default ApartmentForm;