// fetch list of all countries api
export const getCountries = async <TData>(): Promise<TData> => {
  const response = await fetch(
    "https://restcountries.com/v2/all?fields=name,capital,currencies,flag"
  );
  return await response.json();
};
