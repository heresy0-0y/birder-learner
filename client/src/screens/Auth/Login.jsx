import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {Container, FormControl, FormLabel, Input, Button, useToast} from '@chakra-ui/react'
import {setCredentials, selectCurrentUser} from '../../store/features/authSlice'
import {useLoginMutation} from '../../common/services/auth'

export default function(props) {
    const router = useRouter()
    const dispatch = useDispatch()
    const toast = useToast()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    let logged = useSelector(selectCurrentUser)
    
    const [login, {isLoading} ] = useLoginMutation()
    
    const handleChange = ({target: {name, value}}) => {
        setForm((prev) => ({...prev, [name]: value}))
    }
    
    const handleSubmit = async () => {
        try {
            const user = await login(form).unwrap()
            dispatch(setCredentials(user))
            console.log(user)
            console.log(logged)

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
                <Button onClick={handleSubmit} isLoading={isLoading}>Submit</Button>
        </Container>
    )
}