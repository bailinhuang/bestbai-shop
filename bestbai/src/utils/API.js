export const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};

export const getData = (url) => {
  return fetch(url, {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};

export const deleteData = (url) => {
  return fetch(url, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json', 
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};

export const deleteDataWithBody = (url, data) => {
  return fetch(url, {
    method: 'DELETE', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json', 
    }
  }).then(res => res.json())
    .catch(error => console.error('Error:', error));
};
