import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import MainContainer from "./containers";
import Notification from "./components/Notification";

function App() {
  return (
    <ApolloProvider client={client}>
      <Notification />
      <MainContainer />
    </ApolloProvider>
  );
}

export default App;
