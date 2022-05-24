import NextLink from "next/link"
import {
  Flex,
  LinkBox,
  LinkOverlay,
  Heading,
  Spacer,
  Button,
  useColorModeValue,
} from "@chakra-ui/react"

const siteTitle = "FirstDAPP"

const Header = () => {
  return (
    <Flex
      as="header"
      bg={useColorModeValue("gray.100", "gray.900")}
      p={4}
      alignItems="center"
    >
      <LinkBox>
        <NextLink href={"/"} passHref>
          <LinkOverlay>
            <Heading size="md">{siteTitle}</Heading>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
      <Spacer />
      <Button>Button for Account </Button>
    </Flex>
  )
}

export default Header
