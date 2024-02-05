import { Box, Button, TextField } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import useMediaQuery from "@mui/material/useMediaQuery"
import Header from "../../components/Header"

const initialValues = {
    name: "",
    email: "",
    address: "",
    phone1: "",
    phone2: "",
    classKind: "",
    dueDate: "",
};

const phoneRegExp = 
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    address: yup.string().required("required"),
    phone1: yup
        .string()
        .matches(phoneRegExp, "Phone Number is not valid")
        .required("required"),
    phone2: yup
        .string()
        .matches(phoneRegExp, "Phone Number is not valid")
        .required("required"),
    classKind: yup.string().required("required"),
    dueDate: yup.string().required("required"),
});

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        // console.log(values);
        alert(values);
    };
    return (
        <Box m="20px">
            <Header title="CREATE MEMBER" subtitle="Create a New Member Profile" />
            <Formik 
                onSubmit={handleFormSubmit} 
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) =>(
                    <form onSubmit={handleSubmit}>
                        <Box 
                            display="grid" 
                            gap="30px" 
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div" : { gridColumn : isNonMobile ? undefined : "span 4" }
                            }}
                        >
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Name"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                sx={{gridColumn : "span 2"}}
                            />
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{gridColumn : "span 2"}}
                            />
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Phone 1"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.phone1}
                                name="phone1"
                                error={!!touched.phone1 && !!errors.phone1}
                                helperText={touched.phone1 && errors.phone1}
                                sx={{gridColumn : "span 2"}}
                            />
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Phone2"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.phone2}
                                name="phone2"
                                error={!!touched.phone2 && !!errors.phone2}
                                helperText={touched.phone2 && errors.phone2}
                                sx={{gridColumn : "span 2"}}
                            />
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Class Kind"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.classKind}
                                name="classKind"
                                error={!!touched.classKind && !!errors.classKind}
                                helperText={touched.classKind && errors.classKind}
                                sx={{gridColumn : "span 2"}}
                            />
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Due Date"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.dueDate}
                                name="dueDate"
                                error={!!touched.dueDate && !!errors.dueDate}
                                helperText={touched.dueDate && errors.dueDate}
                                sx={{gridColumn : "span 2"}}
                            />                            
                            <TextField  
                                fullWidth 
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{gridColumn : "span 4"}}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Member
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default Form;