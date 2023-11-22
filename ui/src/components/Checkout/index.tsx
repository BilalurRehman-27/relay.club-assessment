import { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import {
    Button,
    TextField,
    Container,
    Paper,
    Typography,
    List,
    ListItem,
} from '@mui/material'
import { isSubmitButtonDisabled } from '../../utils/utils'
import { BASE_URL } from '../../utils/constants'

const Checkout: React.FC = () => {
    const [total, setTotal] = useState<number | null>(null)

    // Validation schema using Yup
    const validationSchema = Yup.object({
        scannedItems: Yup.string()
            .required('Please enter scanned items separated by commas')
            .matches(
                /^[a-zA-Z,]+$/,
                'Invalid characters. Only alphabets and commas are allowed'
            ),
    })

    // Initial form values
    const initialValues = {
        scannedItems: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            // Call the backend to calculate the total
            fetch(
                `${
                    process.env.REACT_APP_BASE_URL || BASE_URL
                }price/calculateTotal`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        scannedItems: values.scannedItems
                            .split(',')
                            .map((item) => item.trim()),
                    }),
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `HTTP error! Status: ${response.status}`
                        )
                    }
                    return response.json()
                })
                .then((data) => {
                    setTotal(data.total)
                })
                .catch((error) => {
                    console.error('Error:', error)
                    toast.error('API call failed. Please try again.') // Show a notification
                })
        },
    })

    const handleSubmit = () => {
        formik.handleSubmit()
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={3}
                    style={{ padding: '20px', marginTop: '50px' }}
                >
                    <Typography fontSize={'18px'} fontWeight={'600'}>
                        As we're launching our new computer store, we would like
                        to have a few opening day specials.
                    </Typography>
                    <List sx={{ padding: 2 }}>
                        <ListItem
                            sx={{
                                listStyleType: 'disc',
                                display: 'list-item',
                            }}
                        >
                            <Typography>
                                We're going to have a 3 for 2 deal on Apple TVs.
                                For example, if you buy 3 Apple TVs, you will
                                pay the price of 2 only.
                            </Typography>
                        </ListItem>
                        <ListItem
                            sx={{
                                listStyleType: 'disc',
                                display: 'list-item',
                            }}
                        >
                            <Typography>
                                The brand new Super iPad will have a bulk
                                discount applied, where the price will drop to
                                $499.99 each, if someone buys more than 4.
                            </Typography>
                        </ListItem>
                        <ListItem
                            sx={{
                                listStyleType: 'disc',
                                display: 'list-item',
                            }}
                        >
                            <Typography>
                                We will bundle in a free VGA adapter free of
                                charge with every MacBook Pro sold.
                            </Typography>
                        </ListItem>
                    </List>
                    <Typography variant="h5" gutterBottom>
                        Relay Club Checkout
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="scannedItems"
                        label="Scanned Items (comma-separated)"
                        value={formik.values.scannedItems}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.scannedItems &&
                            !!formik.errors.scannedItems &&
                            !formik.values.scannedItems
                        }
                        helperText={
                            formik.touched.scannedItems &&
                            formik.errors.scannedItems
                        }
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitButtonDisabled(
                            formik.touched,
                            formik.errors
                        )}
                    >
                        Calculate Total
                    </Button>
                    {!!total && (
                        <Typography variant="h6" style={{ marginTop: '20px' }}>
                            Total: ${total.toFixed(2)}
                        </Typography>
                    )}
                </Paper>
            </Container>
        </form>
    )
}

export default Checkout
