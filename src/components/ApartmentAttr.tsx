/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface Props {
    attr: string,
    value: (string | number | boolean)
}

const ApartmentAttr: React.FC<Props> = (props) => {
    return (
        <>
            <Grid item xs={4}>
                <Typography variant="body1">{props.attr}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="body1">{props.value}</Typography>
            </Grid>
        </>
    );
};

export default ApartmentAttr;
