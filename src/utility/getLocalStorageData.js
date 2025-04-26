// get data from local storage
const getLocalStorageData = (DataId) => {
  const data = localStorage.getItem(DataId);
  return data ? JSON.parse(data) : [];
};

export default getLocalStorageData;
