import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo, // Ajoutez ceci pour utiliser useMemo
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const jsonData = await api.loadData();
      setData(jsonData);
      setError(null); // Réinitialise l'erreur en cas de succès
    } catch (err) {
      setError(err); // Enregistre l'erreur en cas d'échec
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data && data.events) {
      const dataLength = data.events.length - 1;
      setLast(data.events[dataLength]);
    }
  }, [data]);

  // Utilisez useMemo pour envelopper la valeur du contexte
  const contextValue = useMemo(() => ({
    data,
    error,
    last,
  }), [data, error, last]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
