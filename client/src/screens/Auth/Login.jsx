import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useDispatch} from 'react-redux'
import {Container, FormControl, FormLabel, Input, Button, useToast} from '@chakra-ui/react'
import {setCredentials} from '../../store/features/authSlice'
import {useLoginMutation} from '../../common/services/auth'

export default function(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const toast = useToast()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const [login, {isLoading} ] = useLoginMutation()

    const handleChange = ({target: {name, value}}) => {
        setForm((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async () => {
        try {
            const user = await login(form).unwrap()
            dispatch(setCredentials(user))
            router.push('/search')
        } catch(err) {
            toast({
                status:"error",
                title: "Error",
                description: "Whoops! Something went wrong",
                isCloseable: true,
            })
        }
    }

    return (
        <Container>
            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input name="username" onChange={handleChange}/>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input name="password" onChange={handleChange}/>
            </FormControl>
                <Button onClick={handleSubmit} >Submit</Button>
        </Container>
    )
}