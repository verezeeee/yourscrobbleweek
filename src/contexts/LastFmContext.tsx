import { createContext, useContext, ReactNode, useState } from 'react';

interface LastFmContextData {
  form: {
    user: string;
    period: string;
    limit: string;
    method: string;
  };
  setForm: (form: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string;
  setError: (error: string) => void;
  data: any;
  setData: (data: any) => void;
  handleSubmit: (e: React.FormEvent, navigate: (path: string) => void) => Promise<void>;
}

const LastFmContext = createContext<LastFmContextData | undefined>(undefined);

export function LastFmProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState({
    user: "",
    period: "",
    limit: "25",
    method: "user.gettopalbums",    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const API_KEY = "2271358500ea859fe719c9dda68388d3";

  const handleSubmit = async (e: React.FormEvent, navigate: (path: string) => void) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=${form.method}&user=${form.user}&period=${form.period}&limit=${form.limit}&api_key=${API_KEY}&format=json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const json = await res.json();
      setData(json);
      setError("");
      navigate("/result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LastFmContext.Provider
      value={{
        form,
        setForm,
        loading,
        setLoading,
        error,
        setError,
        data,
        setData,
        handleSubmit,
      }}
    >
      {children}
    </LastFmContext.Provider>
  );
}

export function useLastFm() {
  const context = useContext(LastFmContext);
  if (context === undefined) {
    throw new Error('useLastFm must be used within a LastFmProvider');
  }
  return context;
}