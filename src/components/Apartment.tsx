/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ApartmentAttr from "./ApartmentAttr";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';

import IApartment from './IApartment';

interface Props {
    apartment: IApartment,
    openFormHandler: any,
    deleteHandler: any
}

/* style */
const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const Apartment: React.FC<Props> = ({apartment, openFormHandler, deleteHandler}) => {
    const classes = useStyles();

    return (
        <Grid item key={apartment._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/featured/?house"
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Grid container>
                        <ApartmentAttr attr="Address" value={apartment.address} />
                        <ApartmentAttr attr="Postal Code" value={apartment.postalCode} />
                        <ApartmentAttr attr="Postal Area" value={apartment.postalArea} />
                        <ApartmentAttr attr="Rooms" value={apartment.rooms} />
                        <ApartmentAttr attr="Square m²" value={apartment.squareMeters} />
                        <ApartmentAttr attr="Build Year" value={apartment.buildYear} />
                        {typeof apartment.hasElevator==="boolean"?<ApartmentAttr attr="Elevator" value={apartment.hasElevator?'Yes':'No'} />:null}
                        <ApartmentAttr attr="Price" value={apartment.price} />
                        {typeof apartment.notes==="string"?<ApartmentAttr attr="Note" value={apartment.notes} />:null}
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" variant="contained" onClick={()=>openFormHandler(apartment._id, apartment)}>
                        Edit
                    </Button>
                    <Button size="small" color="secondary" variant="contained" onClick={()=>deleteHandler(apartment._id)}>
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Apartment;