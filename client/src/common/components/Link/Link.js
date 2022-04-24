import {default as NextLink} from 'next/link';
import {Link as ChakraLink} from '@chakra-ui/react'

export const Link = (props) => {
    const {external, wrapper, url} = props

return (
        <NextLink text-decoration='none' href={url} passHref>
            <ChakraLink isExternal={external} text-decoration='none'>
                {props.children}
            </ChakraLink>
        </NextLink>
)

}

Link.defaultProps = {
    external: false
}