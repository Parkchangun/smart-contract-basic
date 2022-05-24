import type { NextPage } from "next"
import Head from "next/head"
import NextLink from "next/link"
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout"
import { Text, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import ReadERC20 from "@base/components/ReadERC20"

declare let window: any

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>()
  const [currentAccount, setCurrentAccount] = useState<string | undefined>()
  const [chainId, setChainId] = useState<number | undefined>()
  const [chainName, setChainName] = useState<string | undefined>()

  useEffect(() => {
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return

    if (!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider
      .getBalance(currentAccount)
      .then(result => setBalance(ethers.utils.formatEther(result)))

    provider.getNetwork().then(result => {
      setChainId(result.chainId)
      setChainName(result.name)
    })
  }, [currentAccount])

  const onClickConnect = () => {
    if (!window.ethereum) {
      console.log("pim")
      return
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    provider
      .send("eth_requestAccounts", [])
      .then(accounts => {
        if (accounts.length > 0) setCurrentAccount(accounts[0])
      })
      .catch(e => console.log(e))
  }

  const onClickDisconnect = () => {
    console.log("onClickDisconnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3" my={4}>
        Explore Web3
      </Heading>
      <VStack>
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button type="button" w="100%" onClick={onClickDisconnect}>
              Account:{currentAccount}
            </Button>
          ) : (
            <Button type="button" w="100%" onClick={onClickConnect}>
              Connect MetaMask
            </Button>
          )}
        </Box>
        {currentAccount ? (
          <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Account info
            </Heading>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>
              Chain Info: ChainId {chainId} name {chainName}
            </Text>
          </Box>
        ) : (
          <></>
        )}
        <Box my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Task 1
          </Heading>
          <Text>local chain with hardhat</Text>
        </Box>

        <Box my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Task 2
          </Heading>
          <Text>DAPP with React/NextJS/Chakra</Text>
        </Box>

        <LinkBox my={4} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <NextLink
            href="https://github.com/NoahZinsmeister/web3-react/tree/v6"
            passHref
          >
            <LinkOverlay>
              <Heading my={4} fontSize="xl">
                Task 3 with link
              </Heading>
              <Text>Read docs of Web3-React V6</Text>
            </LinkOverlay>
          </NextLink>
        </LinkBox>

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Read ClassToken Info
          </Heading>
          <ReadERC20
            addressContract={"0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"}
            currentAccount={currentAccount}
          />
        </Box>
      </VStack>
    </>
  )
}

export default Home
