import { Button, IconButton, HStack, Text } from '@chakra-ui/react'
import { Link } from '../Link/Link.js'

export const Button = (props) => {
    const { link, icon } = props

    return (
        <Link>
            <Button>
                <Text>{text}</Text>
            </Button>
        </Link>
    )
}