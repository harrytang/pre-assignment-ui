import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {makeStyles} from '@material-ui/core/styles';

import IApartment from './components/IApartment';
import apartmentsService from "./services/apartments";

// components
import Copyright from "./components/Copyright";
import ApartmentForm from "./components/ApartmentForm";
import Apartments from "./components/Apartments";

/* style */
const useStyles = makeStyles(theme => ({
    header: {
        flex: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingBottom: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    newBtn: {
        float: 'right'
    }
}));


/* Main */
const App: React.FC = () => {
    const classes = useStyles();

    const emptyForm = {
        address: '',
        postalCode: '',
        postalArea: '',
        rooms: '',
        squareMeters: '',
        hasElevator: false,
        buildYear: '',
        price: '',
        notes: ''
    };
    // app states
    const [apartments, setApartments] = useState<IApartment[]>([]);
    const [formStatus, setFormStatus] = useState<string>('closed');
    const [formAction, setFormAction] = useState<(string | null)>(null); // null for adding new apt, or formAction is _id of updating apt
    const [formData, setFormData] = useState<any>(emptyForm);
    const [pagination, setPagination] = useState<any>({
        total: -1, // -1 is for show 'loading' text when page first loaded instead showing 'no data',
        limit: 6, // 6 apt per page
        skip: 0,
    });


    // fetch data from backend server
    useEffect(() => {
        apartmentsService.getAll({limit: 6, skip:0}).then(
            data => {
                setPagination({
                    total: data.total,
                    limit: data.limit,
                    skip: data.skip
                });
                setApartments(data.data);
            }
        );
    }, []);

    // pagination handlers (pre, next)
    const nextPageHandler = () => {
        apartmentsService.getAll({limit: pagination.limit, skip: pagination.skip + pagination.limit}).then(
            data => {
                setPagination({
                    total: data.total,
                    limit: data.limit,
                    skip: data.skip
                });
                setApartments(data.data);
            }
        );
    };
    const prePageHandler = () => {
        apartmentsService.getAll({limit: pagination.limit, skip: pagination.skip - pagination.limit}).then(
            data => {
                setPagination({
                    total: data.total,
                    limit: data.limit,
                    skip: data.skip
                });
                setApartments(data.data);
            }
        );
    };

    // delete apt
    const deleteHandler = (id: string) => {
        if (window.confirm("Do you really want to delete this?")) {
            apartmentsService.remove(id)
                .then(res => {
                    const remainingApt = apartments.filter(apartment => apartment._id !== res._id);
                    if(remainingApt.length===0){
                        // no apt left from state, load from server
                        apartmentsService.getAll({limit: pagination.limit, skip: 0}).then(
                            data => {
                                setPagination({
                                    total: data.total,
                                    limit: data.limit,
                                    skip: data.skip
                                });
                                setApartments(data.data);
                            }
                        );
                    }
                    else {
                        // just remove apt form state if there still have apts
                        setApartments(apartments.filter(apartment => apartment._id !== res._id))
                    }
                });
        }
    };

    // add/edit apt
    const submitHandler = () => {
        // add new apt
        if (formAction === null) {
            apartmentsService.create(formData)
                .then(res => {
                    setFormStatus('closed');
                    apartmentsService.getAll({limit: pagination.limit, skip: 0}).then(
                        data => {
                            setPagination({
                                total: data.total,
                                limit: data.limit,
                                skip: data.skip
                            });
                            setApartments(data.data);
                        }
                    );
                });
        } else {
            // update apt
            apartmentsService.update(formAction, formData)
                .then(res => {
                    const idx = apartments.findIndex(apt => apt._id === res._id);
                    const newData = [...apartments];
                    newData[idx] = res;
                    setFormStatus('closed');
                    setApartments(newData)
                });
        }
    };

    // open/close apt form
    const openFormHandler = (action: (string | null), data: (IApartment | null) = null) => {
        setFormAction(action); // action = null is for adding new apt, action = apt ID is for updating apt
        if (data !== null) {
            setFormData(data);
        } else {
            setFormData(emptyForm)
        }
        setFormStatus('opened');
    };
    const closeFormHandler = () => {
        setFormStatus('closed');
    };

    // handler form data
    const fromDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = {...formData};
        const name = e.target.name;

        let value: (string | boolean) = '';
        if (name !== 'hasElevator') {
            value = e.target.value;
        } else {
            value = e.target.checked;
        }

        data[name] = value;
        setFormData(data);
    };

    // render
    return (
        <Container maxWidth="lg">
            <Box my={4}>

                <Typography variant="h3" component="h1" gutterBottom className={classes.header}>
                    Apartments
                    <Fab color="primary" aria-label="add" className={classes.newBtn}
                         onClick={() => openFormHandler(null)}>
                        <AddIcon/>
                    </Fab>
                </Typography>

                {
                    formStatus === 'closed' ?
                        <Apartments apartments={apartments}
                                    pagination={pagination}
                                    prePageHandler={prePageHandler}
                                    nextPageHandler={nextPageHandler}
                                    openFormHandler={openFormHandler}
                                    deleteHandler={deleteHandler}/> :
                        <ApartmentForm
                            closeFormHandler={closeFormHandler}
                            formAction={formAction}
                            formData={formData}
                            submitHandler={submitHandler}
                            fromDataHandler={fromDataHandler}
                        />
                }

                <Copyright/>
            </Box>
        </Container>
    );
};

export default App;