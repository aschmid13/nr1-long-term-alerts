import react, { Component, useState, useEffect } from "react";
import {
  Select,
  SelectItem,
  TextField,
  Form,
  Dropdown,
  Tile,
  Grid,
  GridItem,
  HeadingText,
  DropdownItem,
  BlockText,
  Stack,
  Switch,
  StackItem,
  SectionMessage,
  NerdGraphQuery,
} from "nr1";
import { getUserId } from "../util/config-create";
import { getUserInfo } from "../util/config-create";

function CredentialSection(props) {
  //State Variables
  const [userID, setUserID] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [currentAccount, setAccount] = useState(props.accountId);
  const [useNewKeys, setKeyOption] = useState(false);
  const [userKeys, setUserKeys] = useState([]);
  const [licenseKeys, setLicenseKeys] = useState([]);

  //Function Code Block
  useEffect(() => {
    async function getUserInfo() {
      const query = `{
                actor {
                  user {
                    email
                    id
                    name
                  }
                }
              }
              `;
      const request = await NerdGraphQuery.query({ query });
      setUserID(request.data.actor.user.id);
      setUserName(request.data.actor.user.name);
      setUserEmail(request.data.actor.user.email);
      setAccount(props.accountId);
      console.log("The Account ID is: ", [props.data.accountId]);

      return request;
    }

    getUserInfo();
  }, [props]);



  useEffect(() => {
    async function getAPIKeys( {userID} ) {
      const query = `
      {
        UserKeys: actor {
          apiAccess {
            keySearch(query: {scope: {userIds: ${userID}, accountIds: ${props.data.accountId}}, types: USER}) {
              keys {
                id
                key
                name
                notes
                type
              }
            }
          }
        }
        LicenseKeys: actor {
          apiAccess {
            keySearch(query: {scope: {userIds: ${userID}, accountIds: ${props.data.accountId}}, types: INGEST}) {
              keys {
                id
                key
                name
                notes
                type
              }
            }
          }
        }
      }
      
      `;

      const request = await NerdGraphQuery.query({ query })
      console.log('apikeys are: ', request);
      console.log('UserKeys are: ', request.data.UserKeys.apiAccess.keySearch.keys);
      console.log('LicenseKeys are : ', request.data.LicenseKeys.apiAccess.keySearch.keys);
      console.log('type of keys User Keys are : ', typeof request.data.UserKeys.apiAccess.keySearch.keys);
      setUserKeys(request.data.UserKeys.apiAccess.keySearch.keys);
      setLicenseKeys(request.data.LicenseKeys.apiAccess.keySearch.keys);
      const userkeyarray = Object.entries(userKeys);
      console.log(typeof userkeyarray, userkeyarray);
      return request;
    }
    getAPIKeys( {userID} );
  }, [props]);

  return (
    <div>
      <Stack
        directionType={Stack.DIRECTION_TYPE.VERTICAL}
        gapType={Stack.GAP_TYPE.LARGE}
        fullWidth
      >
        <StackItem>
          <SectionMessage
            description="API Keys: for the set up of the alert as well as the underlying structure
      we will need a License key and a user key. In this section you
      will be able to select those."
            actions={[
              {
                label: "See our docs",
                to: "https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/",
              },
            ]}
          />
        </StackItem>

        <StackItem>
          <HeadingText>User Info</HeadingText>
        </StackItem>
        <StackItem>
          <Grid>
            <GridItem columnSpan={4}>
              <Tile onClick={console.log} disabled>
                <HeadingText type={HeadingText.TYPE.HEADING_6}>
                  USER NAME
                </HeadingText>
                <BlockText>{userName}</BlockText>
              </Tile>
            </GridItem>
            <GridItem columnSpan={4}>
              <Tile onClick={console.log} disabled>
                <HeadingText type={HeadingText.TYPE.HEADING_6}>
                  USER ID
                </HeadingText>
                <BlockText>{userID}</BlockText>
              </Tile>
            </GridItem>
            <GridItem columnSpan={4}>
              <Tile onClick={console.log} disabled>
                <HeadingText type={HeadingText.TYPE.HEADING_6}>
                  USER EMAIL
                </HeadingText>
                <BlockText>{userEmail}</BlockText>
              </Tile>
            </GridItem>
          </Grid>
        </StackItem>
        <StackItem>
        <Dropdown
                items={userKeys}
                title='test'
                label="Select the right user key"
              >
                {({ item, index }) => (
                  <DropdownItem
                    key={index}
                    onClick={() => console.log((item))}
                  >
                    {item}
                  </DropdownItem>
                )}
        </Dropdown>
        </StackItem>
      </Stack>
    </div>
  );
}

export default CredentialSection;
