import { NerdGraphQuery, Toast } from "nr1";

export async function submitConfig() {
  const userId = await getUserId();
  return Toast.showToast({
    title: 'Feedback received',
    description: userId,
    type: Toast.TYPE.NORMAL,
  });
}

export async function getUserId() {
  const query = `{
    actor {
      user {
        id
      }
    }
  }`;
  let {data, error } = await NerdGraphQuery.query({query})
  let userId = null;
  if (!error) {
    try {
      userId = data.actor.user.id;
    } catch (err) {
      error = err;
    }
  return userId;
  }
}

export function getUserKey(selectedAccountID) {
  const query = `{
      actor {
        query: account(id: ${selectedAccountID}) {
          nrql(query: "show eventtypes since 1 month ago") {
            results
          }
        }
      }
    }`;
  return { userKey };
}

export function createSynthetic(apiKey, name) {
  const query = `{
      actor {
        query: account(id: ${selectedAccountID}) {
          nrql(query: "show eventtypes since 1 month ago") {
            results
          }
        }
      }
    }`;
  return { query };
}
