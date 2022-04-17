import {default as NextLink} from 'next/link';
import {Link as ChakraLink} from '@chakra-ui/react'

export const Link = (props) => {
return (
        <NextLink href={props.url} passHref>
            <ChakraLink isExternal={props.external}>
                {props.children}
            </ChakraLink>
        </NextLink>
)

}

Link.defaultProps = {
    external: true
}