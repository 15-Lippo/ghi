import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ExchangesTable from './components/ExchangesTable';
import FullPageErrorFallback from './components/FullPageErrorFallback';
import MyWallet from './components/MyWallet';
import NavBar from './components/NavBar';
import SwapForm from './components/SwapForm';
import { tabIndexAtom, web3Atom } from './utils/atoms';
import getWeb3 from './utils/getWeb3';

function App() {
  const [web3, setWeb3] = useAtom(web3Atom);
  const [account, setAccount] = useState(null);
  const [tabIndex] = useAtom(tabIndexAtom);

  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3Instance = await getWeb3();

      // Use web3 to get the user's account
      const userAccount = await web3Instance.eth.getAccounts();

      // Set web3 and account address values
      setWeb3(web3Instance);
      setAccount(userAccount[0]);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }, []);
  console.log('🚀 ~ file: App.js ~ line 10 ~ App ~ web3', web3);
  console.log('🚀 ~ file: App.js ~ line 12 ~ App ~ account', account);

  if (!web3) {
    // Run if Web3 wallet is not connected
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Box bgColor="#F7F9FC" minWidth={tabIndex === 1 ? '1550px' : '1000px'}>
        <Grid templateColumns="repeat(7, 1fr)">
          <GridItem shadow="lg" minHeight="100vh" colSpan={4} ml={8} bgColor="white">
            <Box shadow="md" mb={4}>
              <NavBar />
            </Box>
            <Box p={4}>
              {tabIndex === 0 ? <ExchangesTable /> : null}
              {tabIndex === 1 ? <MyWallet /> : null}
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Container minWidth={500}>
              <Box bgColor="white" mt="100px">
                <SwapForm />
              </Box>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { web3: null, account: null };
//   }

//   async componentDidMount() {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's account
//       const account = await web3.eth.getAccounts()[0];

//       // Set web3 and account address values
//       this.setState({ web3, account });

//       console.log(this.state.web3);
//       console.log(this.state.account);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(`Failed to load web3, accounts, or contract. Check console for details.`);
//       console.error(error);
//     }
//   }

//   render() {
//     if (!this.state.web3) {
//       // Run if Web3 wallet is not connected
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }

//     const config = {
//       useSystemColorMode: false,
//       initialColorMode: 'light',
//     };

//     const customTheme = extendTheme({ config });

//     return (
//       <ChakraProvider resetCSS theme={customTheme}>
//         <Box bg="gray.200" h="100vh">
//           <NavBar />
//           <SwapForm web3={this.state.web3} />
//         </Box>
//       </ChakraProvider>
//     );
//   }
// }

export default App;