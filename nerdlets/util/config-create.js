import { NerdGraphQuery, Toast } from "nr1";

export function submitConfig() {

  return Toast.showToast({
    title: 'Feedback received',
    description: 'We will contact you soon.',
    type: Toast.TYPE.NORMAL,
  });
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
