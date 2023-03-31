import { API_PREFIX } from "../data/constants";

export function apiPostAndProcess(endpoint, extraHeaders, processing, data) {
    fetch(API_PREFIX + endpoint, {
      method: 'POST',
      headers: {
        ...extraHeaders,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
  
    }).then((resp) => {
      console.log('+++ ' + resp.body);
      return resp.json();
    }).then((data) => {
      console.log('+++++ ' + data);
      processing(data);
    })
      .catch((err) => console.log('===== Posting API error: ' + err));
  }

  export async function apiGetAndProcess(endpoint, extraHeaders, processing) {
    fetch(API_PREFIX + endpoint, {
      headers: {
        ...extraHeaders,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      console.log('+++++ ' + data);
      processing(data);
    })
      .catch((err) => console.log('===== Error on fetching data from API: ' + err));
  }