/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import Apartment from "./Apartment";
import Typography from "@material-ui/core/Typography";
import IApartment from "./IApartment";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';


interface Props {
    apartments: IApartment[],
    deleteHandler: any,
    openFormHandler: any,
    nextPageHandler: any,
    prePageHandler: any,
    pagination: any
}

const Apartments: React.FC<Props> = ({apartments, pagination, prePageHandler, nextPageHandler, openFormHandler, deleteHandler}) => {
    return (
        <>
            {apartments.length > 0 ? (
                <Grid container spacing={4}>
                    {apartments.map(apartment => (
                        <Apartment
                            key={apartment._id}
                            apartment={apartment}
                            openFormHandler={openFormHandler}
                            deleteHandler={deleteHandler}
                        />
                    ))}
                    <Grid container spacing={1} direction="column" alignItems="center">
                        <Grid item>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button variant="contained" disabled={pagination.skip === 0}
                                        onClick={prePageHandler}>PRE</Button>
                                <Button variant="contained"
                                        disabled={pagination.skip + pagination.limit >= pagination.total}
                                        onClick={nextPageHandler}>NEXT</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Grid>

            ) : (
                <Typography variant="body1">
                    {pagination.total === -1 ? 'Loading...' : 'No data'}
                </Typography>
            )}
        </>
    );
};

export default Apartments;